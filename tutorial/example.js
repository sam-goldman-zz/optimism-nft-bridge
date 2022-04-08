const ethers = require('ethers')
const hre = require("hardhat")
const { predeploys, getContractInterface } = require('@eth-optimism/contracts')

async function main() {
  // Set up our RPC provider connections.
  const l1RpcProvider = new ethers.providers.JsonRpcProvider('http://34.125.47.188:9545')
  const l2RpcProvider = new ethers.providers.JsonRpcProvider('http://34.125.47.188:8545')

  // Set up our wallets (using a default private key with 10k ETH allocated to it).
  // Need two wallets objects, one for interacting with L1 and one for interacting with L2.
  // Both will use the same private key.
  const key = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  const l1Wallet = new ethers.Wallet(key, l1RpcProvider)
  const l2Wallet = new ethers.Wallet(key, l2RpcProvider)

  // Set up some contract factories. You can ignore this stuff.
  const Factory__L1ERC721 = await hre.ethers.getContractFactory('L1ERC721')
  const Factory__L1ERC721Bridge = await hre.ethers.getContractFactory('L1ERC721Bridge')
  const Factory__L2ERC721Bridge = await hre.ethers.getContractFactory('L2ERC721Bridge')
  const Factory__L2StandardERC721Factory = await hre.ethers.getContractFactory('Demo_L2StandardERC721Factory')

  // Setup pre-deployed contracts. You can also ignore this.
  const l2Messenger = new ethers.Contract(
    predeploys.L2CrossDomainMessenger,
    getContractInterface('L2CrossDomainMessenger'),
    l2RpcProvider
  )
  const l1Messenger = new ethers.Contract(
    '0x0165878A594ca255338adfa4d48449f69242Eb8F',
    getContractInterface('L1CrossDomainMessenger'),
    l1RpcProvider
  )
  const L1ERC721Bridge = await Factory__L1ERC721Bridge.connect(l1Wallet).deploy()
  const L2ERC721Bridge = await Factory__L2ERC721Bridge.connect(l2Wallet).deploy(
    l2Messenger.address,
    L1ERC721Bridge.address
  )
  const L2StandardERC721Factory = await Factory__L2StandardERC721Factory
    .connect(l2Wallet)
    .deploy(L2ERC721Bridge.address)

  // Deploy an ERC721 token on L1.
  console.log('Deploying L1 ERC721...')

  const L1ERC721 = await Factory__L1ERC721.connect(l1Wallet).deploy()

  await L1ERC721.deployTransaction.wait()
  console.log(`L1ERC721 deployed @ ${L1ERC721.address}`)

  // Deploy the paired ERC721 token to L2.
  console.log('Deploying L2 ERC721...')

  // const Factory__L2StandardERC721Factory = await smock.mock('L2StandardERC721Factory',
  //   { provider: l2Wallet }
  // )
  // const L2StandardERC721Factory = await Factory__L2StandardERC721Factory.deploy()
  // await L2StandardERC721Factory.setVariable('isStandardERC721', {
  //   [L1ERC721.address]: true,
  // })

  const a = await L2StandardERC721Factory.isStandardERC721(L1ERC721.address)

  const receipt = await(
    await L2StandardERC721Factory.connect(l2Wallet).createStandardL2ERC721(
      L1ERC721.address,
      'L2ERC721',
      'ERC',
      { gasLimit: 8900999 }
    )
  ).wait()

  const args = receipt.events.find(
    ({ event }) => event === "StandardL2ERC721Created"
  ).args;

  // Get the L2 ERC721 address from the emited event and log it
  const l2ERC721Address = args._l2Token;
  console.log(`L2StandardERC721 deployed @ ${l2ERC721Address}`)

  // Create an instance of the L2 ERC721 contract at the address that was just deployed
  const L2StandardERC721 = await Factory__L2StandardERC721.attach(l2ERC721Address).connect(l2Wallet)

  const b = await L2StandardERC721.l2Bridge()
  // const _L2StandardERC721Factory = await smock.mock(
  //   'L2StandardERC721Factory',
  //   // This allows us to use an ethers override {from: Fake__L2CrossDomainMessenger.address} to mock calls
  // )
  // const factory = await _L2StandardERC721Factory.deploy()
  // await factory.createStandardL2ERC721()

  // Mint an NFT from the L1 Wallet
  const tx = await L1ERC721.connect(l1Wallet).mint()
  await tx.wait()

  const tokenId = 1
   // owner of tokenId is l1Wallet
  console.log(`Owner of token ID on L1 is L1Wallet:
    ${l1Wallet.address === await L1ERC721.ownerOf(tokenId)}`
  )

  // Approve the L1 bridge to transfer the NFT.
  console.log('Approving L1 bridge to transfer NFT...')
  const tx1 = await L1ERC721.approve(L1ERC721Bridge.address, tokenId)
  await tx1.wait()

  // DO NOT remove this check.
  // It ensures L2 token compliance and validity. If the L2 token contract doesn't implement
  // IL2StandardERC721 or it does not correspond to the L1 token being deposited, an exception
  // will occur and no deposit will take place. Alternatively the exception will occur once
  // the deposit is relayed to L2 and the seven day wait period will apply for the bad deposit
  // to be withdraw-able back on L1
  if (await L2StandardERC721.l1Token() != L1ERC721.address) {
    console.log(`L2 token does not correspond to L1 token: L2StandardERC721.l1Token() = ${await L2StandardERC721.l1Token()}`)
    process.exit(0)
  }

  // Call the bridge's deposit function to begin the L1 -> L2 transfer.
  console.log('Depositing tokens into L2 ...')
  const tx2 = await L1ERC721Bridge.depositERC721(
    L1ERC721.address,
    L2StandardERC721.address,
    tokenId,
    2000000,
    '0x'
  )
  await tx2.wait()

  // Wait for the message to be relayed to L2.
  console.log('Waiting for deposit to be relayed to L2...')
  const [ msgHash1 ] = await watcher.getMessageHashesFromL1Tx(tx2.hash)

  const receipt1 = await watcher.getL2TransactionReceipt(msgHash1, true)
  console.log("receipt", receipt1)

  // Log some balances to see that it worked!
  console.log(`Balance on L1: ${await L1ERC721.balanceOf(l1Wallet.address)}`) // 0
  console.log(`Balance on L2: ${await L2StandardERC721.balanceOf(l1Wallet.address)}`) // 1234

  // // Burn the tokens on L2 and ask the L1 contract to unlock on our behalf.
  // console.log(`Withdrawing tokens back to L1 ...`)
  // const tx3 = await L2ERC721Bridge.withdraw(
  //   L2StandardERC721.address,
  //   1234,
  //   2000000,
  //   '0x'
  // )
  // await tx3.wait()

  // // Wait for the message to be relayed to L1.
  // console.log(`Waiting for withdrawal to be relayed to L1...`)
  // const [ msgHash2 ] = await watcher.getMessageHashesFromL2Tx(tx3.hash)
  // await watcher.getL1TransactionReceipt(msgHash2)

  // // Log balances again!
  // console.log(`Balance on L1: ${await L1ERC721.balanceOf(l1Wallet.address)}`) // 1234
  // console.log(`Balance on L2: ${await L2StandardERC721.balanceOf(l1Wallet.address)}`) // 0
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
