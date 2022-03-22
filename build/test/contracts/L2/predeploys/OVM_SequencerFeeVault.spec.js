"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = __importDefault(require("hardhat"));
const smock_1 = require("@defi-wonderland/smock");
const setup_1 = require("../../../setup");
const src_1 = require("../../../../src");
describe('OVM_SequencerFeeVault', () => {
    let signer1;
    before(async () => {
        ;
        [signer1] = await hardhat_1.default.ethers.getSigners();
    });
    let Fake__L2StandardBridge;
    before(async () => {
        Fake__L2StandardBridge = await smock_1.smock.fake('L2StandardBridge', {
            address: src_1.predeploys.L2StandardBridge,
        });
    });
    let OVM_SequencerFeeVault;
    beforeEach(async () => {
        const factory = await hardhat_1.default.ethers.getContractFactory('OVM_SequencerFeeVault');
        OVM_SequencerFeeVault = await factory.deploy(await signer1.getAddress());
    });
    describe('withdraw', async () => {
        it('should fail if the contract does not have more than the minimum balance', async () => {
            await (0, setup_1.expect)(OVM_SequencerFeeVault.withdraw()).to.be.reverted;
        });
        it('should succeed when the contract has exactly sufficient balance', async () => {
            const amount = await OVM_SequencerFeeVault.MIN_WITHDRAWAL_AMOUNT();
            await signer1.sendTransaction({
                to: OVM_SequencerFeeVault.address,
                value: amount,
            });
            await (0, setup_1.expect)(OVM_SequencerFeeVault.withdraw()).to.not.be.reverted;
            (0, setup_1.expect)(Fake__L2StandardBridge.withdrawTo.getCall(0).args[0]).to.deep.equal(src_1.predeploys.OVM_ETH);
            (0, setup_1.expect)(Fake__L2StandardBridge.withdrawTo.getCall(0).args[1]).to.deep.equal(await signer1.getAddress());
            (0, setup_1.expect)(Fake__L2StandardBridge.withdrawTo.getCall(0).args[2]).to.deep.equal(amount);
            (0, setup_1.expect)(Fake__L2StandardBridge.withdrawTo.getCall(0).args[3]).to.deep.equal(0);
            (0, setup_1.expect)(Fake__L2StandardBridge.withdrawTo.getCall(0).args[4]).to.deep.equal('0x');
        });
        it('should succeed when the contract has more than sufficient balance', async () => {
            let amount = await OVM_SequencerFeeVault.MIN_WITHDRAWAL_AMOUNT();
            amount = amount.mul(2);
            await signer1.sendTransaction({
                to: OVM_SequencerFeeVault.address,
                value: amount,
            });
            await (0, setup_1.expect)(OVM_SequencerFeeVault.withdraw()).to.not.be.reverted;
            (0, setup_1.expect)(Fake__L2StandardBridge.withdrawTo.getCall(1).args[0]).to.deep.equal(src_1.predeploys.OVM_ETH);
            (0, setup_1.expect)(Fake__L2StandardBridge.withdrawTo.getCall(1).args[1]).to.deep.equal(await signer1.getAddress());
            (0, setup_1.expect)(Fake__L2StandardBridge.withdrawTo.getCall(1).args[2]).to.deep.equal(amount);
            (0, setup_1.expect)(Fake__L2StandardBridge.withdrawTo.getCall(1).args[3]).to.deep.equal(0);
            (0, setup_1.expect)(Fake__L2StandardBridge.withdrawTo.getCall(1).args[4]).to.deep.equal('0x');
        });
        it('should have an owner in storage slot 0x00...00', async () => {
            const factory = await hardhat_1.default.ethers.getContractFactory('OVM_SequencerFeeVault');
            OVM_SequencerFeeVault = await factory.deploy(`0x${'11'.repeat(20)}`);
            (0, setup_1.expect)(await hardhat_1.default.ethers.provider.getStorageAt(OVM_SequencerFeeVault.address, hardhat_1.default.ethers.constants.HashZero)).to.equal(`0x000000000000000000000000${'11'.repeat(20)}`);
        });
    });
});
//# sourceMappingURL=OVM_SequencerFeeVault.spec.js.map