"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deploy_utils_1 = require("../src/deploy-utils");
const address_names_1 = require("../src/address-names");
const deployFn = async (hre) => {
    const Lib_AddressManager = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.unmanaged.Lib_AddressManager);
    await (0, deploy_utils_1.deployAndVerifyAndThen)({
        hre,
        name: 'Proxy__OVM_L1CrossDomainMessenger',
        contract: 'Lib_ResolvedDelegateProxy',
        iface: 'L1CrossDomainMessenger',
        args: [Lib_AddressManager.address, 'OVM_L1CrossDomainMessenger'],
    });
};
deployFn.tags = ['Proxy__OVM_L1CrossDomainMessenger'];
exports.default = deployFn;
//# sourceMappingURL=008-Proxy__OVM_L1CrossDomainMessenger.deploy.js.map