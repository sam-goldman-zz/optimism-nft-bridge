const ethers = require('ethers')
const hre = require("hardhat")
const { getContractInterface } = require('../../src/contract-defs')
const { predeploys } = require('@eth-optimism/contracts')
require('dotenv').config()

// Dummy variables
const DUMMY_L1_ERC721_ADDRESS = ethers.utils.getAddress('0x' + 'abba'.repeat(10))

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  // Set up our RPC provider connections.
  const l1RpcProvider = new ethers.providers.JsonRpcProvider(process.env.L1_RPC_PROVIDER)
  const l2RpcProvider = new ethers.providers.JsonRpcProvider(process.env.L2_RPC_PROVIDER)

  // Set up our wallets (using a default private key with 10k ETH allocated to it).
  // Need two wallets objects, one for interacting with L1 and one for interacting with L2.
  // Both will use the same private key.
  const key = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  const l1Wallet = new ethers.Wallet(key, l1RpcProvider)
  const alice = new ethers.Wallet(key, l2RpcProvider)

  // Set up some contract factories. You can ignore this stuff.
  const Factory__L1ERC721 = await hre.ethers.getContractFactory('L1ERC721')
  const Factory__L1ERC721Bridge = await hre.ethers.getContractFactory('L1ERC721Bridge')
  const Factory__L2ERC721Bridge = await hre.ethers.getContractFactory('L2ERC721Bridge')
  // Demo_L2StandardERC721Factory is the exact same contract as L2StandardERC721FactoryFactory,
  // with one minor difference which allows us to run the tutorial locally.
  const Factory__L2StandardERC721Factory = await hre.ethers.getContractFactory('Demo_L2StandardERC721Factory')

  // More setup. You can also ignore this.
  const l1MessengerAddress = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318' // Proxy__OVM_L1CrossDomainMessenger address
  const l2MessengerAddress = predeploys.L2CrossDomainMessenger
  const L1ERC721Bridge = await Factory__L1ERC721Bridge.connect(l1Wallet).deploy()
  const L2ERC721Bridge = await Factory__L2ERC721Bridge.connect(alice).deploy(
    l2MessengerAddress,
    L1ERC721Bridge.address
  )
  const L2StandardERC721Factory = await Factory__L2StandardERC721Factory
    .connect(alice).deploy(L2ERC721Bridge.address)
  const deploymentReceipt = await (
    await L2StandardERC721Factory.createStandardL2ERC721(
      DUMMY_L1_ERC721_ADDRESS,
      'L2ERC721',
      'ERC'
    )
  ).wait()
  
  const l2StandardERC721CreatedEvent = deploymentReceipt.events[0]
  const L2StandardERC721 = new ethers.Contract(
    l2StandardERC721CreatedEvent.args._l2Token,
    getContractInterface('L2StandardERC721'),
    alice
  )
  const L2CustomERC721 = await (
    await hre.ethers.getContractFactory('L2CustomERC721')
  ).deploy(
    L2ERC721Bridge.address,
    DUMMY_L1_ERC721_ADDRESS,
    L2StandardERC721Factory.address,
    'L2ERC721',
    'ERC'
  )

  // Initialize the L1 Bridge
  await L1ERC721Bridge.initialize(l1MessengerAddress, L2ERC721Bridge.address)

  // Deploy an ERC721 token on L1.
  console.log('Deploying L1 ERC721...')

  const L1ERC721 = await Factory__L1ERC721.connect(l1Wallet).deploy()

  await L1ERC721.deployTransaction.wait()
  console.log(`L1ERC721 deployed @ ${L1ERC721.address}`)

  // Deploy the paired ERC721 token to L2.
  console.log('Deploying L2 ERC721...')

  const receipt = await(
    await L2StandardERC721Factory.connect(alice).createStandardL2ERC721(
      L1ERC721.address,
      'L2ERC721',
      'ERC'
    )
  ).wait()

  const args = receipt.events.find(
    ({ event }) => event === "StandardL2ERC721Created"
  ).args;

  // Get the L2 ERC721 address from the emitted event and log it
  const l2ERC721Address = args._l2Token
  console.log(`L2StandardERC721 deployed @ ${l2ERC721Address}`)

  // Mint an NFT from the L1 Wallet
  const tx = await L1ERC721.connect(l1Wallet).mint()
  await tx.wait()

  // Log the initial balances
  console.log(`Balance on L1: ${await L1ERC721.balanceOf(l1Wallet.address)}`) // 1
  console.log(`Balance on L2: ${await L2StandardERC721.balanceOf(l1Wallet.address)}`) // 0

  // Approve the L1 bridge to transfer the NFT.
  console.log('Approving L1 bridge to transfer NFT...')
  const tokenId = 1
  const tx1 = await L1ERC721.approve(L1ERC721Bridge.address, tokenId)
  await tx1.wait()

  // Do not remove this check.
  // It ensures that the L2 ERC721 contract is compliant and valid. If the contract doesn't implement
  // IL2StandardERC721 or it does not correspond to the L1 token being deposited, no deposit will take place
  // and the L2 Bridge will send the NFT to the L1 Bridge.
  if (await L2StandardERC721.l1Token() != L1ERC721.address) {
    console.log(`L2 token does not correspond to L1 token: L2StandardERC721.l1Token() = ${await L2StandardERC721.l1Token()}`)
    process.exit(0)
  }

  // Call the L1 Bridge's deposit function to begin the L1 -> L2 transfer and lock the NFT in the L1 Bridge.
  console.log('Depositing tokens into L2 ...')
  const tx2 = await L1ERC721Bridge.depositERC721(
    L1ERC721.address,
    L2StandardERC721.address,
    tokenId,
    2000000,
    '0x',
  )
  await tx2.wait()

  // Wait for the message to be relayed to L2.
  await sleep(2000);

  // Log the balances to see that the transfer worked! An L2 NFT was minted and sent to the owner.
  // Until this NFT is withdrawn from L2, the L1 NFT will be locked in the L1 Bridge.
  console.log(`Balance on L1: ${await L1ERC721.balanceOf(l1Wallet.address)}`) // 0
  console.log(`Balance on L2: ${await L2StandardERC721.balanceOf(l1Wallet.address)}`) // 1

  // Withdraw the NFT on L2. This burns the L2 NFT and sends a message to the L1 contract to unlock
  // the L1 NFT and send it back to the owner.
  console.log(`Withdrawing tokens back to L1 ...`)
  const tx3 = await L2ERC721Bridge.connect(alice).withdraw(
    L2StandardERC721.address,
    tokenId,
    2000000,
    '0x'
  )
  await tx3.wait()

  // Wait for the message to be relayed to L1.
  console.log(`Waiting for withdrawal to be relayed to L1...`)
  await sleep(6000);

  // Log balances again! The L2 NFT has now been burned, and the L1 token has been released
  // back to its owner.
  // If this doesn't work, it's likely that your message relayer is not working.
  console.log(`Balance on L1: ${await L1ERC721.balanceOf(l1Wallet.address)}`) // 1
  console.log(`Balance on L2: ${await L2StandardERC721.balanceOf(l1Wallet.address)}`) // 0
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
