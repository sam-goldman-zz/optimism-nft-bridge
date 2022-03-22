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
const config_1 = require("hardhat/config");
const types = __importStar(require("hardhat/internal/core/params/argumentTypes"));
const predeploys_1 = require("../src/predeploys");
const contract_defs_1 = require("../src/contract-defs");
(0, config_1.task)('set-l2-gasprice')
    .addOptionalParam('l2GasPrice', 'Gas Price to set on L2', undefined, types.int)
    .addOptionalParam('transactionGasPrice', 'tx.gasPrice', undefined, types.int)
    .addOptionalParam('overhead', 'amortized additional gas used by each batch that users must pay for', undefined, types.int)
    .addOptionalParam('scalar', 'amount to scale up the gas to charge', undefined, types.int)
    .addOptionalParam('contractsRpcUrl', 'Sequencer HTTP Endpoint', process.env.CONTRACTS_RPC_URL, types.string)
    .addOptionalParam('contractsDeployerKey', 'Private Key', process.env.CONTRACTS_DEPLOYER_KEY, types.string)
    .setAction(async (args) => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(args.contractsRpcUrl);
    const signer = new ethers_1.ethers.Wallet(args.contractsDeployerKey).connect(provider);
    const GasPriceOracleArtifact = (0, contract_defs_1.getContractDefinition)('OVM_GasPriceOracle');
    const GasPriceOracle = new ethers_1.ethers.Contract(predeploys_1.predeploys.OVM_GasPriceOracle, GasPriceOracleArtifact.abi, signer);
    const addr = await signer.getAddress();
    console.log(`Using signer ${addr}`);
    const owner = await GasPriceOracle.callStatic.owner();
    if (owner !== addr) {
        throw new Error(`Incorrect key. Owner ${owner}, Signer ${addr}`);
    }
    const gasPrice = await GasPriceOracle.callStatic.gasPrice();
    const scalar = await GasPriceOracle.callStatic.scalar();
    const overhead = await GasPriceOracle.callStatic.overhead();
    console.log('Current values:');
    console.log(`Gas Price: ${gasPrice.toString()}`);
    console.log(`Scalar: ${scalar.toString()}`);
    console.log(`Overhead: ${overhead.toString()}`);
    if (args.l2GasPrice !== undefined) {
        console.log(`Setting gas price to ${args.l2GasPrice}`);
        const tx = await GasPriceOracle.connect(signer).setGasPrice(args.l2GasPrice, { gasPrice: args.transactionGasPrice });
        const receipt = await tx.wait();
        console.log(`Success - ${receipt.transactionHash}`);
    }
    if (args.scalar !== undefined) {
        console.log(`Setting scalar to ${args.scalar}`);
        const tx = await GasPriceOracle.connect(signer).setScalar(args.scalar, {
            gasPrice: args.transactionGasPrice,
        });
        const receipt = await tx.wait();
        console.log(`Success - ${receipt.transactionHash}`);
    }
    if (args.overhead !== undefined) {
        console.log(`Setting overhead to ${args.overhead}`);
        const tx = await GasPriceOracle.connect(signer).setOverhead(args.overhead, { gasPrice: args.transactionGasPrice });
        const receipt = await tx.wait();
        console.log(`Success - ${receipt.transactionHash}`);
    }
});
//# sourceMappingURL=l2-gasprice.js.map