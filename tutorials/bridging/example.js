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

  // Set up the cross chain messenger
  const crossChainMessenger = new optimismSDK.CrossChainMessenger({
    l1ChainId: 42,   // 42 for Kovan. It's 1 for Mainnet    
    l1SignerOrProvider: l1Wallet,
    l2SignerOrProvider: l2Wallet
  })

  // Pre-deployed addresses
  const L1ERC721Addr = '0xA779A0cA89556A9dffD47527F0aad1c2e0d66e46'
  const L1ERC721BridgeAddr = '0xb5B701310B967d16F831C28C01EF277cCFEAC7d0'
  const L2ERC721BridgeAddr = '0xA779A0cA89556A9dffD47527F0aad1c2e0d66e46'
  const L2StandardERC721Addr = '0xCA6E83201a93236f52e3726bCE97DDeBee2DBb59'

  // Contract setup
  const L1ERC721 = new ethers.Contract(L1ERC721Addr, getContractInterface('L1ERC721'), l1Wallet)
  const L1ERC721Bridge = new ethers.Contract(L1ERC721BridgeAddr, getContractInterface('L1ERC721Bridge'), l1Wallet)
  const L2ERC721Bridge = new ethers.Contract(L2ERC721BridgeAddr, getContractInterface('L2ERC721Bridge'), l2Wallet)
  const L2StandardERC721 = new ethers.Contract(L2StandardERC721Addr, getContractInterface('L2StandardERC721'), l2Wallet)

  // Mint an NFT from the L1 Wallet
  const response = await L1ERC721.mint()

  // Get the token ID of the newly minted NFT
  const receipt = await response.wait()
  const tokenId = receipt.events.find(
    ({ event }) => event === "Transfer"
  ).args.tokenId

  // Log the initial balances
  console.log(`Balance on L1: ${await L1ERC721.balanceOf(l1Wallet.address)}`) // 1
  console.log(`Balance on L2: ${await L2StandardERC721.balanceOf(l1Wallet.address)}`) // 0

  // Approve the L1 bridge to transfer the NFT.
  console.log('Approving L1 bridge to transfer NFT...')
  const response1 = await L1ERC721.approve(L1ERC721Bridge.address, tokenId)
  await response1.wait()

  // Do not remove this check.
  // It ensures that the L2 ERC721 contract is compliant and valid. If the contract doesn't implement
  // IL2StandardERC721 or it does not correspond to the L1 NFT being deposited, no deposit will take place
  // and the L2 Bridge will send the NFT to the L1 Bridge.
  if (await L2StandardERC721.l1Token() != L1ERC721.address) {
    console.log(`L2 NFT does not correspond to L1 NFT: L2StandardERC721.l1Token() = ${await L2StandardERC721.l1Token()}`)
    process.exit(0)
  }

  // Call the L1 Bridge's deposit function to begin the L1 -> L2 transfer and lock the NFT in the L1 Bridge.
  console.log('Depositing NFT into L2. This takes about a minute.')
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

  // Log the balances to see that the transfer worked! An L2 NFT was minted and sent to the owner.
  // The L1 NFT will now be held by the L1 Bridge until the L2 NFT is withdrawn from L2.
  console.log(`Balance on L1: ${await L1ERC721.balanceOf(l1Wallet.address)}`) // 0
  console.log(`Balance on L2: ${await L2StandardERC721.balanceOf(l1Wallet.address)}`) // 1

  // Withdraw the NFT on L2. This burns the L2 NFT and sends a message to the L1 contract to unlock
  // the L1 NFT and send it back to the owner.
  console.log(`Withdrawing NFT back to L1...`)
  const response3 = await L2ERC721Bridge.withdraw(
    L2StandardERC721.address,
    tokenId,
    2000000,
    '0x'
  )
  await response3.wait()

  // Wait for the message to be relayed to L1.
  console.log(`Waiting until withdrawal is ready to be relayed. This takes a couple minutes on Kovan (and a week on mainnet!).`)
  await crossChainMessenger.waitForMessageStatus(
    response3.hash, 
    optimismSDK.MessageStatus.READY_FOR_RELAY
  )

  // Now that the message is ready to be relayed, we can finalize the transaction on L1.
  // This requires a second transaction, which can only be executed after a week on mainnet.
  // See more here: https://community.optimism.io/docs/developers/bridge/messaging/#for-l2-%E2%87%92-l1-transactions
  console.log(`Ready for relay. Finalizing transaction on L1...`)
  await crossChainMessenger.finalizeMessage(response3)

  console.log(`Waiting for relay to be finalized...`)
  await crossChainMessenger.waitForMessageStatus(
    response3,
    optimismSDK.MessageStatus.RELAYED
  )

  // Log balances again! The L2 NFT has now been burned, and the L1 NFT has been released
  // back to its owner.
  console.log(`Balance on L1: ${await L1ERC721.balanceOf(l1Wallet.address)}`) // 1
  console.log(`Balance on L2: ${await L2StandardERC721.balanceOf(l1Wallet.address)}`) // 0
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
