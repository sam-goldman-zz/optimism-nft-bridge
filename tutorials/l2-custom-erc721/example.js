const ethers = require('ethers')
const hre = require("hardhat")
const { getContractInterface } = require('../../src/contract-defs')
const { predeploys } = require('@eth-optimism/contracts')
require('dotenv').config()

const TOKEN_ID = 1

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
  const l2Wallet = new ethers.Wallet(key, l2RpcProvider)

  // Set up contract factories. You can ignore this stuff.
  const Factory__L1ERC721 = await hre.ethers.getContractFactory('L1ERC721')
  const Factory__L1ERC721Bridge = await hre.ethers.getContractFactory('L1ERC721Bridge')
  const Factory__L2ERC721Bridge = await hre.ethers.getContractFactory('L2ERC721Bridge')
  const Factory__L2StandardERC721 = await hre.ethers.getContractFactory('L2StandardERC721')

  // Demo_L2StandardERC721Factory is the exact same contract as L2StandardERC721FactoryFactory,
  // with one minor difference which allows us to run the tutorial locally.
  const Factory__L2StandardERC721Factory = await hre.ethers.getContractFactory('Demo_L2StandardERC721Factory')

  // Contract setup. You can also ignore this.
  const l1MessengerAddress = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318' // Proxy__OVM_L1CrossDomainMessenger address
  const l2MessengerAddress = predeploys.L2CrossDomainMessenger
  const L1ERC721Bridge = await Factory__L1ERC721Bridge.connect(l1Wallet).deploy()
  const L2ERC721Bridge = await Factory__L2ERC721Bridge.connect(l2Wallet).deploy(
    l2MessengerAddress,
    L1ERC721Bridge.address
  )
  const L2StandardERC721Factory = await Factory__L2StandardERC721Factory.connect(l2Wallet).deploy(
    L2ERC721Bridge.address
  )

  // Initialize the L1 Bridge
  await L1ERC721Bridge.initialize(l1MessengerAddress, L2ERC721Bridge.address)

  // Deploy an ERC721 token on L1.
  console.log('Deploying L1 ERC721...')

  const L1ERC721 = await Factory__L1ERC721.connect(l1Wallet).deploy()

  await L1ERC721.deployTransaction.wait()
  console.log(`L1ERC721 deployed @ ${L1ERC721.address}`)

  // Deploy the paired ERC721 token to L2.
  console.log('Deploying L2 Standard ERC721...')

  const receipt = await(
    await L2StandardERC721Factory.connect(l2Wallet).createStandardL2ERC721(
      L1ERC721.address,
      'L2ERC721',
      'ERC'
    )
  ).wait()

  const args = receipt.events.find(
    ({ event }) => event === "StandardL2ERC721Created"
  ).args;

  // Get the L2 Standard ERC721 address from the emitted event and log it
  const l2ERC721Address = args._l2Token
  console.log(`L2StandardERC721 deployed @ ${l2ERC721Address}`)

  // Create an instance of the L2 ERC721 contract at the address that was just deployed
  const L2StandardERC721 = await Factory__L2StandardERC721.connect(l2Wallet).attach(l2ERC721Address)



  
  // Mint an NFT from the L1 Wallet
  const tx = await L1ERC721.connect(l1Wallet).mint()
  await tx.wait()

  // Log the initial balances
  console.log(`Balance on L1ERC721: ${await L1ERC721.balanceOf(l1Wallet.address)}`) // 1

  // Approve the L1 bridge to transfer the NFT.
  console.log('Approving L1 bridge to transfer NFT...')
  const tx1 = await L1ERC721.approve(L1ERC721Bridge.address, TOKEN_ID)
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
  console.log('Depositing token into L2...')
  const tx2 = await L1ERC721Bridge.depositERC721(
    L1ERC721.address,
    L2StandardERC721.address,
    TOKEN_ID,
    2000000,
    '0x',
  )
  await tx2.wait()

  // Wait for the message to be relayed to L2.
  // TODO

  // Log the balances to see that the transfer worked. An NFT was minted on the Standard ERC721 contract
  // and sent to the owner.
  console.log(`Balance on L2StandardERC721: ${await L2StandardERC721.balanceOf(l1Wallet.address)}`) // 1

  await L2StandardERC721.
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
