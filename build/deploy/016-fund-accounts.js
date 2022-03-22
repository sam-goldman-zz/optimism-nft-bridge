"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_utils_1 = require("@eth-optimism/core-utils");
const default_config_1 = require("hardhat/internal/core/config/default-config");
const util_1 = require("hardhat/internal/core/providers/util");
const deploy_utils_1 = require("../src/deploy-utils");
const address_names_1 = require("../src/address-names");
const deployFn = async (hre) => {
    if (await (0, deploy_utils_1.isHardhatNode)(hre)) {
        const L1StandardBridge = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.managed.contracts.Proxy__OVM_L1StandardBridge, {
            iface: 'L1StandardBridge',
        });
        const accounts = (0, util_1.normalizeHardhatNetworkAccountsConfig)(default_config_1.defaultHardhatNetworkHdAccountsConfigParams).slice(0, 20);
        await Promise.all(accounts.map(async (account, index) => {
            await (0, core_utils_1.sleep)(200 * index);
            const wallet = new hre.ethers.Wallet(account.privateKey, hre.ethers.provider);
            const balance = await wallet.getBalance();
            const depositAmount = balance.div(2);
            await L1StandardBridge.connect(wallet).depositETH(8000000, '0x', {
                value: depositAmount,
                gasLimit: 2000000,
            });
            console.log(`✓ Funded ${wallet.address} on L2 with ${hre.ethers.utils.formatEther(depositAmount)} ETH`);
        }));
    }
};
deployFn.tags = ['fund-accounts'];
exports.default = deployFn;
//# sourceMappingURL=016-fund-accounts.js.map