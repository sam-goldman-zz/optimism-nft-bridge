"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_utils_1 = require("@eth-optimism/core-utils");
const deploy_utils_1 = require("../src/deploy-utils");
const address_names_1 = require("../src/address-names");
const deployFn = async (hre) => {
    const Lib_AddressManager = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.unmanaged.Lib_AddressManager);
    await (0, deploy_utils_1.deployAndVerifyAndThen)({
        hre,
        name: address_names_1.names.managed.contracts.OVM_L1CrossDomainMessenger,
        contract: 'L1CrossDomainMessenger',
        args: [],
        postDeployAction: async (contract) => {
            console.log(`Initializing L1CrossDomainMessenger (implementation)...`);
            await contract.initialize(Lib_AddressManager.address);
            console.log(`Checking that contract was correctly initialized...`);
            await (0, core_utils_1.awaitCondition)(async () => {
                return (0, core_utils_1.hexStringEquals)(await contract.libAddressManager(), Lib_AddressManager.address);
            }, 5000, 100);
            console.log(`Transferring ownership of L1CrossDomainMessenger (implementation)...`);
            const owner = hre.deployConfig.ovmAddressManagerOwner;
            await contract.transferOwnership(owner);
            console.log(`Checking that contract owner was correctly set...`);
            await (0, core_utils_1.awaitCondition)(async () => {
                return (0, core_utils_1.hexStringEquals)(await contract.owner(), owner);
            }, 5000, 100);
        },
    });
};
deployFn.tags = ['L1CrossDomainMessenger', 'upgrade'];
exports.default = deployFn;
//# sourceMappingURL=007-OVM_L1CrossDomainMessenger.deploy.js.map