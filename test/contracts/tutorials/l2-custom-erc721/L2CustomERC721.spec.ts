/* External Imports */
import { ethers } from 'hardhat'
import { Signer, Contract } from 'ethers'
import { smock, FakeContract, MockContract } from '@defi-wonderland/smock'
import { NON_NULL_BYTES32 } from '../../../helpers'

/* Internal Imports */
import { expect } from '../../../setup'

const TOKEN_ID = 10
const DUMMY_OPERATOR_ADDRESS = ethers.utils.getAddress('0x' + 'abba'.repeat(10))
const DUMMY_L1ERC721_ADDRESS = ethers.utils.getAddress(
  '0x' + 'acdc'.repeat(10)
)
const DUMMY_L2_BRIDGE_ADDRESS = ethers.utils.getAddress(
  '0x' + 'bcdc'.repeat(10)
)
const ERC721RECEIVER_INTERFACE_IDENTIFIER = '0x150b7a02'
const BASE_URI: string = ''.concat('ethereum:', DUMMY_L1ERC721_ADDRESS, '@42/tokenURI?uint256=')

describe('L2CustomERC721', () => {
  let l2BridgeImpersonator: Signer
  let alice: Signer
  let Fake__L2StandardERC721: FakeContract
  let L2CustomERC721: Contract
  let l2StandardERC721Impersonator: Signer
  let l1ERC721Impersonator: Signer
  let aliceAddress: string
  let l2StandardERC721ImpersonatorAddress: string
  let l1ERC721ImpersonatorAddress: string
  let Mock__L2StandardERC721Factory: MockContract<Contract>
  let Fake__L1ERC721: FakeContract

  before(async () => {
    ;[alice, l2StandardERC721Impersonator, l1ERC721Impersonator] = await ethers.getSigners()
    
    aliceAddress = await alice.getAddress()
    l2StandardERC721ImpersonatorAddress = await l2StandardERC721Impersonator.getAddress()
    l1ERC721ImpersonatorAddress = await l1ERC721Impersonator.getAddress()

    Mock__L2StandardERC721Factory = await (
      await smock.mock('L2StandardERC721Factory')
    ).deploy()

    L2CustomERC721 = await (
      await ethers.getContractFactory('L2CustomERC721')
    ).deploy(
      DUMMY_L2_BRIDGE_ADDRESS,
      DUMMY_L1ERC721_ADDRESS,
      Mock__L2StandardERC721Factory.address,
      'L2ERC721',
      'ERC'
    )

    Fake__L2StandardERC721 = await smock.fake<Contract>(
      await ethers.getContractFactory('L2StandardERC721'),
      // This allows us to use an ethers override {from: Fake__L2ERC721Bridge.address} to mock calls
      { address: l2StandardERC721ImpersonatorAddress }
    )

    Fake__L1ERC721 = await smock.fake<Contract>(
      await ethers.getContractFactory('L1ERC721'),
      // This allows us to use an ethers override {from: Fake__L2ERC721Bridge.address} to mock calls
      { address: l1ERC721ImpersonatorAddress }
    )

    // mint an nft to alice
    // await L2StandardERC721.connect(l2BridgeImpersonator).mint(
    //   aliceAddress,
    //   TOKEN_ID,
    //   {
    //     from: Fake__L2ERC721Bridge.address,
    //   }
    // )
  })

  describe('onERC721Received', () => {
    it('should revert if not called by a standard l2 erc721 contract', async () => {
      await expect(
        L2CustomERC721.onERC721Received(
          DUMMY_OPERATOR_ADDRESS,
          aliceAddress,
          TOKEN_ID,
          NON_NULL_BYTES32
        )
      ).to.be.revertedWith("Transfer not sent from a Standard L2 ERC721 contract")
    })

    it('should revert if called by a standard erc721 contract that does not map to correct l1 token', async () => {
      await Mock__L2StandardERC721Factory.setVariable('isStandardERC721', {
        [l2StandardERC721ImpersonatorAddress]: true,
      })

      await expect(
        L2CustomERC721.connect(l2StandardERC721Impersonator).onERC721Received(
          DUMMY_OPERATOR_ADDRESS,
          aliceAddress,
          TOKEN_ID,
          NON_NULL_BYTES32
        )
      ).to.be.revertedWith(
        "Transfer sent from a Standard L2 ERC721 contract that does not map to the correct L1 ERC721"
      )
    })

    it('should return the correct selector and mint a token ID to the correct owner', async () => {
      await Mock__L2StandardERC721Factory.setVariable('standardERC721Mapping', {
        [DUMMY_L1ERC721_ADDRESS]: l2StandardERC721ImpersonatorAddress,
      })

      // Returns the ERC-165 identifier of IERC721Receiver. This call does not execute a transaction
      // since we use callStatic.
      const interfaceIdentifier = await L2CustomERC721.connect(l2StandardERC721Impersonator).callStatic.onERC721Received(
        DUMMY_OPERATOR_ADDRESS,
        aliceAddress,
        TOKEN_ID,
        NON_NULL_BYTES32
      )

      // Returns the expected interface identifier
      expect(interfaceIdentifier).to.equal(ERC721RECEIVER_INTERFACE_IDENTIFIER)

      // This call executes the transaction successfully
      await L2CustomERC721.connect(l2StandardERC721Impersonator).onERC721Received(
        DUMMY_OPERATOR_ADDRESS,
        aliceAddress,
        TOKEN_ID,
        NON_NULL_BYTES32
      )

      // A new token ID is minted from the custom token contract and sent to alice
      expect(await L2CustomERC721.ownerOf(TOKEN_ID)).to.equal(aliceAddress)
    })
  })
})
