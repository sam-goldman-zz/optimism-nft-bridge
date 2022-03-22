"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const hardware_wallets_1 = require("@ethersproject/hardware-wallets");
const config_1 = require("hardhat/config");
const types = __importStar(require("hardhat/internal/core/params/argumentTypes"));
const predeploys_1 = require("../src/predeploys");
const contract_defs_1 = require("../src/contract-defs");
(0, config_1.task)('set-owner')
    .addParam('owner', 'the new oracle address', 0, types.string)
    .addOptionalParam('transactionGasPrice', 'tx.gasPrice', undefined, types.int)
    .addOptionalParam('useLedger', 'use a ledger for signing', false, types.boolean)
    .addOptionalParam('ledgerPath', 'ledger key derivation path', ethers_1.ethers.utils.defaultPath, types.string)
    .addOptionalParam('contractsRpcUrl', 'Sequencer HTTP Endpoint', process.env.CONTRACTS_RPC_URL, types.string)
    .addOptionalParam('contractsDeployerKey', 'Private Key', process.env.CONTRACTS_DEPLOYER_KEY, types.string)
    .addOptionalParam('contractAddress', 'Address of Ownable contract', predeploys_1.predeploys.OVM_GasPriceOracle, types.string)
    .setAction(async (args) => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(args.contractsRpcUrl);
    let signer;
    if (!args.useLedger) {
        signer = new ethers_1.ethers.Wallet(args.contractsDeployerKey).connect(provider);
    }
    else {
        signer = new hardware_wallets_1.LedgerSigner(provider, 'default', args.ledgerPath);
    }
    const Ownable = (0, contract_defs_1.getContractFactory)('Ownable')
        .attach(args.contractAddress)
        .connect(provider);
    const addr = await signer.getAddress();
    console.log(`Using signer ${addr}`);
    const owner = await Ownable.callStatic.owner();
    if (owner !== addr) {
        throw new Error(`Incorrect key. Owner ${owner}, Signer ${addr}`);
    }
    console.log(`Owner is currently ${owner.toString()}`);
    console.log(`Setting owner to ${args.owner}`);
    const tx = await Ownable.connect(signer).transferOwnership(args.owner, {
        gasPrice: args.transactionGasPrice,
    });
    const receipt = await tx.wait();
    console.log(`Success - ${receipt.transactionHash}`);
});
//# sourceMappingURL=set-owner.js.map