"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const core_utils_1 = require("@eth-optimism/core-utils");
const setup_1 = require("../../../setup");
describe('AddressAliasHelper', () => {
    let AddressAliasHelper;
    before(async () => {
        AddressAliasHelper = await (await hardhat_1.ethers.getContractFactory('TestLib_AddressAliasHelper')).deploy();
    });
    describe('applyL1ToL2Alias', () => {
        it('should be able to apply the alias to a valid address', async () => {
            (0, setup_1.expect)(await AddressAliasHelper.applyL1ToL2Alias('0x0000000000000000000000000000000000000000')).to.equal((0, core_utils_1.applyL1ToL2Alias)('0x0000000000000000000000000000000000000000'));
        });
        it('should be able to apply the alias even if the operation overflows', async () => {
            (0, setup_1.expect)(await AddressAliasHelper.applyL1ToL2Alias('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')).to.equal((0, core_utils_1.applyL1ToL2Alias)('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'));
        });
    });
    describe('undoL1ToL2Alias', () => {
        it('should be able to undo the alias from a valid address', async () => {
            (0, setup_1.expect)(await AddressAliasHelper.undoL1ToL2Alias('0x1111000000000000000000000000000000001111')).to.equal((0, core_utils_1.undoL1ToL2Alias)('0x1111000000000000000000000000000000001111'));
        });
        it('should be able to undo the alias even if the operation underflows', async () => {
            (0, setup_1.expect)(await AddressAliasHelper.undoL1ToL2Alias('0x1111000000000000000000000000000000001110')).to.equal((0, core_utils_1.undoL1ToL2Alias)('0x1111000000000000000000000000000000001110'));
        });
    });
});
//# sourceMappingURL=AddressAliasHelper.spec.js.map