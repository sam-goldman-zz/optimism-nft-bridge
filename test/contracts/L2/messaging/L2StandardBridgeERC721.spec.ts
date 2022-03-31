/* External Imports */
import { ethers } from 'hardhat'
import { Signer, ContractFactory, Contract } from 'ethers'
import { smock, FakeContract, MockContract } from '@defi-wonderland/smock'

/* Internal Imports */
import { expect } from '../../../setup'
import { NON_NULL_BYTES32, NON_ZERO_ADDRESS } from '../../../helpers'

const ERR_INVALID_MESSENGER = 'OVM_XCHAIN: messenger contract unauthenticated'
const ERR_INVALID_X_DOMAIN_MSG_SENDER =
  'OVM_XCHAIN: wrong sender of cross-domain message'
const DUMMY_L1BRIDGE_ADDRESS: string =
  '0x1234123412341234123412341234123412341234'
const DUMMY_L1TOKEN_ADDRESS: string =
  '0x2234223412342234223422342234223422342234'

describe('L2StandardBridge', () => {
  let alice: Signer
  let aliceAddress: string
  let bob: Signer
  let bobsAddress: string
  let l2MessengerImpersonator: Signer
  let Factory__L1StandardBridge: ContractFactory
  const ALICE_INITIAL_BALANCE = 10
  const TOKEN_ID = 10
  before(async () => {
    // Create a special signer which will enable us to send messages from the L2Messenger contract
    ;[alice, bob, l2MessengerImpersonator] = await ethers.getSigners()
    aliceAddress = await alice.getAddress()
    bobsAddress = await bob.getAddress()
    Factory__L1StandardBridge = await ethers.getContractFactory(
      'L1StandardBridge'
    )
  })

  let L2StandardBridge: Contract
  let L2ERC721: Contract
  let Fake__L2CrossDomainMessenger: FakeContract
  beforeEach(async () => {
    // Get a new fake L2 messenger
    Fake__L2CrossDomainMessenger = await smock.fake<Contract>(
      await ethers.getContractFactory('L2CrossDomainMessenger'),
      // This allows us to use an ethers override {from: Mock__L2CrossDomainMessenger.address} to mock calls
      { address: await l2MessengerImpersonator.getAddress() }
    )

    // Deploy the contract under test
    L2StandardBridge = await (
      await ethers.getContractFactory('L2StandardBridge')
    ).deploy(Fake__L2CrossDomainMessenger.address, DUMMY_L1BRIDGE_ADDRESS)

    // Deploy an L2 ERC721
    L2ERC721 = await (
      await ethers.getContractFactory('L2StandardERC721', alice)
    ).deploy(L2StandardBridge.address, DUMMY_L1TOKEN_ADDRESS, 'L2Token', 'L2T')
  })

  // test the transfer flow of moving a token from L1 to L2
  describe('finalizeERC721Deposit', () => {
    it('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L2 account', async () => {
      await expect(
        L2StandardBridge.finalizeERC721Deposit(
          DUMMY_L1TOKEN_ADDRESS,
          NON_ZERO_ADDRESS,
          NON_ZERO_ADDRESS,
          NON_ZERO_ADDRESS,
          TOKEN_ID,
          NON_NULL_BYTES32
        )
      ).to.be.revertedWith(ERR_INVALID_MESSENGER)
    })

    it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L1StandardBridge)', async () => {
      Fake__L2CrossDomainMessenger.xDomainMessageSender.returns(
        NON_ZERO_ADDRESS
      )

      await expect(
        L2StandardBridge.connect(l2MessengerImpersonator).finalizeERC721Deposit(
          DUMMY_L1TOKEN_ADDRESS,
          NON_ZERO_ADDRESS,
          NON_ZERO_ADDRESS,
          NON_ZERO_ADDRESS,
          TOKEN_ID,
          NON_NULL_BYTES32,
          {
            from: Fake__L2CrossDomainMessenger.address,
          }
        )
      ).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MSG_SENDER)
    })

    it('should initialize a withdrawal if the L2 token is not compliant', async () => {
      // Deploy a non compliant ERC721
      const NonCompliantERC721 = await (
        await ethers.getContractFactory(
          '@openzeppelin/contracts/token/ERC721/ERC721.sol:ERC721'
        )
      ).deploy('L2Token', 'L2T')

      Fake__L2CrossDomainMessenger.xDomainMessageSender.returns(
        () => DUMMY_L1BRIDGE_ADDRESS
      )

      await L2StandardBridge.connect(l2MessengerImpersonator).finalizeERC721Deposit(
        DUMMY_L1TOKEN_ADDRESS,
        NonCompliantERC721.address,
        aliceAddress,
        bobsAddress,
        TOKEN_ID,
        NON_NULL_BYTES32,
        {
          from: Fake__L2CrossDomainMessenger.address,
        }
      )

      const withdrawalCallToMessenger =
        Fake__L2CrossDomainMessenger.sendMessage.getCall(0)

      expect(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS)
      expect(withdrawalCallToMessenger.args[1]).to.equal(
        Factory__L1StandardBridge.interface.encodeFunctionData(
          'finalizeERC721Withdrawal',
          [
            DUMMY_L1TOKEN_ADDRESS,
            NonCompliantERC721.address,
            bobsAddress,
            aliceAddress,
            TOKEN_ID,
            NON_NULL_BYTES32,
          ]
        )
      )
      expect(withdrawalCallToMessenger.args[2]).to.equal(0)
    })

    it('should credit funds to the depositor', async () => {
      Fake__L2CrossDomainMessenger.xDomainMessageSender.returns(
        () => DUMMY_L1BRIDGE_ADDRESS
      )

      await L2StandardBridge.connect(l2MessengerImpersonator).finalizeERC721Deposit(
        DUMMY_L1TOKEN_ADDRESS,
        L2ERC721.address,
        aliceAddress,
        bobsAddress,
        TOKEN_ID,
        NON_NULL_BYTES32,
        {
          from: Fake__L2CrossDomainMessenger.address,
        }
      )

      const tokenIdOwner = await L2ERC721.ownerOf(TOKEN_ID)
      tokenIdOwner.should.equal(bobsAddress)
    })
  })

  describe('withdrawals', () => {
    let Mock__L2Token: MockContract<Contract>

    beforeEach(async () => {
      Mock__L2Token = await (
        await smock.mock('L2StandardERC721')
      ).deploy(
        L2StandardBridge.address,
        DUMMY_L1TOKEN_ADDRESS,
        'L2Token',
        'L2T'
      )

      await Mock__L2Token.setVariable('_owners', {
        [TOKEN_ID]: aliceAddress,
      })
      await Mock__L2Token.setVariable('_balances', {
        [aliceAddress]: ALICE_INITIAL_BALANCE,
      })
    })

    it('withdrawERC721() burns and sends the correct withdrawal message', async () => {
      const uri = await Mock__L2Token.tokenURI(TOKEN_ID)
      console.log(uri)

      await L2StandardBridge.withdrawERC721(
        Mock__L2Token.address,
        TOKEN_ID,
        0,
        NON_NULL_BYTES32
      )

      const withdrawalCallToMessenger =
        Fake__L2CrossDomainMessenger.sendMessage.getCall(0)

      // Assert Alice's balance went down
      const aliceBalance = await Mock__L2Token.balanceOf(aliceAddress)
      expect(aliceBalance).to.equal(ALICE_INITIAL_BALANCE - 1)

      // Assert that the token isn't owned by anyone
      await expect(
        Mock__L2Token.ownerOf(TOKEN_ID)
      ).to.be.revertedWith("ERC721: owner query for nonexistent token")

      // Assert the correct cross-chain call was sent:
      // Message should be sent to the L1StandardBridge on L1
      expect(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS)
      // Message data should be a call telling the L1StandardBridge to finalize the withdrawal
      expect(withdrawalCallToMessenger.args[1]).to.equal(
        Factory__L1StandardBridge.interface.encodeFunctionData(
          'finalizeERC721Withdrawal',
          [
            DUMMY_L1TOKEN_ADDRESS,
            Mock__L2Token.address,
            aliceAddress,
            aliceAddress,
            TOKEN_ID,
            NON_NULL_BYTES32,
          ]
        )
      )
      // gaslimit should be correct
      expect(withdrawalCallToMessenger.args[2]).to.equal(0)
    })

    it('withdrawERC721To() burns and sends the correct withdrawal message', async () => {
      await L2StandardBridge.withdrawERC721To(
        Mock__L2Token.address,
        bobsAddress,
        TOKEN_ID,
        0,
        NON_NULL_BYTES32
      )
      const withdrawalCallToMessenger =
        Fake__L2CrossDomainMessenger.sendMessage.getCall(0)

      // Assert Alice's balance went down
      const aliceBalance = await Mock__L2Token.balanceOf(aliceAddress)
      expect(aliceBalance).to.equal(ALICE_INITIAL_BALANCE - 1)

      // Assert that the token isn't owned by anyone
      await expect(
        Mock__L2Token.ownerOf(TOKEN_ID)
      ).to.be.revertedWith("ERC721: owner query for nonexistent token")

      // Assert the correct cross-chain call was sent.
      // Message should be sent to the L1StandardBridge on L1
      expect(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS)
      // The message data should be a call telling the L1StandardBridge to finalize the withdrawal
      expect(withdrawalCallToMessenger.args[1]).to.equal(
        Factory__L1StandardBridge.interface.encodeFunctionData(
          'finalizeERC721Withdrawal',
          [
            DUMMY_L1TOKEN_ADDRESS,
            Mock__L2Token.address,
            aliceAddress,
            bobsAddress,
            TOKEN_ID,
            NON_NULL_BYTES32,
          ]
        )
      )
      // gas value is ignored and set to 0.
      expect(withdrawalCallToMessenger.args[2]).to.equal(0)
    })
  })

  describe('standard ERC721', () => {
    it('should not allow anyone but the L2 bridge to mint and burn', async () => {
      expect(L2ERC721.connect(alice).mint(aliceAddress, 100)).to.be.revertedWith(
        'Only L2 Bridge can mint and burn'
      )
      expect(L2ERC721.connect(alice).burn(aliceAddress, 100)).to.be.revertedWith(
        'Only L2 Bridge can mint and burn'
      )
    })

    it('should return the correct interface support', async () => {
      const supportsERC165 = await L2ERC721.supportsInterface(0x01ffc9a7)
      expect(supportsERC165).to.be.true

      const supportsL2TokenInterface = await L2ERC721.supportsInterface(
        0x1d1d8b63
      )
      expect(supportsL2TokenInterface).to.be.true

      const badSupports = await L2ERC721.supportsInterface(0xffffffff)
      expect(badSupports).to.be.false
    })
  })
})
