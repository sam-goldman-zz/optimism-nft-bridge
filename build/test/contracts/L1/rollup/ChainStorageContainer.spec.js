"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const setup_1 = require("../../../setup");
const helpers_1 = require("../../../helpers");
describe('ChainStorageContainer', () => {
    let sequencer;
    let otherSigner;
    let signer;
    let signerAddress;
    let AddressManager;
    let Factory__ChainStorageContainer;
    before(async () => {
        ;
        [sequencer, otherSigner, signer] = await hardhat_1.ethers.getSigners();
        signerAddress = await otherSigner.getAddress();
        AddressManager = await (0, helpers_1.makeAddressManager)();
        await AddressManager.setAddress('OVM_Sequencer', await sequencer.getAddress());
        Factory__ChainStorageContainer = await hardhat_1.ethers.getContractFactory('ChainStorageContainer');
    });
    let ChainStorageContainer;
    beforeEach(async () => {
        ChainStorageContainer = await Factory__ChainStorageContainer.connect(otherSigner).deploy(AddressManager.address, signerAddress);
        await AddressManager.setAddress('ChainStorageContainer', ChainStorageContainer.address);
        await AddressManager.setAddress(signerAddress, signerAddress);
    });
    describe('push', () => {
        for (const len of [1, 2, 4, 8, 32]) {
            it(`it should be able to add ${len} element(s) to the array`, async () => {
                for (let i = 0; i < len; i++) {
                    await (0, setup_1.expect)(ChainStorageContainer.connect(otherSigner)['push(bytes32)'](helpers_1.NON_NULL_BYTES32)).to.not.be.reverted;
                }
            });
        }
    });
    describe('setGlobalMetadata', () => {
        it('should modify the extra data', async () => {
            const globalMetaData = `0x${'11'.repeat(27)}`;
            await ChainStorageContainer.connect(otherSigner).setGlobalMetadata(globalMetaData);
            (0, setup_1.expect)(await ChainStorageContainer.getGlobalMetadata()).to.equal(globalMetaData);
        });
    });
    describe('deleteElementsAfterInclusive', () => {
        it('should revert when the array is empty', async () => {
            await (0, setup_1.expect)(ChainStorageContainer.connect(otherSigner)['deleteElementsAfterInclusive(uint256)'](0)).to.be.reverted;
        });
        it('should revert when called by non-owner', async () => {
            await (0, setup_1.expect)(ChainStorageContainer.connect(signer)['deleteElementsAfterInclusive(uint256)'](0)).to.be.revertedWith('ChainStorageContainer: Function can only be called by the owner.');
        });
        for (const len of [1, 2, 4, 8, 32]) {
            describe(`when the array has ${len} element(s)`, () => {
                const values = [];
                beforeEach(async () => {
                    for (let i = 0; i < len; i++) {
                        const value = helpers_1.NON_NULL_BYTES32;
                        values.push(value);
                        await ChainStorageContainer.connect(otherSigner)['push(bytes32)'](value);
                    }
                });
                for (let i = len - 1; i > 0; i -= Math.max(1, len / 4)) {
                    it(`should be able to delete everything after and including the ${i}th/st/rd/whatever element`, async () => {
                        await (0, setup_1.expect)(ChainStorageContainer.connect(otherSigner)['deleteElementsAfterInclusive(uint256)'](i)).to.not.be.reverted;
                        (0, setup_1.expect)(await ChainStorageContainer.length()).to.equal(i);
                        await (0, setup_1.expect)(ChainStorageContainer.get(i)).to.be.reverted;
                    });
                }
            });
        }
    });
});
//# sourceMappingURL=ChainStorageContainer.spec.js.map