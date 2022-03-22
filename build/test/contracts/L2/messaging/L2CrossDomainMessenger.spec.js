"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = __importStar(require("hardhat"));
const core_utils_1 = require("@eth-optimism/core-utils");
const smock_1 = require("@defi-wonderland/smock");
const setup_1 = require("../../../setup");
const helpers_1 = require("../../../helpers");
const src_1 = require("../../../../src");
describe('L2CrossDomainMessenger', () => {
    let signer;
    before(async () => {
        ;
        [signer] = await hardhat_1.ethers.getSigners();
    });
    let Fake__TargetContract;
    let Fake__L1CrossDomainMessenger;
    let Fake__OVM_L2ToL1MessagePasser;
    before(async () => {
        Fake__TargetContract = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('Helper_SimpleProxy'));
        Fake__L1CrossDomainMessenger = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('L1CrossDomainMessenger'));
        Fake__OVM_L2ToL1MessagePasser = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('OVM_L2ToL1MessagePasser'), { address: src_1.predeploys.OVM_L2ToL1MessagePasser });
    });
    let impersonatedL1CrossDomainMessengerSender;
    before(async () => {
        const impersonatedAddress = (0, core_utils_1.applyL1ToL2Alias)(Fake__L1CrossDomainMessenger.address);
        await hardhat_1.default.network.provider.request({
            method: 'hardhat_impersonateAccount',
            params: [impersonatedAddress],
        });
        await hardhat_1.default.network.provider.request({
            method: 'hardhat_setBalance',
            params: [impersonatedAddress, '0xFFFFFFFFFFFFFFFFF'],
        });
        impersonatedL1CrossDomainMessengerSender = await hardhat_1.ethers.getSigner(impersonatedAddress);
    });
    let Factory__L2CrossDomainMessenger;
    before(async () => {
        Factory__L2CrossDomainMessenger = await hardhat_1.ethers.getContractFactory('L2CrossDomainMessenger');
    });
    let L2CrossDomainMessenger;
    beforeEach(async () => {
        L2CrossDomainMessenger = await Factory__L2CrossDomainMessenger.deploy(Fake__L1CrossDomainMessenger.address);
    });
    describe('xDomainMessageSender', () => {
        let Mock__Factory__L2CrossDomainMessenger;
        let Mock__L2CrossDomainMessenger;
        before(async () => {
            Mock__Factory__L2CrossDomainMessenger = await smock_1.smock.mock('L2CrossDomainMessenger');
            Mock__L2CrossDomainMessenger =
                await Mock__Factory__L2CrossDomainMessenger.deploy(Fake__L1CrossDomainMessenger.address);
        });
        it('should return the xDomainMsgSender address', async () => {
            await Mock__L2CrossDomainMessenger.setVariable('xDomainMsgSender', '0x0000000000000000000000000000000000000000');
            (0, setup_1.expect)(await Mock__L2CrossDomainMessenger.xDomainMessageSender()).to.equal('0x0000000000000000000000000000000000000000');
        });
    });
    describe('sendMessage', () => {
        const target = helpers_1.NON_ZERO_ADDRESS;
        const message = helpers_1.NON_NULL_BYTES32;
        const gasLimit = 100000;
        it('should be able to send a single message', async () => {
            await (0, setup_1.expect)(L2CrossDomainMessenger.sendMessage(target, message, gasLimit)).to.not.be.reverted;
            (0, setup_1.expect)(Fake__OVM_L2ToL1MessagePasser.passMessageToL1.getCall(0).args[0]).to.deep.equal((0, helpers_1.encodeXDomainCalldata)(target, await signer.getAddress(), message, 0));
        });
        it('should be able to send the same message twice', async () => {
            await L2CrossDomainMessenger.sendMessage(target, message, gasLimit);
            await (0, setup_1.expect)(L2CrossDomainMessenger.sendMessage(target, message, gasLimit)).to.not.be.reverted;
        });
    });
    describe('relayMessage', () => {
        let target;
        let message;
        let sender;
        before(async () => {
            target = Fake__TargetContract.address;
            message = Fake__TargetContract.interface.encodeFunctionData('setTarget', [
                helpers_1.NON_ZERO_ADDRESS,
            ]);
            sender = await signer.getAddress();
        });
        it('should revert if the L1 message sender is not the L1CrossDomainMessenger', async () => {
            await (0, setup_1.expect)(L2CrossDomainMessenger.connect(signer).relayMessage(target, sender, message, 0)).to.be.revertedWith('Provided message could not be verified.');
        });
        it('should send a call to the target contract', async () => {
            await L2CrossDomainMessenger.connect(impersonatedL1CrossDomainMessengerSender).relayMessage(target, sender, message, 0);
            (0, setup_1.expect)(Fake__TargetContract.setTarget.getCall(0).args[0]).to.deep.equal(helpers_1.NON_ZERO_ADDRESS);
        });
        it('the xDomainMessageSender is reset to the original value', async () => {
            await (0, setup_1.expect)(L2CrossDomainMessenger.xDomainMessageSender()).to.be.revertedWith('xDomainMessageSender is not set');
            await L2CrossDomainMessenger.connect(impersonatedL1CrossDomainMessengerSender).relayMessage(target, sender, message, 0);
            await (0, setup_1.expect)(L2CrossDomainMessenger.xDomainMessageSender()).to.be.revertedWith('xDomainMessageSender is not set');
        });
        it('should revert if trying to send the same message twice', async () => {
            await L2CrossDomainMessenger.connect(impersonatedL1CrossDomainMessengerSender).relayMessage(target, sender, message, 0);
            await (0, setup_1.expect)(L2CrossDomainMessenger.connect(impersonatedL1CrossDomainMessengerSender).relayMessage(target, sender, message, 0)).to.be.revertedWith('Provided message has already been received.');
        });
        it('should not make a call if the target is the L2 MessagePasser', async () => {
            target = src_1.predeploys.OVM_L2ToL1MessagePasser;
            message = Fake__OVM_L2ToL1MessagePasser.interface.encodeFunctionData('passMessageToL1(bytes)', [helpers_1.NON_NULL_BYTES32]);
            const resProm = L2CrossDomainMessenger.connect(impersonatedL1CrossDomainMessengerSender).relayMessage(target, sender, message, 0);
            await (0, setup_1.expect)(resProm).to.not.be.reverted;
            const logs = (await Fake__OVM_L2ToL1MessagePasser.provider.getTransactionReceipt((await resProm).hash)).logs;
            (0, setup_1.expect)(logs).to.deep.equal([]);
            (0, setup_1.expect)(await L2CrossDomainMessenger.successfulMessages(hardhat_1.ethers.utils.solidityKeccak256(['bytes'], [(0, helpers_1.encodeXDomainCalldata)(target, sender, message, 0)]))).to.be.true;
        });
    });
});
//# sourceMappingURL=L2CrossDomainMessenger.spec.js.map