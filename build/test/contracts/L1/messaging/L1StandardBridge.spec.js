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
const DUMMY_L2_ERC20_ADDRESS = hardhat_1.ethers.utils.getAddress('0x' + 'abba'.repeat(10));
const DUMMY_L2_BRIDGE_ADDRESS = hardhat_1.ethers.utils.getAddress('0x' + 'acdc'.repeat(10));
const INITIAL_TOTAL_L1_SUPPLY = 5000;
const FINALIZATION_GAS = 1200000;
describe('L1StandardBridge', () => {
    let l1MessengerImpersonator;
    let alice;
    let bob;
    let bobsAddress;
    let aliceAddress;
    let Factory__L1ERC20;
    let IL2ERC20Bridge;
    before(async () => {
        ;
        [l1MessengerImpersonator, alice, bob] = await hardhat_1.ethers.getSigners();
        await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('OVM_ETH'));
        Factory__L1ERC20 = await smock_1.smock.mock('@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20');
        IL2ERC20Bridge = (0, src_1.getContractInterface)('IL2ERC20Bridge');
        aliceAddress = await alice.getAddress();
        bobsAddress = await bob.getAddress();
    });
    let L1ERC20;
    let L1StandardBridge;
    let Fake__L1CrossDomainMessenger;
    beforeEach(async () => {
        Fake__L1CrossDomainMessenger = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('L1CrossDomainMessenger'), { address: await l1MessengerImpersonator.getAddress() });
        L1StandardBridge = await (await hardhat_1.ethers.getContractFactory('L1StandardBridge')).deploy();
        await L1StandardBridge.initialize(Fake__L1CrossDomainMessenger.address, DUMMY_L2_BRIDGE_ADDRESS);
        L1ERC20 = await Factory__L1ERC20.deploy('L1ERC20', 'ERC');
        await L1ERC20.setVariable('_totalSupply', INITIAL_TOTAL_L1_SUPPLY);
        await L1ERC20.setVariable('_balances', {
            [aliceAddress]: INITIAL_TOTAL_L1_SUPPLY,
        });
    });
    describe('initialize', () => {
        it('Should only be callable once', async () => {
            await (0, setup_1.expect)(L1StandardBridge.initialize(hardhat_1.ethers.constants.AddressZero, DUMMY_L2_BRIDGE_ADDRESS)).to.be.revertedWith(ERR_ALREADY_INITIALIZED);
        });
    });
    describe('receive', () => {
        it('should send an amount of ETH to the callers balance on L2', async () => {
            await (0, setup_1.expect)(alice.sendTransaction({
                to: L1StandardBridge.address,
                data: '0x',
            })).to.not.be.reverted;
        });
    });
    describe('ETH deposits', () => {
        const depositAmount = 1000;
        it('depositETH() escrows the deposit amount and sends the correct deposit message', async () => {
            const depositer = await alice.getAddress();
            const initialBalance = await hardhat_1.ethers.provider.getBalance(depositer);
            const res = await L1StandardBridge.connect(alice).depositETH(FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32, {
                value: depositAmount,
            });
            const depositCallToMessenger = Fake__L1CrossDomainMessenger.sendMessage.getCall(0);
            const depositerBalance = await hardhat_1.ethers.provider.getBalance(depositer);
            const receipt = await res.wait();
            const depositerFeePaid = receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice);
            (0, setup_1.expect)(depositerBalance).to.equal(initialBalance.sub(depositAmount).sub(depositerFeePaid));
            const bridgeBalance = await hardhat_1.ethers.provider.getBalance(L1StandardBridge.address);
            (0, setup_1.expect)(bridgeBalance).to.equal(depositAmount);
            (0, setup_1.expect)(depositCallToMessenger.args[0]).to.equal(DUMMY_L2_BRIDGE_ADDRESS);
            (0, setup_1.expect)(depositCallToMessenger.args[1]).to.equal(IL2ERC20Bridge.encodeFunctionData('finalizeDeposit', [
                ethers_1.constants.AddressZero,
                src_1.predeploys.OVM_ETH,
                depositer,
                depositer,
                depositAmount,
                helpers_1.NON_NULL_BYTES32,
            ]));
            (0, setup_1.expect)(depositCallToMessenger.args[2]).to.equal(FINALIZATION_GAS);
        });
        it('depositETHTo() escrows the deposit amount and sends the correct deposit message', async () => {
            const initialBalance = await hardhat_1.ethers.provider.getBalance(aliceAddress);
            const res = await L1StandardBridge.connect(alice).depositETHTo(bobsAddress, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32, {
                value: depositAmount,
            });
            const depositCallToMessenger = Fake__L1CrossDomainMessenger.sendMessage.getCall(0);
            const depositerBalance = await hardhat_1.ethers.provider.getBalance(aliceAddress);
            const receipt = await res.wait();
            const depositerFeePaid = receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice);
            (0, setup_1.expect)(depositerBalance).to.equal(initialBalance.sub(depositAmount).sub(depositerFeePaid));
            const bridgeBalance = await hardhat_1.ethers.provider.getBalance(L1StandardBridge.address);
            (0, setup_1.expect)(bridgeBalance).to.equal(depositAmount);
            (0, setup_1.expect)(depositCallToMessenger.args[0]).to.equal(DUMMY_L2_BRIDGE_ADDRESS);
            (0, setup_1.expect)(depositCallToMessenger.args[1]).to.equal(IL2ERC20Bridge.encodeFunctionData('finalizeDeposit', [
                ethers_1.constants.AddressZero,
                src_1.predeploys.OVM_ETH,
                aliceAddress,
                bobsAddress,
                depositAmount,
                helpers_1.NON_NULL_BYTES32,
            ]));
            (0, setup_1.expect)(depositCallToMessenger.args[2]).to.equal(FINALIZATION_GAS);
        });
        it('cannot depositETH from a contract account', async () => {
            (0, setup_1.expect)(L1StandardBridge.depositETH(FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32, {
                value: depositAmount,
            })).to.be.revertedWith('Account not EOA');
        });
    });
    describe('ETH withdrawals', () => {
        it('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L1 account', async () => {
            await (0, setup_1.expect)(L1StandardBridge.connect(alice).finalizeETHWithdrawal(ethers_1.constants.AddressZero, ethers_1.constants.AddressZero, 1, helpers_1.NON_NULL_BYTES32, {
                from: aliceAddress,
            })).to.be.revertedWith(ERR_INVALID_MESSENGER);
        });
        it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L2ETHToken)', async () => {
            L1StandardBridge = await (await hardhat_1.ethers.getContractFactory('L1StandardBridge')).deploy();
            await L1StandardBridge.initialize(Fake__L1CrossDomainMessenger.address, DUMMY_L2_BRIDGE_ADDRESS);
            Fake__L1CrossDomainMessenger.xDomainMessageSender.returns('0x' + '22'.repeat(20));
            await (0, setup_1.expect)(L1StandardBridge.finalizeETHWithdrawal(ethers_1.constants.AddressZero, ethers_1.constants.AddressZero, 1, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L1CrossDomainMessenger.address,
            })).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MSG_SENDER);
        });
        it('should revert in nothing to withdraw', async () => {
            (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(helpers_1.NON_ZERO_ADDRESS)).to.be.equal(0);
            const withdrawalAmount = 100;
            Fake__L1CrossDomainMessenger.xDomainMessageSender.returns(() => DUMMY_L2_BRIDGE_ADDRESS);
            await (0, setup_1.expect)(L1StandardBridge.finalizeETHWithdrawal(helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, withdrawalAmount, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L1CrossDomainMessenger.address,
            })).to.be.revertedWith('TransferHelper::safeTransferETH: ETH transfer failed');
        });
        it('should credit funds to the withdrawer and not use too much gas', async () => {
            (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(helpers_1.NON_ZERO_ADDRESS)).to.be.equal(0);
            const withdrawalAmount = 100;
            Fake__L1CrossDomainMessenger.xDomainMessageSender.returns(() => DUMMY_L2_BRIDGE_ADDRESS);
            await L1StandardBridge.connect(alice).depositETH(FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32, {
                value: hardhat_1.ethers.utils.parseEther('1.0'),
            });
            await L1StandardBridge.finalizeETHWithdrawal(helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, withdrawalAmount, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L1CrossDomainMessenger.address,
            });
            (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(helpers_1.NON_ZERO_ADDRESS)).to.be.equal(withdrawalAmount);
        });
    });
    describe('ERC20 deposits', () => {
        const depositAmount = 1000;
        beforeEach(async () => {
            await L1ERC20.connect(alice).approve(L1StandardBridge.address, depositAmount);
        });
        it('depositERC20() escrows the deposit amount and sends the correct deposit message', async () => {
            await L1StandardBridge.connect(alice).depositERC20(L1ERC20.address, DUMMY_L2_ERC20_ADDRESS, depositAmount, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32);
            const depositCallToMessenger = Fake__L1CrossDomainMessenger.sendMessage.getCall(0);
            const depositerBalance = await L1ERC20.balanceOf(aliceAddress);
            (0, setup_1.expect)(depositerBalance).to.equal(INITIAL_TOTAL_L1_SUPPLY - depositAmount);
            const bridgeBalance = await L1ERC20.balanceOf(L1StandardBridge.address);
            (0, setup_1.expect)(bridgeBalance).to.equal(depositAmount);
            (0, setup_1.expect)(depositCallToMessenger.args[0]).to.equal(DUMMY_L2_BRIDGE_ADDRESS);
            (0, setup_1.expect)(depositCallToMessenger.args[1]).to.equal(IL2ERC20Bridge.encodeFunctionData('finalizeDeposit', [
                L1ERC20.address,
                DUMMY_L2_ERC20_ADDRESS,
                aliceAddress,
                aliceAddress,
                depositAmount,
                helpers_1.NON_NULL_BYTES32,
            ]));
            (0, setup_1.expect)(depositCallToMessenger.args[2]).to.equal(FINALIZATION_GAS);
        });
        it('depositERC20To() escrows the deposit amount and sends the correct deposit message', async () => {
            await L1StandardBridge.connect(alice).depositERC20To(L1ERC20.address, DUMMY_L2_ERC20_ADDRESS, bobsAddress, depositAmount, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32);
            const depositCallToMessenger = Fake__L1CrossDomainMessenger.sendMessage.getCall(0);
            const depositerBalance = await L1ERC20.balanceOf(aliceAddress);
            (0, setup_1.expect)(depositerBalance).to.equal(INITIAL_TOTAL_L1_SUPPLY - depositAmount);
            const bridgeBalance = await L1ERC20.balanceOf(L1StandardBridge.address);
            (0, setup_1.expect)(bridgeBalance).to.equal(depositAmount);
            (0, setup_1.expect)(depositCallToMessenger.args[0]).to.equal(DUMMY_L2_BRIDGE_ADDRESS);
            (0, setup_1.expect)(depositCallToMessenger.args[1]).to.equal(IL2ERC20Bridge.encodeFunctionData('finalizeDeposit', [
                L1ERC20.address,
                DUMMY_L2_ERC20_ADDRESS,
                aliceAddress,
                bobsAddress,
                depositAmount,
                helpers_1.NON_NULL_BYTES32,
            ]));
            (0, setup_1.expect)(depositCallToMessenger.args[2]).to.equal(FINALIZATION_GAS);
        });
        it('cannot depositERC20 from a contract account', async () => {
            await (0, setup_1.expect)(L1StandardBridge.depositERC20(L1ERC20.address, DUMMY_L2_ERC20_ADDRESS, depositAmount, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith('Account not EOA');
        });
        describe('Handling ERC20.transferFrom() failures that revert ', () => {
            let Fake__L1ERC20;
            before(async () => {
                Fake__L1ERC20 = await smock_1.smock.fake(await Factory__L1ERC20.deploy('L1ERC20', 'ERC'));
                Fake__L1ERC20.transferFrom.reverts();
            });
            it('depositERC20(): will revert if ERC20.transferFrom() reverts', async () => {
                await (0, setup_1.expect)(L1StandardBridge.connect(alice).depositERC20(Fake__L1ERC20.address, DUMMY_L2_ERC20_ADDRESS, depositAmount, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith('SafeERC20: low-level call failed');
            });
            it('depositERC20To(): will revert if ERC20.transferFrom() reverts', async () => {
                await (0, setup_1.expect)(L1StandardBridge.connect(alice).depositERC20To(Fake__L1ERC20.address, DUMMY_L2_ERC20_ADDRESS, bobsAddress, depositAmount, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith('SafeERC20: low-level call failed');
            });
            it('depositERC20To(): will revert if the L1 ERC20 has no code or is zero address', async () => {
                await (0, setup_1.expect)(L1StandardBridge.connect(alice).depositERC20To(hardhat_1.ethers.constants.AddressZero, DUMMY_L2_ERC20_ADDRESS, bobsAddress, depositAmount, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith('Address: call to non-contract');
            });
        });
        describe('Handling ERC20.transferFrom failures that return false', () => {
            let Fake__L1ERC20;
            before(async () => {
                Fake__L1ERC20 = await smock_1.smock.fake(await Factory__L1ERC20.deploy('L1ERC20', 'ERC'));
                Fake__L1ERC20.transferFrom.returns(false);
            });
            it('deposit(): will revert if ERC20.transferFrom() returns false', async () => {
                await (0, setup_1.expect)(L1StandardBridge.connect(alice).depositERC20(Fake__L1ERC20.address, DUMMY_L2_ERC20_ADDRESS, depositAmount, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith('SafeERC20: ERC20 operation did not succeed');
            });
            it('depositTo(): will revert if ERC20.transferFrom() returns false', async () => {
                await (0, setup_1.expect)(L1StandardBridge.depositERC20To(Fake__L1ERC20.address, DUMMY_L2_ERC20_ADDRESS, bobsAddress, depositAmount, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith('SafeERC20: ERC20 operation did not succeed');
            });
        });
    });
    describe('ERC20 withdrawals', () => {
        it('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L1 account', async () => {
            await (0, setup_1.expect)(L1StandardBridge.connect(alice).finalizeERC20Withdrawal(L1ERC20.address, DUMMY_L2_ERC20_ADDRESS, ethers_1.constants.AddressZero, ethers_1.constants.AddressZero, 1, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith(ERR_INVALID_MESSENGER);
        });
        it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L2DepositedERC20)', async () => {
            Fake__L1CrossDomainMessenger.xDomainMessageSender.returns(() => helpers_1.NON_ZERO_ADDRESS);
            await (0, setup_1.expect)(L1StandardBridge.finalizeERC20Withdrawal(L1ERC20.address, DUMMY_L2_ERC20_ADDRESS, ethers_1.constants.AddressZero, ethers_1.constants.AddressZero, 1, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L1CrossDomainMessenger.address,
            })).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MSG_SENDER);
        });
        it('should credit funds to the withdrawer and not use too much gas', async () => {
            const withdrawalAmount = 10;
            await L1ERC20.connect(alice).approve(L1StandardBridge.address, withdrawalAmount);
            await L1StandardBridge.connect(alice).depositERC20(L1ERC20.address, DUMMY_L2_ERC20_ADDRESS, withdrawalAmount, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32);
            (0, setup_1.expect)(await L1ERC20.balanceOf(L1StandardBridge.address)).to.be.equal(withdrawalAmount);
            (0, setup_1.expect)(await L1ERC20.balanceOf(helpers_1.NON_ZERO_ADDRESS)).to.be.equal(0);
            Fake__L1CrossDomainMessenger.xDomainMessageSender.returns(() => DUMMY_L2_BRIDGE_ADDRESS);
            await L1StandardBridge.finalizeERC20Withdrawal(L1ERC20.address, DUMMY_L2_ERC20_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, withdrawalAmount, helpers_1.NON_NULL_BYTES32, { from: Fake__L1CrossDomainMessenger.address });
            (0, setup_1.expect)(await L1ERC20.balanceOf(helpers_1.NON_ZERO_ADDRESS)).to.be.equal(withdrawalAmount);
        });
    });
    describe('donateETH', () => {
        it('it should just call the function', async () => {
            await (0, setup_1.expect)(L1StandardBridge.donateETH()).to.not.be.reverted;
        });
        it('should send ETH to the contract account', async () => {
            await (0, setup_1.expect)(L1StandardBridge.donateETH({
                value: 100,
            })).to.not.be.reverted;
        });
    });
});
//# sourceMappingURL=L1StandardBridge.spec.js.map