"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deploy_utils_1 = require("../src/deploy-utils");
const address_names_1 = require("../src/address-names");
const deployFn = async (hre) => {
    const Lib_AddressManager = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.unmanaged.Lib_AddressManager);
    await (0, deploy_utils_1.deployAndVerifyAndThen)({
        hre,
        name: address_names_1.names.managed.contracts.ChainStorageContainer_SCC_batches,
        contract: 'ChainStorageContainer',
        args: [Lib_AddressManager.address, 'StateCommitmentChain'],
    });
};
deployFn.tags = ['ChainStorageContainer_scc_batches', 'upgrade'];
exports.default = deployFn;
//# sourceMappingURL=003-OVM_ChainStorageContainer_scc_batches.deploy.js.map