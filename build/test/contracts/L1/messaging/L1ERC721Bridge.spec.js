"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@defi-wonderland/smock");
const setup_1 = require("../../../setup");
const helpers_1 = require("../../../helpers");
const src_1 = require("../../../../src");
const ERR_INVALID_MESSENGER = 'OVM_XCHAIN: messenger contract unauthenticated';
const ERR_INVALID_X_DOMAIN_MSG_SENDER = 'OVM_XCHAIN: wrong sender of cross-domain message';
const ERR_ALREADY_INITIALIZED = 'Contract has already been initialized.';
const DUMMY_L2_ERC721_ADDRESS = hardhat_1.ethers.utils.getAddress('0x' + 'abba'.repeat(10));
const DUMMY_L2_BRIDGE_ADDRESS = hardhat_1.ethers.utils.getAddress('0x' + 'acdc'.repeat(10));
const FINALIZATION_GAS = 1200000;
describe('L1ERC721Bridge', () => {
    let l1MessengerImpersonator;
    let alice;
    let bob;
    let bobsAddress;
    let aliceAddress;
    let tokenId;
    let aliceInitialBalance;
    let Factory__L1ERC721;
    let IL2ERC721Bridge;
    before(async () => {
        [l1MessengerImpersonator, alice, bob] = await hardhat_1.ethers.getSigners();
        Factory__L1ERC721 = await smock_1.smock.mock('@openzeppelin/contracts/token/ERC721/ERC721.sol:ERC721');
        IL2ERC721Bridge = (0, src_1.getContractInterface)('IL2ERC721Bridge');
        aliceAddress = await alice.getAddress();
        bobsAddress = await bob.getAddress();
        aliceInitialBalance = 5;
        tokenId = 10;
    });
    let L1ERC721;
    let L1ERC721Bridge;
    let Fake__L1CrossDomainMessenger;
    beforeEach(async () => {
        Fake__L1CrossDomainMessenger = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('L1CrossDomainMessenger'), { address: await l1MessengerImpersonator.getAddress() });
        L1ERC721Bridge = await (await hardhat_1.ethers.getContractFactory('L1ERC721Bridge')).deploy();
        await L1ERC721Bridge.initialize(Fake__L1CrossDomainMessenger.address, DUMMY_L2_BRIDGE_ADDRESS);
        L1ERC721 = await Factory__L1ERC721.deploy('L1ERC721', 'ERC');
        await L1ERC721.setVariable('_owners', {
            [tokenId]: aliceAddress,
        });
        await L1ERC721.setVariable('_balances', {
            [aliceAddress]: aliceInitialBalance,
        });
    });
    describe('initialize', () => {
        it('Should only be callable once', async () => {
            await (0, setup_1.expect)(L1ERC721Bridge.initialize(hardhat_1.ethers.constants.AddressZero, DUMMY_L2_BRIDGE_ADDRESS)).to.be.revertedWith(ERR_ALREADY_INITIALIZED);
        });
    });
    describe('ERC721 deposits', () => {
        beforeEach(async () => {
            await L1ERC721.connect(alice).approve(L1ERC721Bridge.address, tokenId);
        });
        it('depositERC721() escrows the deposit and sends the correct deposit message', async () => {
            await L1ERC721Bridge.connect(alice).depositERC721(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, tokenId, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32);
            const depositCallToMessenger = Fake__L1CrossDomainMessenger.sendMessage.getCall(0);
            const depositerBalance = await L1ERC721.balanceOf(aliceAddress);
            (0, setup_1.expect)(depositerBalance).to.equal(aliceInitialBalance - 1);
            const bridgeBalance = await L1ERC721.balanceOf(L1ERC721Bridge.address);
            (0, setup_1.expect)(bridgeBalance).to.equal(1);
            (0, setup_1.expect)(depositCallToMessenger.args[0]).to.equal(DUMMY_L2_BRIDGE_ADDRESS);
            (0, setup_1.expect)(depositCallToMessenger.args[1]).to.equal(IL2ERC721Bridge.encodeFunctionData('finalizeDeposit', [
                L1ERC721.address,
                DUMMY_L2_ERC721_ADDRESS,
                aliceAddress,
                aliceAddress,
                tokenId,
                helpers_1.NON_NULL_BYTES32,
            ]));
            (0, setup_1.expect)(depositCallToMessenger.args[2]).to.equal(FINALIZATION_GAS);
            (0, setup_1.expect)(await L1ERC721Bridge.deposits(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, tokenId)).to.equal(true);
        });
        it('depositERC721To() escrows the deposited NFT and sends the correct deposit message', async () => {
            await L1ERC721Bridge.connect(alice).depositERC721To(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, bobsAddress, tokenId, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32);
            const depositCallToMessenger = Fake__L1CrossDomainMessenger.sendMessage.getCall(0);
            const depositerBalance = await L1ERC721.balanceOf(aliceAddress);
            (0, setup_1.expect)(depositerBalance).to.equal(aliceInitialBalance - 1);
            const bridgeBalance = await L1ERC721.balanceOf(L1ERC721Bridge.address);
            (0, setup_1.expect)(bridgeBalance).to.equal(1);
            const tokenIdOwner = await L1ERC721.ownerOf(tokenId);
            (0, setup_1.expect)(tokenIdOwner).to.equal(L1ERC721Bridge.address);
            (0, setup_1.expect)(depositCallToMessenger.args[0]).to.equal(DUMMY_L2_BRIDGE_ADDRESS);
            (0, setup_1.expect)(depositCallToMessenger.args[1]).to.equal(IL2ERC721Bridge.encodeFunctionData('finalizeDeposit', [
                L1ERC721.address,
                DUMMY_L2_ERC721_ADDRESS,
                aliceAddress,
                bobsAddress,
                tokenId,
                helpers_1.NON_NULL_BYTES32,
            ]));
            (0, setup_1.expect)(depositCallToMessenger.args[2]).to.equal(FINALIZATION_GAS);
            (0, setup_1.expect)(await L1ERC721Bridge.deposits(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, tokenId)).to.equal(true);
        });
        it('cannot depositERC721 from a contract account', async () => {
            await (0, setup_1.expect)(L1ERC721Bridge.depositERC721(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, tokenId, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith('Account not EOA');
        });
        describe('Handling ERC721.safeTransferFrom() failures that revert', () => {
            it('depositERC721(): will revert if ERC721.safeTransferFrom() reverts', async () => {
                await (0, setup_1.expect)(L1ERC721Bridge.connect(bob).depositERC721To(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, bobsAddress, tokenId, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith('ERC721: transfer of token that is not own');
            });
            it('depositERC721To(): will revert if ERC721.safeTransferFrom() reverts', async () => {
                await (0, setup_1.expect)(L1ERC721Bridge.connect(bob).depositERC721To(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, bobsAddress, tokenId, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith('ERC721: transfer of token that is not own');
            });
            it('depositERC721To(): will revert if the L1 ERC721 is zero address', async () => {
                await (0, setup_1.expect)(L1ERC721Bridge.connect(alice).depositERC721To(ethers_1.constants.AddressZero, DUMMY_L2_ERC721_ADDRESS, bobsAddress, tokenId, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith('function call to a non-contract account');
            });
            it('depositERC721To(): will revert if the L1 ERC721 has no code', async () => {
                await (0, setup_1.expect)(L1ERC721Bridge.connect(alice).depositERC721To(bobsAddress, DUMMY_L2_ERC721_ADDRESS, bobsAddress, tokenId, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith('function call to a non-contract account');
            });
        });
        it('correct selector is returned from call to onERC721Received', async () => {
            const selector = L1ERC721Bridge.interface.getSighash('onERC721Received');
            (0, setup_1.expect)(await L1ERC721Bridge.onERC721Received(L1ERC721Bridge.address, aliceAddress, tokenId, helpers_1.NON_NULL_BYTES32)).to.equal(selector);
        });
    });
    describe('ERC721 withdrawals', () => {
        it('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L1 account', async () => {
            await (0, setup_1.expect)(L1ERC721Bridge.connect(alice).finalizeERC721Withdrawal(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, ethers_1.constants.AddressZero, ethers_1.constants.AddressZero, tokenId, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith(ERR_INVALID_MESSENGER);
        });
        it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L2DepositedERC721)', async () => {
            await (0, setup_1.expect)(L1ERC721Bridge.finalizeERC721Withdrawal(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, ethers_1.constants.AddressZero, ethers_1.constants.AddressZero, tokenId, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L1CrossDomainMessenger.address,
            })).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MSG_SENDER);
        });
        it('should credit funds to the withdrawer and not use too much gas', async () => {
            await L1ERC721.connect(alice).approve(L1ERC721Bridge.address, tokenId);
            await L1ERC721Bridge.connect(alice).depositERC721(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, tokenId, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32);
            (0, setup_1.expect)(await L1ERC721.ownerOf(tokenId)).to.equal(L1ERC721Bridge.address);
            Fake__L1CrossDomainMessenger.xDomainMessageSender.returns(() => DUMMY_L2_BRIDGE_ADDRESS);
            await L1ERC721Bridge.finalizeERC721Withdrawal(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, tokenId, helpers_1.NON_NULL_BYTES32, { from: Fake__L1CrossDomainMessenger.address });
            (0, setup_1.expect)(await L1ERC721.ownerOf(tokenId)).to.equal(helpers_1.NON_ZERO_ADDRESS);
            (0, setup_1.expect)(await L1ERC721Bridge.deposits(L1ERC721.address, DUMMY_L2_ERC721_ADDRESS, tokenId)).to.equal(false);
        });
    });
});
//# sourceMappingURL=L1ERC721Bridge.spec.js.map