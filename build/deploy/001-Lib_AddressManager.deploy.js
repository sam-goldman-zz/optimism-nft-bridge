"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_names_1 = require("../src/address-names");
const deployFn = async (hre) => {
    const { deploy } = hre.deployments;
    const { deployer } = await hre.getNamedAccounts();
    await deploy(address_names_1.names.unmanaged.Lib_AddressManager, {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: hre.deployConfig.numDeployConfirmations,
    });
};
deployFn.tags = ['Lib_AddressManager'];
exports.default = deployFn;
//# sourceMappingURL=001-Lib_AddressManager.deploy.js.map