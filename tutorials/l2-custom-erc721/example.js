const ethers = require('ethers')
const optimismSDK = require("@eth-optimism/sdk")
const { getContractInterface } = require('../../src')
require('dotenv').config()

async function main() {
  // Set up our RPC provider connections
  const l1RpcProvider = new ethers.providers.JsonRpcProvider(process.env.KOVAN_URL)
  const l2RpcProvider = new ethers.providers.JsonRpcProvider(process.env.OPTI_KOVAN_URL)

  // Set up our wallets for interacting with L1 and L2. Both will use the same private key.
  const l1Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, l1RpcProvider)
  const l2Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, l2RpcProvider)
  const walletAddr = l1Wallet.address // same as l2Wallet.address

  // Set up the cross chain messenger
  const crossChainMessenger = new optimismSDK.CrossChainMessenger({
    l1ChainId: 42,   // 42 for Kovan. It's 1 for Mainnet    
    l1SignerOrProvider: l1Wallet,
    l2SignerOrProvider: l2Wallet
  })

  // Pre-deployed addresses
  const L2CustomERC721Addr = '0x90258483694092823dCf1179932D6E8C01B783b2' // contract is pre-deployed for the purpose of this tutorial
  const L1ERC721Addr = '0xA779A0cA89556A9dffD47527F0aad1c2e0d66e46'
  const L1ERC721BridgeAddr = '0xb5B701310B967d16F831C28C01EF277cCFEAC7d0'
  const L2ERC721BridgeAddr = '0xA779A0cA89556A9dffD47527F0aad1c2e0d66e46'
  const L2StandardERC721Addr = '0xCA6E83201a93236f52e3726bCE97DDeBee2DBb59'

  // Contract setup
  const L2CustomERC721 = new ethers.Contract(L2CustomERC721Addr, getContractInterface('L2CustomERC721'), l2Wallet)
  const L1ERC721 = new ethers.Contract(L1ERC721Addr, getContractInterface('L1ERC721'), l1Wallet)
  const L1ERC721Bridge = new ethers.Contract(L1ERC721BridgeAddr, getContractInterface('L1ERC721Bridge'), l1Wallet)
  const L2ERC721Bridge = new ethers.Contract(L2ERC721BridgeAddr, getContractInterface('L2ERC721Bridge'), l2Wallet)
  const L2StandardERC721 = new ethers.Contract(L2StandardERC721Addr, getContractInterface('L2StandardERC721'), l2Wallet)

  console.log(`Minting an L1 NFT...`)
  
  // Mint an NFT from the L1 Wallet
  const response = await L1ERC721.mint()

  // Get the token ID of the newly minted NFT
  const receipt = await response.wait()
  const tokenId = receipt.events.find(
    ({ event }) => event === "Transfer"
  ).args.tokenId

  // Approve the L1 bridge to transfer the NFT.
  const response1 = await L1ERC721.approve(L1ERC721Bridge.address, tokenId)
  await response1.wait()

  // Call the L1 Bridge's deposit function to begin the L1 -> L2 transfer and lock the NFT in the L1 Bridge.
  console.log('Depositing NFT into the L2 Standard ERC721 contract. This takes about a minute.')
  const response2 = await L1ERC721Bridge.depositERC721(
    L1ERC721.address,
    L2StandardERC721.address,
    tokenId,
    1200000,
    '0x',
  )
  await response2.wait()

  // Wait for the message to be relayed to L2.
  await crossChainMessenger.waitForMessageStatus(
    response2.hash,
    optimismSDK.MessageStatus.RELAYED
  )

  // The L1 -> L2 deposit is now complete! An NFT was minted from the L2 Standard ERC721 contract and sent to the owner.
  console.log(`Deposit successful. Balance of owner on L2 Standard ERC721: ${await L2StandardERC721.balanceOf(walletAddr)}`) // 1

  console.log(`Transferring NFT from the Standard ERC721 contract to the Custom ERC721 contract...`)

  // Transfer ownership of the NFT from the L2 wallet to the Custom contract. We must use safeTransferFrom here because
  // it implicitly calls the onERC721Received function of the Custom contract, which in turn mints a new NFT from the
  // Custom contract and sends it to the owner.
  const response3 = await L2StandardERC721["safeTransferFrom(address,address,uint256)"](
    walletAddr,
    L2CustomERC721.address,
    tokenId,
  )
  await response3.wait()

  console.log(`Transfer successful. The Custom contract automatically minted an NFT and sent it to the owner:`)

  // A new NFT with the same token ID has been minted from the Custom contract and sent to the owner.
  // The Custom contract now owns the NFT sent from the Standard contract.
  console.log(`Balance of owner on L2 Custom ERC721: ${await L2CustomERC721.balanceOf(walletAddr)}`) // 1
  console.log(`Balance of owner on L2 Standard ERC721: ${await L2StandardERC721.balanceOf(walletAddr)}`) // 0
  
  console.log(`Withdrawing the NFT to L1...`)

  // Withdraws the NFT to L1, which burns the both the NFT that is held in the Custom contract as well as the
  // owner's NFT, which was minted from the Custom contract. This totally erases the presence of the NFT on L2.
  const response4 = await L2CustomERC721.withdrawToL1(walletAddr, tokenId)
  await response4.wait()

  console.log(`Withdraw to L1 successfully initiated!`)

  // Checks that the NFT has successfully been removed from the Custom contract.
  await L2CustomERC721.ownerOf(tokenId).then(() => {
    console.log(`Something went wrong! NFT not removed from Custom contract.`)
  }).catch(() => {})

  // Checks that NFT has suceessfully been removed from Custom contract.
  await L2StandardERC721.ownerOf(tokenId).then(() => {
    console.log(`Something went wrong! NFT not removed from Standard contract.`)
  }).catch(() => {})
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
