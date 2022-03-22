"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_utils_1 = require("@eth-optimism/core-utils");
const deploy_utils_1 = require("../src/deploy-utils");
const deployFn = async (hre) => {
    const { deployer } = await hre.getNamedAccounts();
    const Lib_AddressManager = await (0, deploy_utils_1.getContractFromArtifact)(hre, 'Lib_AddressManager', {
        signerOrProvider: deployer,
    });
    const owner = hre.deployConfig.ovmAddressManagerOwner;
    const remoteOwner = await Lib_AddressManager.owner();
    if ((0, core_utils_1.hexStringEquals)(owner, remoteOwner)) {
        console.log(`✓ Not changing owner of Lib_AddressManager because it's already correctly set`);
        return;
    }
    console.log(`Transferring ownership of Lib_AddressManager to ${owner}...`);
    await Lib_AddressManager.transferOwnership(owner);
    console.log(`Confirming transfer was successful...`);
    await (0, core_utils_1.awaitCondition)(async () => {
        return (0, core_utils_1.hexStringEquals)(await Lib_AddressManager.owner(), owner);
    }, 5000, 100);
    console.log(`✓ Set owner of Lib_AddressManager to: ${owner}`);
};
deployFn.tags = ['upgrade', 'finalize'];
exports.default = deployFn;
//# sourceMappingURL=015-finalize.js.map