/* External Imports */
import { ethers } from 'hardhat'
import { Signer, ContractFactory, Contract } from 'ethers'
import {
  smock,
  FakeContract,
  MockContractFactory,
  MockContract,
} from '@defi-wonderland/smock'

/* Internal Imports */
import { expect } from '../../setup'
import { predeploys, getContractInterface } from '../../../src'
import { JsonRpcProvider } from '@ethersproject/providers'

const DEFAULT_ADMIN_ROLE = ethers.constants.HashZero
const TOKEN_ID = 10
const TOKEN_URI = "11111"
const BASE_URI = "AAAAA"
const DUMMY_L1BRIDGE_ADDRESS: string =
  '0x1234123412341234123412341234123412341234'
const DUMMY_L2_CROSSDOMAINMESSENGER_ADDRESS: string =
  '0x2234223412342234223422342234223422342234'

describe('L2StandardERC721', () => {
  let tokenURIAdmin: Signer
  let l2BridgeImpersonator: Signer

  let alice: Signer
  let Factory__L1ERC721: MockContractFactory<ContractFactory>
  // TODO: change l1erc721 to dummy
  let L1ERC721: MockContract<Contract>
  let Fake__L2ERC721Bridge: FakeContract
  let L2StandardERC721: Contract
  let tokenURIAdminAddress: string
  let l2BridgeImpersonatorAddress: string
  let aliceAddress: string

  before(async () => {
    [tokenURIAdmin, l2BridgeImpersonator, alice] = await ethers.getSigners()
    tokenURIAdminAddress = await tokenURIAdmin.getAddress()
    l2BridgeImpersonatorAddress = await l2BridgeImpersonator.getAddress()
    aliceAddress = await alice.getAddress()

    // deploy an ERC721 contract on L1
    Factory__L1ERC721 = await smock.mock(
      '@openzeppelin/contracts/token/ERC721/ERC721.sol:ERC721'
    )
    L1ERC721 = await Factory__L1ERC721.deploy('L1ERC721', 'ERC')
    
    L2StandardERC721 = await (
      await ethers.getContractFactory('L2StandardERC721')
    ).deploy(
      l2BridgeImpersonatorAddress,
      L1ERC721.address,
      'L2ERC721',
      'ERC'
    )

    // Get a new fake L2 bridge
    Fake__L2ERC721Bridge = await smock.fake<Contract>(
      await ethers.getContractFactory('L2ERC721Bridge'),
      // This allows us to use an ethers override {from: Fake__L2ERC721Bridge.address} to mock calls
      { address: await l2BridgeImpersonator.getAddress() }
    )

    // mint an nft to alice
    await L2StandardERC721
    .connect(l2BridgeImpersonator)
    .mint(
      aliceAddress,
      TOKEN_ID,
      {
        from: Fake__L2ERC721Bridge.address,
      }
    )
  })

  beforeEach(async () => {
    // set tokenURI and baseURI
    await L2StandardERC721.connect(tokenURIAdmin).setTokenURI(TOKEN_ID, TOKEN_URI)
    await L2StandardERC721.connect(tokenURIAdmin).setBaseURI(BASE_URI)
  })

  describe('constructor', () => {
    it('should be able to create a standard ERC721 contract with the correct parameters', async () => {
      expect(await L2StandardERC721.l2Bridge()).to.equal(l2BridgeImpersonatorAddress)
      expect(await L2StandardERC721.l1Token()).to.equal(L1ERC721.address)
      expect(await L2StandardERC721.name()).to.equal('L2ERC721')
      expect(await L2StandardERC721.symbol()).to.equal('ERC')

      // TokenURIAdmin has been given admin privileges
      expect(await L2StandardERC721.hasRole(DEFAULT_ADMIN_ROLE, tokenURIAdminAddress))

      // alice has been minted an nft
      expect(await L2StandardERC721.ownerOf(TOKEN_ID)).to.equal(aliceAddress)
    })
  })

  describe('setTokenURI', () => {
    const newTokenURI = "22222"

    it('should change the tokenURI of tokenId', async () => {
      // check the initial value of tokenURI
      expect(await L2StandardERC721.tokenURI(TOKEN_ID)).to.equal(BASE_URI.concat(TOKEN_URI))

      // change the tokenURI
      await L2StandardERC721.connect(tokenURIAdmin).setTokenURI(TOKEN_ID, newTokenURI)

      expect(await L2StandardERC721.tokenURI(TOKEN_ID)).to.equal(BASE_URI.concat(newTokenURI))
    })

    it('should revert on calls made by account other than TokenURIAdmin', async () => {
      await expect(
        L2StandardERC721.connect(alice).setTokenURI(TOKEN_ID, newTokenURI)
      ).to.be.revertedWith(
        `AccessControl: account ${aliceAddress.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`)
    })
  })

  describe('setBaseURI', () => {
    const newBaseURI = "BBBBB"

    it('should change the baseURI', async () => {
      // check the initial baseURI
      expect(await L2StandardERC721.baseTokenURI()).to.equal(BASE_URI)

      // change the baseURI
      await L2StandardERC721.connect(tokenURIAdmin).setBaseURI(newBaseURI)

      expect(await L2StandardERC721.baseTokenURI()).to.equal(newBaseURI)
    })

    it('should revert on calls made by account other than TokenURIAdmin', async () => {
      await expect(
        L2StandardERC721.connect(alice).setBaseURI(newBaseURI)
      ).to.be.revertedWith(
        `AccessControl: account ${aliceAddress.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
      )
    })
  }) 
})
