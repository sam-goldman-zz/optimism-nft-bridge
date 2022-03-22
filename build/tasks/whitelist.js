'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ethers_1 = require("ethers");
const config_1 = require("hardhat/config");
const types = __importStar(require("hardhat/internal/core/params/argumentTypes"));
const hardware_wallets_1 = require("@ethersproject/hardware-wallets");
const contract_defs_1 = require("../src/contract-defs");
const predeploys_1 = require("../src/predeploys");
(0, config_1.task)('whitelist')
    .addOptionalParam('address', 'Address to whitelist', undefined, types.string)
    .addOptionalParam('addressFile', 'File containing addresses to whitelist separated by a newline', undefined, types.string)
    .addOptionalParam('whitelistMode', '"enable" if you want to add the address(es) from the whitelist, "disable" if you want remove the address(es) from the whitelist', 'enable', types.string)
    .addOptionalParam('transactionGasPrice', 'tx.gasPrice', undefined, types.int)
    .addOptionalParam('useLedger', 'use a ledger for signing', false, types.boolean)
    .addOptionalParam('ledgerPath', 'ledger key derivation path', ethers_1.ethers.utils.defaultPath, types.string)
    .addOptionalParam('contractsRpcUrl', 'Sequencer HTTP Endpoint', process.env.CONTRACTS_RPC_URL, types.string)
    .addOptionalParam('contractsDeployerKey', 'Private Key', process.env.CONTRACTS_DEPLOYER_KEY, types.string)
    .addOptionalParam('contractAddress', 'Address of DeployerWhitelist contract', predeploys_1.predeploys.OVM_DeployerWhitelist, types.string)
    .setAction(async (args) => {
    if (args.whitelistMode !== 'enable' && args.whitelistMode !== 'disable') {
        throw new Error(`Whitelist mode must be either "enable" or "disable"`);
    }
    if (args.address === undefined && args.addressPath === undefined) {
        throw new Error(`Must provide either address or address-path`);
    }
    if (args.address !== undefined && args.addressPath !== undefined) {
        throw new Error(`Cannot provide both address and address-path`);
    }
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(args.contractsRpcUrl);
    let signer;
    if (!args.useLedger) {
        if (!args.contractsDeployerKey) {
            throw new Error('Must pass --contracts-deployer-key');
        }
        signer = new ethers_1.ethers.Wallet(args.contractsDeployerKey).connect(provider);
    }
    else {
        signer = new hardware_wallets_1.LedgerSigner(provider, 'default', args.ledgerPath);
    }
    const deployerWhitelist = (0, contract_defs_1.getContractFactory)('OVM_DeployerWhitelist')
        .connect(signer)
        .attach(args.contractAddress);
    const addr = await signer.getAddress();
    console.log(`Using signer: ${addr}`);
    const owner = await deployerWhitelist.owner();
    if (owner === '0x0000000000000000000000000000000000000000') {
        console.log(`Whitelist is disabled. Exiting early.`);
        return;
    }
    else {
        console.log(`OVM_DeployerWhitelist owner: ${owner}`);
    }
    if (addr !== owner) {
        throw new Error(`Incorrect key. Owner ${owner}, Signer ${addr}`);
    }
    const addresses = [];
    if (args.address !== undefined) {
        addresses.push(args.address);
    }
    else {
        const addressFile = fs_1.default.readFileSync(args.addressPath, 'utf8');
        for (const line of addressFile.split('\n')) {
            if (line !== '') {
                addresses.push(line);
            }
        }
    }
    for (const address of addresses) {
        console.log(`Changing whitelist status for address: ${address}`);
        console.log(`New whitelist status: ${args.whitelistMode}`);
        const res = await deployerWhitelist.setWhitelistedDeployer(address, args.whitelistMode === 'enable' ? true : false, { gasPrice: args.transactionGasPrice });
        await res.wait();
    }
});
//# sourceMappingURL=whitelist.js.map