"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const smock_1 = require("@defi-wonderland/smock");
const setup_1 = require("../../../setup");
const helpers_1 = require("../../../helpers");
const src_1 = require("../../../../src");
const ERR_INVALID_MESSENGER = 'OVM_XCHAIN: messenger contract unauthenticated';
const ERR_INVALID_X_DOMAIN_MSG_SENDER = 'OVM_XCHAIN: wrong sender of cross-domain message';
const DUMMY_L1BRIDGE_ADDRESS = '0x1234123412341234123412341234123412341234';
const DUMMY_L1TOKEN_ADDRESS = '0x2234223412342234223422342234223422342234';
const OVM_ETH_ADDRESS = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000';
describe('L2StandardBridge', () => {
    let alice;
    let aliceAddress;
    let bob;
    let bobsAddress;
    let l2MessengerImpersonator;
    let Factory__L1StandardBridge;
    const INITIAL_TOTAL_SUPPLY = 100000;
    const ALICE_INITIAL_BALANCE = 50000;
    before(async () => {
        ;
        [alice, bob, l2MessengerImpersonator] = await hardhat_1.ethers.getSigners();
        aliceAddress = await alice.getAddress();
        bobsAddress = await bob.getAddress();
        Factory__L1StandardBridge = await hardhat_1.ethers.getContractFactory('L1StandardBridge');
        (0, src_1.getContractInterface)('IL2ERC20Bridge');
    });
    let L2StandardBridge;
    let L2ERC20;
    let Fake__L2CrossDomainMessenger;
    beforeEach(async () => {
        Fake__L2CrossDomainMessenger = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('L2CrossDomainMessenger'), { address: await l2MessengerImpersonator.getAddress() });
        L2StandardBridge = await (await hardhat_1.ethers.getContractFactory('L2StandardBridge')).deploy(Fake__L2CrossDomainMessenger.address, DUMMY_L1BRIDGE_ADDRESS);
        L2ERC20 = await (await hardhat_1.ethers.getContractFactory('L2StandardERC20', alice)).deploy(L2StandardBridge.address, DUMMY_L1TOKEN_ADDRESS, 'L2Token', 'L2T');
    });
    describe('finalizeDeposit', () => {
        it.only('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L2 account', async () => {
            await (0, setup_1.expect)(L2StandardBridge.finalizeDeposit(DUMMY_L1TOKEN_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, 0, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith(ERR_INVALID_MESSENGER);
        });
        it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L1L1StandardBridge)', async () => {
            Fake__L2CrossDomainMessenger.xDomainMessageSender.returns(helpers_1.NON_ZERO_ADDRESS);
            await (0, setup_1.expect)(L2StandardBridge.connect(l2MessengerImpersonator).finalizeDeposit(DUMMY_L1TOKEN_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, 0, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L2CrossDomainMessenger.address,
            })).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MSG_SENDER);
        });
        it('should initialize a withdrawal if the L2 token is not compliant', async () => {
            const NonCompliantERC20 = await (await hardhat_1.ethers.getContractFactory('@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20')).deploy('L2Token', 'L2T');
            L2StandardBridge.connect(l2MessengerImpersonator).finalizeDeposit(DUMMY_L1TOKEN_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, 0, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L2CrossDomainMessenger.address,
            });
            Fake__L2CrossDomainMessenger.xDomainMessageSender.returns(() => DUMMY_L1BRIDGE_ADDRESS);
            await L2StandardBridge.connect(l2MessengerImpersonator).finalizeDeposit(DUMMY_L1TOKEN_ADDRESS, NonCompliantERC20.address, aliceAddress, bobsAddress, 100, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L2CrossDomainMessenger.address,
            });
            const withdrawalCallToMessenger = Fake__L2CrossDomainMessenger.sendMessage.getCall(1);
            (0, setup_1.expect)(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS);
            (0, setup_1.expect)(withdrawalCallToMessenger.args[1]).to.equal(Factory__L1StandardBridge.interface.encodeFunctionData('finalizeERC20Withdrawal', [
                DUMMY_L1TOKEN_ADDRESS,
                NonCompliantERC20.address,
                bobsAddress,
                aliceAddress,
                100,
                helpers_1.NON_NULL_BYTES32,
            ]));
        });
        it('should credit funds to the depositor', async () => {
            const depositAmount = 100;
            Fake__L2CrossDomainMessenger.xDomainMessageSender.returns(() => DUMMY_L1BRIDGE_ADDRESS);
            await L2StandardBridge.connect(l2MessengerImpersonator).finalizeDeposit(DUMMY_L1TOKEN_ADDRESS, L2ERC20.address, aliceAddress, bobsAddress, depositAmount, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L2CrossDomainMessenger.address,
            });
            const bobsBalance = await L2ERC20.balanceOf(bobsAddress);
            bobsBalance.should.equal(depositAmount);
        });
    });
    describe('withdrawals', () => {
        const withdrawAmount = 1000;
        let Mock__L2Token;
        let Fake__OVM_ETH;
        before(async () => {
            Fake__OVM_ETH = await smock_1.smock.fake('OVM_ETH', {
                address: OVM_ETH_ADDRESS,
            });
        });
        beforeEach(async () => {
            Mock__L2Token = await (await smock_1.smock.mock('L2StandardERC20')).deploy(L2StandardBridge.address, DUMMY_L1TOKEN_ADDRESS, 'L2Token', 'L2T');
            await Mock__L2Token.setVariable('_totalSupply', INITIAL_TOTAL_SUPPLY);
            await Mock__L2Token.setVariable('_balances', {
                [aliceAddress]: ALICE_INITIAL_BALANCE,
            });
            await Mock__L2Token.setVariable('l2Bridge', L2StandardBridge.address);
        });
        it('withdraw() withdraws and sends the correct withdrawal message for OVM_ETH', async () => {
            await L2StandardBridge.withdraw(Fake__OVM_ETH.address, 0, 0, helpers_1.NON_NULL_BYTES32);
            const withdrawalCallToMessenger = Fake__L2CrossDomainMessenger.sendMessage.getCall(0);
            (0, setup_1.expect)(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS);
            (0, setup_1.expect)(withdrawalCallToMessenger.args[1]).to.equal(Factory__L1StandardBridge.interface.encodeFunctionData('finalizeETHWithdrawal', [
                await alice.getAddress(),
                await alice.getAddress(),
                0,
                helpers_1.NON_NULL_BYTES32,
            ]));
        });
        it('withdraw() burns and sends the correct withdrawal message', async () => {
            await L2StandardBridge.withdraw(Mock__L2Token.address, withdrawAmount, 0, helpers_1.NON_NULL_BYTES32);
            const withdrawalCallToMessenger = Fake__L2CrossDomainMessenger.sendMessage.getCall(0);
            const aliceBalance = await Mock__L2Token.balanceOf(await alice.getAddress());
            (0, setup_1.expect)(aliceBalance).to.deep.equal(hardhat_1.ethers.BigNumber.from(ALICE_INITIAL_BALANCE - withdrawAmount));
            const newTotalSupply = await Mock__L2Token.totalSupply();
            (0, setup_1.expect)(newTotalSupply).to.deep.equal(hardhat_1.ethers.BigNumber.from(INITIAL_TOTAL_SUPPLY - withdrawAmount));
            (0, setup_1.expect)(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS);
            (0, setup_1.expect)(withdrawalCallToMessenger.args[1]).to.equal(Factory__L1StandardBridge.interface.encodeFunctionData('finalizeERC20Withdrawal', [
                DUMMY_L1TOKEN_ADDRESS,
                Mock__L2Token.address,
                await alice.getAddress(),
                await alice.getAddress(),
                withdrawAmount,
                helpers_1.NON_NULL_BYTES32,
            ]));
            (0, setup_1.expect)(withdrawalCallToMessenger.args[2]).to.equal(0);
        });
        it('withdrawTo() burns and sends the correct withdrawal message', async () => {
            await L2StandardBridge.withdrawTo(Mock__L2Token.address, await bob.getAddress(), withdrawAmount, 0, helpers_1.NON_NULL_BYTES32);
            const withdrawalCallToMessenger = Fake__L2CrossDomainMessenger.sendMessage.getCall(0);
            const aliceBalance = await Mock__L2Token.balanceOf(await alice.getAddress());
            (0, setup_1.expect)(aliceBalance).to.deep.equal(hardhat_1.ethers.BigNumber.from(ALICE_INITIAL_BALANCE - withdrawAmount));
            const newTotalSupply = await Mock__L2Token.totalSupply();
            (0, setup_1.expect)(newTotalSupply).to.deep.equal(hardhat_1.ethers.BigNumber.from(INITIAL_TOTAL_SUPPLY - withdrawAmount));
            (0, setup_1.expect)(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS);
            (0, setup_1.expect)(withdrawalCallToMessenger.args[1]).to.equal(Factory__L1StandardBridge.interface.encodeFunctionData('finalizeERC20Withdrawal', [
                DUMMY_L1TOKEN_ADDRESS,
                Mock__L2Token.address,
                await alice.getAddress(),
                await bob.getAddress(),
                withdrawAmount,
                helpers_1.NON_NULL_BYTES32,
            ]));
            (0, setup_1.expect)(withdrawalCallToMessenger.args[2]).to.equal(0);
        });
    });
    describe('standard erc20', () => {
        it('should not allow anyone but the L2 bridge to mint and burn', async () => {
            (0, setup_1.expect)(L2ERC20.connect(alice).mint(aliceAddress, 100)).to.be.revertedWith('Only L2 Bridge can mint and burn');
            (0, setup_1.expect)(L2ERC20.connect(alice).burn(aliceAddress, 100)).to.be.revertedWith('Only L2 Bridge can mint and burn');
        });
        it('should return the correct interface support', async () => {
            const supportsERC165 = await L2ERC20.supportsInterface(0x01ffc9a7);
            (0, setup_1.expect)(supportsERC165).to.be.true;
            const supportsL2TokenInterface = await L2ERC20.supportsInterface(0x1d1d8b63);
            (0, setup_1.expect)(supportsL2TokenInterface).to.be.true;
            const badSupports = await L2ERC20.supportsInterface(0xffffffff);
            (0, setup_1.expect)(badSupports).to.be.false;
        });
    });
});
//# sourceMappingURL=L2StandardBridge.spec.js.map