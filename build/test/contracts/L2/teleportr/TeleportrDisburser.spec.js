"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const setup_1 = require("../../../setup");
describe('TeleportrDisburser', async () => {
    const zeroETH = hardhat_1.ethers.utils.parseEther('0.0');
    const oneETH = hardhat_1.ethers.utils.parseEther('1.0');
    const twoETH = hardhat_1.ethers.utils.parseEther('2.0');
    let teleportrDisburser;
    let failingReceiver;
    let signer;
    let signer2;
    let contractAddress;
    let failingReceiverAddress;
    let signerAddress;
    let signer2Address;
    before(async () => {
        ;
        [signer, signer2] = await hardhat_1.ethers.getSigners();
        teleportrDisburser = await (await hardhat_1.ethers.getContractFactory('TeleportrDisburser')).deploy();
        failingReceiver = await (await hardhat_1.ethers.getContractFactory('FailingReceiver')).deploy();
        contractAddress = teleportrDisburser.address;
        failingReceiverAddress = failingReceiver.address;
        signerAddress = await signer.getAddress();
        signer2Address = await signer2.getAddress();
    });
    describe('disburse checks', async () => {
        it('should revert if called by non-owner', async () => {
            await (0, setup_1.expect)(teleportrDisburser.connect(signer2).disburse(0, [], { value: oneETH })).to.be.revertedWith('Ownable: caller is not the owner');
        });
        it('should revert if no disbursements is zero length', async () => {
            await (0, setup_1.expect)(teleportrDisburser.disburse(0, [], { value: oneETH })).to.be.revertedWith('No disbursements');
        });
        it('should revert if nextDepositId does not match expected value', async () => {
            await (0, setup_1.expect)(teleportrDisburser.disburse(1, [[oneETH, signer2Address]], {
                value: oneETH,
            })).to.be.revertedWith('Unexpected next deposit id');
        });
        it('should revert if msg.value does not match total to disburse', async () => {
            await (0, setup_1.expect)(teleportrDisburser.disburse(0, [[oneETH, signer2Address]], {
                value: zeroETH,
            })).to.be.revertedWith('Disbursement total != amount sent');
        });
    });
    describe('disburse single success', async () => {
        let signerInitialBalance;
        let signer2InitialBalance;
        it('should emit DisbursementSuccess for successful disbursement', async () => {
            signerInitialBalance = await hardhat_1.ethers.provider.getBalance(signerAddress);
            signer2InitialBalance = await hardhat_1.ethers.provider.getBalance(signer2Address);
            await (0, setup_1.expect)(teleportrDisburser.disburse(0, [[oneETH, signer2Address]], {
                value: oneETH,
            }))
                .to.emit(teleportrDisburser, 'DisbursementSuccess')
                .withArgs(ethers_1.BigNumber.from(0), signer2Address, oneETH);
        });
        it('should show one total disbursement', async () => {
            await (0, setup_1.expect)(await teleportrDisburser.totalDisbursements()).to.be.equal(ethers_1.BigNumber.from(1));
        });
        it('should leave contract balance at zero ETH', async () => {
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(contractAddress)).to.be.equal(zeroETH);
        });
        it('should increase recipients balance by disbursement amount', async () => {
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(signer2Address)).to.be.equal(signer2InitialBalance.add(oneETH));
        });
        it('should decrease owners balance by disbursement amount - fees', async () => {
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(signerAddress)).to.be.closeTo(signerInitialBalance.sub(oneETH), 10 ** 15);
        });
    });
    describe('disburse single failure', async () => {
        let signerInitialBalance;
        it('should emit DisbursementFailed for failed disbursement', async () => {
            signerInitialBalance = await hardhat_1.ethers.provider.getBalance(signerAddress);
            await (0, setup_1.expect)(teleportrDisburser.disburse(1, [[oneETH, failingReceiverAddress]], {
                value: oneETH,
            }))
                .to.emit(teleportrDisburser, 'DisbursementFailed')
                .withArgs(ethers_1.BigNumber.from(1), failingReceiverAddress, oneETH);
        });
        it('should show two total disbursements', async () => {
            await (0, setup_1.expect)(await teleportrDisburser.totalDisbursements()).to.be.equal(ethers_1.BigNumber.from(2));
        });
        it('should leave contract with disbursement amount', async () => {
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(contractAddress)).to.be.equal(oneETH);
        });
        it('should leave recipients balance at zero ETH', async () => {
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(failingReceiverAddress)).to.be.equal(zeroETH);
        });
        it('should decrease owners balance by disbursement amount - fees', async () => {
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(signerAddress)).to.be.closeTo(signerInitialBalance.sub(oneETH), 10 ** 15);
        });
    });
    describe('withdrawBalance', async () => {
        let initialContractBalance;
        let initialSignerBalance;
        it('should revert if called by non-owner', async () => {
            await (0, setup_1.expect)(teleportrDisburser.connect(signer2).withdrawBalance()).to.be.revertedWith('Ownable: caller is not the owner');
        });
        it('should emit BalanceWithdrawn if called by owner', async () => {
            initialContractBalance = await hardhat_1.ethers.provider.getBalance(contractAddress);
            initialSignerBalance = await hardhat_1.ethers.provider.getBalance(signerAddress);
            await (0, setup_1.expect)(teleportrDisburser.withdrawBalance())
                .to.emit(teleportrDisburser, 'BalanceWithdrawn')
                .withArgs(signerAddress, oneETH);
        });
        it('should leave contract with zero balance', async () => {
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(contractAddress)).to.equal(zeroETH);
        });
        it('should credit owner with contract balance - fees', async () => {
            const expSignerBalance = initialSignerBalance.add(initialContractBalance);
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(signerAddress)).to.be.closeTo(expSignerBalance, 10 ** 15);
        });
    });
    describe('disburse multiple', async () => {
        let signerInitialBalance;
        let signer2InitialBalance;
        it('should emit DisbursementSuccess for successful disbursement', async () => {
            signerInitialBalance = await hardhat_1.ethers.provider.getBalance(signerAddress);
            signer2InitialBalance = await hardhat_1.ethers.provider.getBalance(signer2Address);
            await (0, setup_1.expect)(teleportrDisburser.disburse(2, [
                [oneETH, signer2Address],
                [oneETH, failingReceiverAddress],
            ], { value: twoETH })).to.not.be.reverted;
        });
        it('should show four total disbursements', async () => {
            await (0, setup_1.expect)(await teleportrDisburser.totalDisbursements()).to.be.equal(ethers_1.BigNumber.from(4));
        });
        it('should leave contract balance with failed disbursement amount', async () => {
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(contractAddress)).to.be.equal(oneETH);
        });
        it('should increase success recipients balance by disbursement amount', async () => {
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(signer2Address)).to.be.equal(signer2InitialBalance.add(oneETH));
        });
        it('should leave failed recipients balance at zero ETH', async () => {
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(failingReceiverAddress)).to.be.equal(zeroETH);
        });
        it('should decrease owners balance by disbursement 2*amount - fees', async () => {
            await (0, setup_1.expect)(await hardhat_1.ethers.provider.getBalance(signerAddress)).to.be.closeTo(signerInitialBalance.sub(twoETH), 10 ** 15);
        });
    });
});
//# sourceMappingURL=TeleportrDisburser.spec.js.map