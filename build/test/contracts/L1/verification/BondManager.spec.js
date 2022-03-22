"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const setup_1 = require("../../../setup");
const helpers_1 = require("../../../helpers");
describe('BondManager', () => {
    let sequencer;
    let nonSequencer;
    before(async () => {
        ;
        [sequencer, nonSequencer] = await hardhat_1.ethers.getSigners();
    });
    let AddressManager;
    before(async () => {
        AddressManager = await (0, helpers_1.makeAddressManager)();
    });
    let BondManager;
    before(async () => {
        BondManager = await (await hardhat_1.ethers.getContractFactory('BondManager')).deploy(AddressManager.address);
        AddressManager.setAddress('OVM_Proposer', await sequencer.getAddress());
    });
    describe('isCollateralized', () => {
        it('should return true for OVM_Proposer', async () => {
            (0, setup_1.expect)(await BondManager.isCollateralized(await sequencer.getAddress())).to.equal(true);
        });
        it('should return false for non-sequencer', async () => {
            (0, setup_1.expect)(await BondManager.isCollateralized(await nonSequencer.getAddress())).to.equal(false);
        });
    });
});
//# sourceMappingURL=BondManager.spec.js.map