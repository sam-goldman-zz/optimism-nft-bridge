/* External Imports */
import { ethers } from 'hardhat'
import { Signer, ContractFactory, Contract, constants } from 'ethers'
import { Interface } from 'ethers/lib/utils'
import {
  smock,
  MockContractFactory,
  FakeContract,
  MockContract,
} from '@defi-wonderland/smock'

/* Internal Imports */
import { expect } from '../../../setup'
import { NON_NULL_BYTES32, NON_ZERO_ADDRESS } from '../../../helpers'
import { getContractInterface } from '../../../../src'

const ERR_INVALID_MESSENGER = 'OVM_XCHAIN: messenger contract unauthenticated'
const ERR_INVALID_X_DOMAIN_MSG_SENDER =
  'OVM_XCHAIN: wrong sender of cross-domain message'
const ERR_ALREADY_INITIALIZED = 'Contract has already been initialized.'
const DUMMY_L2_ERC721_ADDRESS = ethers.utils.getAddress('0x' + 'abba'.repeat(10))
const DUMMY_L2_BRIDGE_ADDRESS = ethers.utils.getAddress(
  '0x' + 'acdc'.repeat(10)
)

const FINALIZATION_GAS = 1_200_000

describe('L1ERC721Bridge', () => {
  // init signers
  let l1MessengerImpersonator: Signer
  let alice: Signer
  let bob: Signer
  let bobsAddress
  let aliceAddress
  let tokenId
  let aliceInitialBalance

  // we can just make up this string since it's on the "other" Layer
  let Factory__L1ERC721: MockContractFactory<ContractFactory> 
  let IL2ERC721Bridge: Interface
  before(async () => {
    [l1MessengerImpersonator, alice, bob] = await ethers.getSigners();

    // deploy an ERC721 contract on L1
    Factory__L1ERC721 = await smock.mock(
      '@openzeppelin/contracts/token/ERC721/ERC721.sol:ERC721'
    )

    // get an L2ERC721Bridge Interface
    IL2ERC721Bridge = getContractInterface('IL2ERC721Bridge')

    aliceAddress = await alice.getAddress()
    bobsAddress = await bob.getAddress()
    aliceInitialBalance = 5
    tokenId = 10;
  })

  let L1ERC721: MockContract<Contract>
  let L1ERC721Bridge: Contract
  let Fake__L1CrossDomainMessenger: FakeContract
  beforeEach(async () => {
    // Get a new mock L1 messenger
    Fake__L1CrossDomainMessenger = await smock.fake<Contract>(
      await ethers.getContractFactory('L1CrossDomainMessenger'),
      { address: await l1MessengerImpersonator.getAddress() } // This allows us to use an ethers override {from: Mock__L2CrossDomainMessenger.address} to mock calls
    )

    // Deploy the contract under test
    L1ERC721Bridge = await (
      await ethers.getContractFactory('L1ERC721Bridge')
    ).deploy()
    await L1ERC721Bridge.initialize(
      Fake__L1CrossDomainMessenger.address,
      DUMMY_L2_BRIDGE_ADDRESS
    )

    L1ERC721 = await Factory__L1ERC721.deploy('L1ERC721', 'ERC')

    await L1ERC721.setVariable('_owners', {
      [tokenId]: aliceAddress,
    })
    await L1ERC721.setVariable('_balances', {
      [aliceAddress]: aliceInitialBalance,
    })
  })

  describe('initialize', () => {
    it('Should only be callable once', async () => {
      await expect(
        L1ERC721Bridge.initialize(
          ethers.constants.AddressZero,
          DUMMY_L2_BRIDGE_ADDRESS
        )
      ).to.be.revertedWith(ERR_ALREADY_INITIALIZED)
    })
  })

  describe('ERC721 deposits', () => {
    beforeEach(async () => {
      await L1ERC721.connect(alice).approve(
        L1ERC721Bridge.address,
        tokenId
      )
    })

    it('depositERC721() escrows the deposit and sends the correct deposit message', async () => {
      // alice calls deposit on the bridge and the L1 bridge calls safeTransferFrom on the token
      await L1ERC721Bridge.connect(alice).depositERC721(
        L1ERC721.address,
        DUMMY_L2_ERC721_ADDRESS,
        tokenId,
        FINALIZATION_GAS,
        NON_NULL_BYTES32
      )

      const depositCallToMessenger =
        Fake__L1CrossDomainMessenger.sendMessage.getCall(0)

      // alice's balance decreases by 1
      const depositerBalance = await L1ERC721.balanceOf(aliceAddress)
      expect(depositerBalance).to.equal(aliceInitialBalance - 1)

      // bridge's balance increases by 1
      const bridgeBalance = await L1ERC721.balanceOf(L1ERC721Bridge.address)
      expect(bridgeBalance).to.equal(1)

      // Check the correct cross-chain call was sent:
      // Message should be sent to the L2 bridge
      expect(depositCallToMessenger.args[0]).to.equal(DUMMY_L2_BRIDGE_ADDRESS)
      // Message data should be a call telling the L2DepositedERC721 to finalize the deposit

      // the L1 bridge sends the correct message to the L1 messenger
      expect(depositCallToMessenger.args[1]).to.equal(
        IL2ERC721Bridge.encodeFunctionData('finalizeDeposit', [
          L1ERC721.address,
          DUMMY_L2_ERC721_ADDRESS,
          aliceAddress,
          aliceAddress,
          tokenId,
          NON_NULL_BYTES32,
        ])
      )
      expect(depositCallToMessenger.args[2]).to.equal(FINALIZATION_GAS)

      // Updates the deposits mapping
      expect(await L1ERC721Bridge.deposits(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, tokenId)).to.equal(true)
    })

    it('depositERC721To() escrows the deposited NFT and sends the correct deposit message', async () => {
      // depositor calls deposit on the bridge and the L1 bridge calls safeTransferFrom on the token

      await L1ERC721Bridge.connect(alice).depositERC721To(
        L1ERC721.address,
        DUMMY_L2_ERC721_ADDRESS,
        bobsAddress,
        tokenId,
        FINALIZATION_GAS,
        NON_NULL_BYTES32
      )
      const depositCallToMessenger =
        Fake__L1CrossDomainMessenger.sendMessage.getCall(0)

      // alice's balance decreases by 1
      const depositerBalance = await L1ERC721.balanceOf(aliceAddress)
      expect(depositerBalance).to.equal(aliceInitialBalance - 1)

      // bridge's balance is increased
      const bridgeBalance = await L1ERC721.balanceOf(L1ERC721Bridge.address)
      expect(bridgeBalance).to.equal(1)

      // bridge is owner of tokenId
      const tokenIdOwner = await L1ERC721.ownerOf(tokenId);
      expect(tokenIdOwner).to.equal(L1ERC721Bridge.address)

      // Check the correct cross-chain call was sent:
      // Message should be sent to the L2DepositedERC721 on L2
      expect(depositCallToMessenger.args[0]).to.equal(DUMMY_L2_BRIDGE_ADDRESS)
      // Message data should be a call telling the L2DepositedERC721 to finalize the deposit

      // the L1 bridge sends the correct message to the L1 messenger
      expect(depositCallToMessenger.args[1]).to.equal(
        IL2ERC721Bridge.encodeFunctionData('finalizeDeposit', [
          L1ERC721.address,
          DUMMY_L2_ERC721_ADDRESS,
          aliceAddress,
          bobsAddress,
          tokenId,
          NON_NULL_BYTES32,
        ])
      )
      expect(depositCallToMessenger.args[2]).to.equal(FINALIZATION_GAS)

      // Updates the deposits mapping
      expect(await L1ERC721Bridge.deposits(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, tokenId)).to.equal(true)
    })

    it('cannot depositERC721 from a contract account', async () => {
      await expect(
        L1ERC721Bridge.depositERC721(
          L1ERC721.address,
          DUMMY_L2_ERC721_ADDRESS,
          tokenId,
          FINALIZATION_GAS,
          NON_NULL_BYTES32
        )
      ).to.be.revertedWith('Account not EOA')
    })

    describe('Handling ERC721.safeTransferFrom() failures that revert', () => {
      it('depositERC721(): will revert if ERC721.safeTransferFrom() reverts', async () => {
        await expect(
          L1ERC721Bridge.connect(bob).depositERC721To(
            L1ERC721.address,
            DUMMY_L2_ERC721_ADDRESS,
            bobsAddress,
            tokenId,
            FINALIZATION_GAS,
            NON_NULL_BYTES32
          )
        ).to.be.revertedWith('ERC721: transfer from incorrect owner')
      })

      it('depositERC721To(): will revert if ERC721.safeTransferFrom() reverts', async () => {
        await expect(
          L1ERC721Bridge.connect(bob).depositERC721To(
            L1ERC721.address,
            DUMMY_L2_ERC721_ADDRESS,
            bobsAddress,
            tokenId,
            FINALIZATION_GAS,
            NON_NULL_BYTES32
          )
        ).to.be.revertedWith('ERC721: transfer from incorrect owner')
      })

      it('depositERC721To(): will revert if the L1 ERC721 is zero address', async () => {
        await expect(
          L1ERC721Bridge.connect(alice).depositERC721To(
            constants.AddressZero,
            DUMMY_L2_ERC721_ADDRESS,
            bobsAddress,
            tokenId,
            FINALIZATION_GAS,
            NON_NULL_BYTES32
          )
        ).to.be.revertedWith('function call to a non-contract account')
      })

      it('depositERC721To(): will revert if the L1 ERC721 has no code', async () => {
        await expect(
          L1ERC721Bridge.connect(alice).depositERC721To(
            bobsAddress,
            DUMMY_L2_ERC721_ADDRESS,
            bobsAddress,
            tokenId,
            FINALIZATION_GAS,
            NON_NULL_BYTES32
          )
        ).to.be.revertedWith('function call to a non-contract account')
      })
    })

    it('correct selector is returned from call to onERC721Received', async () => {
      const selector = L1ERC721Bridge.interface.getSighash('onERC721Received');

      expect(await L1ERC721Bridge.onERC721Received(
        L1ERC721Bridge.address,
        aliceAddress,
        tokenId,
        NON_NULL_BYTES32
      )).to.equal(selector)
    })
  })

  describe('ERC721 withdrawals', () => {
    it('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L1 account', async () => {
      await expect(
        L1ERC721Bridge.connect(alice).finalizeERC721Withdrawal(
          L1ERC721.address,
          DUMMY_L2_ERC721_ADDRESS,
          constants.AddressZero,
          constants.AddressZero,
          tokenId,
          NON_NULL_BYTES32
        )
      ).to.be.revertedWith(ERR_INVALID_MESSENGER)
    })

    it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L2DepositedERC721)', async () => {
      await expect(
        L1ERC721Bridge.finalizeERC721Withdrawal(
          L1ERC721.address,
          DUMMY_L2_ERC721_ADDRESS,
          constants.AddressZero,
          constants.AddressZero,
          tokenId,
          NON_NULL_BYTES32,
          {
            from: Fake__L1CrossDomainMessenger.address,
          }
        )
      ).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MSG_SENDER)
    })

    it('should credit funds to the withdrawer and not use too much gas', async () => {
      // First Alice will send an NFT so that there's a balance to be withdrawn
      await L1ERC721.connect(alice).approve(
        L1ERC721Bridge.address,
        tokenId
      )

      await L1ERC721Bridge.connect(alice).depositERC721(
        L1ERC721.address,
        DUMMY_L2_ERC721_ADDRESS,
        tokenId,
        FINALIZATION_GAS,
        NON_NULL_BYTES32
      )

      // make sure bridge owns NFT
      expect(await L1ERC721.ownerOf(tokenId)).to.equal(L1ERC721Bridge.address)

      Fake__L1CrossDomainMessenger.xDomainMessageSender.returns(
        () => DUMMY_L2_BRIDGE_ADDRESS
      )

      await L1ERC721Bridge.finalizeERC721Withdrawal(
        L1ERC721.address,
        DUMMY_L2_ERC721_ADDRESS,
        NON_ZERO_ADDRESS,
        NON_ZERO_ADDRESS,
        tokenId,
        NON_NULL_BYTES32,
        { from: Fake__L1CrossDomainMessenger.address }
      )

      // NFT is transferred to new owner
      expect(await L1ERC721.ownerOf(tokenId)).to.equal(NON_ZERO_ADDRESS)

      // deposits state variable is updated
      expect(
        await L1ERC721Bridge.deposits(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, tokenId)
      ).to.equal(false)
    })
  })
})
