"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const core_utils_1 = require("@eth-optimism/core-utils");
const deploy_utils_1 = require("../src/deploy-utils");
const address_names_1 = require("../src/address-names");
const deployFn = async (hre) => {
    if (hre.deployConfig.forked !== 'true') {
        return;
    }
    console.log(`Running custom setup for forked experimental networks`);
    const { deployer } = await hre.getNamedAccounts();
    console.log(`Funding deployer account...`);
    await (0, deploy_utils_1.fundAccount)(hre, deployer, deploy_utils_1.BIG_BALANCE);
    const Lib_AddressManager = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.unmanaged.Lib_AddressManager);
    console.log(`Setting AddressManager owner to ${deployer}`);
    await (0, deploy_utils_1.sendImpersonatedTx)({
        hre,
        contract: Lib_AddressManager,
        fn: 'transferOwnership',
        from: await Lib_AddressManager.owner(),
        gas: ethers_1.ethers.BigNumber.from(2000000).toHexString(),
        args: [deployer],
    });
    console.log(`Waiting for owner to be correctly set...`);
    await (0, core_utils_1.awaitCondition)(async () => {
        return (await Lib_AddressManager.owner()) === deployer;
    }, 5000, 100);
    const Proxy__OVM_L1StandardBridge = await (0, deploy_utils_1.getContractFromArtifact)(hre, 'Proxy__OVM_L1StandardBridge');
    console.log(`Setting L1StandardBridge owner to ${deployer}`);
    await (0, deploy_utils_1.sendImpersonatedTx)({
        hre,
        contract: Proxy__OVM_L1StandardBridge,
        fn: 'setOwner',
        from: await Proxy__OVM_L1StandardBridge.callStatic.getOwner({
            from: hre.ethers.constants.AddressZero,
        }),
        gas: ethers_1.ethers.BigNumber.from(2000000).toHexString(),
        args: [deployer],
    });
    console.log(`Waiting for owner to be correctly set...`);
    await (0, core_utils_1.awaitCondition)(async () => {
        return ((await Proxy__OVM_L1StandardBridge.callStatic.getOwner({
            from: hre.ethers.constants.AddressZero,
        })) === deployer);
    }, 5000, 100);
};
deployFn.tags = ['hardhat', 'upgrade'];
exports.default = deployFn;
//# sourceMappingURL=000-hardhat-setup.js.map