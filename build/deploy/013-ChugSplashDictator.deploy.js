"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const predeploys_1 = require("../src/predeploys");
const contract_defs_1 = require("../src/contract-defs");
const deploy_utils_1 = require("../src/deploy-utils");
const address_names_1 = require("../src/address-names");
const deployFn = async (hre) => {
    const Proxy__OVM_L1StandardBridge = await (0, deploy_utils_1.getContractFromArtifact)(hre, 'Proxy__OVM_L1StandardBridge');
    const bridgeArtifact = (0, contract_defs_1.getContractDefinition)('L1StandardBridge');
    const bridgeCode = bridgeArtifact.deployedBytecode;
    const Proxy__OVM_L1CrossDomainMessenger = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.managed.contracts.Proxy__OVM_L1CrossDomainMessenger);
    await (0, deploy_utils_1.deployAndVerifyAndThen)({
        hre,
        name: address_names_1.names.unmanaged.ChugSplashDictator,
        args: [
            Proxy__OVM_L1StandardBridge.address,
            hre.deployConfig.ovmAddressManagerOwner,
            ethers_1.ethers.utils.keccak256(bridgeCode),
            ethers_1.ethers.utils.hexZeroPad('0x00', 32),
            ethers_1.ethers.utils.hexZeroPad(Proxy__OVM_L1CrossDomainMessenger.address, 32),
            ethers_1.ethers.utils.hexZeroPad('0x01', 32),
            ethers_1.ethers.utils.hexZeroPad(predeploys_1.predeploys.L2StandardBridge, 32),
        ],
    });
};
deployFn.tags = ['upgrade', 'ChugSplashDictator'];
exports.default = deployFn;
//# sourceMappingURL=013-ChugSplashDictator.deploy.js.map