"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deploy_utils_1 = require("../src/deploy-utils");
const address_names_1 = require("../src/address-names");
const deployFn = async (hre) => {
    const { deployer } = await hre.getNamedAccounts();
    await (0, deploy_utils_1.deployAndVerifyAndThen)({
        hre,
        name: address_names_1.names.managed.contracts.Proxy__OVM_L1StandardBridge,
        contract: 'L1ChugSplashProxy',
        iface: 'L1StandardBridge',
        args: [deployer],
    });
};
deployFn.tags = ['Proxy__OVM_L1StandardBridge'];
exports.default = deployFn;
//# sourceMappingURL=009-Proxy__OVM_L1StandardBridge.deploy.js.map