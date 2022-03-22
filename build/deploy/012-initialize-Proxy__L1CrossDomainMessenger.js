"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_utils_1 = require("@eth-optimism/core-utils");
const deploy_utils_1 = require("../src/deploy-utils");
const address_names_1 = require("../src/address-names");
const deployFn = async (hre) => {
    const { deployer } = await hre.getNamedAccounts();
    const Proxy__OVM_L1CrossDomainMessenger = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.managed.contracts.Proxy__OVM_L1CrossDomainMessenger, {
        iface: 'L1CrossDomainMessenger',
        signerOrProvider: deployer,
    });
    const Lib_AddressManager = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.unmanaged.Lib_AddressManager);
    console.log(`Initializing Proxy__OVM_L1CrossDomainMessenger...`);
    await Proxy__OVM_L1CrossDomainMessenger.initialize(Lib_AddressManager.address);
    console.log(`Checking that contract was correctly initialized...`);
    await (0, core_utils_1.awaitCondition)(async () => {
        return (0, core_utils_1.hexStringEquals)(await Proxy__OVM_L1CrossDomainMessenger.libAddressManager(), Lib_AddressManager.address);
    }, 5000, 100);
    console.log(`Setting Proxy__OVM_L1CrossDomainMessenger owner...`);
    const owner = hre.deployConfig.ovmAddressManagerOwner;
    await Proxy__OVM_L1CrossDomainMessenger.transferOwnership(owner);
    console.log(`Checking that the contract owner was correctly set...`);
    await (0, core_utils_1.awaitCondition)(async () => {
        return (0, core_utils_1.hexStringEquals)(await Proxy__OVM_L1CrossDomainMessenger.owner(), owner);
    }, 5000, 100);
};
deployFn.tags = ['finalize'];
exports.default = deployFn;
//# sourceMappingURL=012-initialize-Proxy__L1CrossDomainMessenger.js.map