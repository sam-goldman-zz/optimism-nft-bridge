/* External Imports */
import { ethers } from 'hardhat'
import { Signer, Contract } from 'ethers'
import { smock, FakeContract } from '@defi-wonderland/smock'
import { NON_NULL_BYTES32 } from '../../../helpers'

/* Internal Imports */
import { expect } from '../../../setup'

const TOKEN_ID = 10
const DUMMY_OPERATOR_ADDRESS = ethers.utils.getAddress('0x' + 'abba'.repeat(10))
const DUMMY_L1ERC721_ADDRESS = ethers.utils.getAddress(
  '0x' + 'acdc'.repeat(10)
)
const BASE_URI: string = ''.concat('ethereum:', DUMMY_L1ERC721_ADDRESS, '@42/tokenURI?uint256=')

describe('L2CustomERC721', () => {
  let l2BridgeImpersonator: Signer
  let alice: Signer
  let Fake__L2ERC721Bridge: FakeContract
  let L2CustomERC721: Contract
  let l2BridgeImpersonatorAddress: string
  let aliceAddress: string

  before(async () => {
    ;[alice] = await ethers.getSigners()



    l2BridgeImpersonatorAddress = await l2BridgeImpersonator.getAddress()
    aliceAddress = await alice.getAddress()

    L2CustomERC721 = await (
      await ethers.getContractFactory('L2CustomERC721')
    ).deploy(
      l2BridgeImpersonatorAddress,
      DUMMY_L1ERC721_ADDRESS,
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
    await L2StandardERC721.connect(l2BridgeImpersonator).mint(
      aliceAddress,
      TOKEN_ID,
      {
        from: Fake__L2ERC721Bridge.address,
      }
    )
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

    it('should revert if called by a standard erc721 contract that does not map to correct l1 token')

    it('should mint a token ID to the correct owner and return the correct selector')
  })
})
