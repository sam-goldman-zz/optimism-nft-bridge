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
const core_utils_1 = require("@eth-optimism/core-utils");
const address_names_1 = require("../src/address-names");
const deploy_utils_1 = require("../src/deploy-utils");
(0, config_1.task)('fetch-batches')
    .addOptionalParam('contractsRpcUrl', 'Ethereum HTTP Endpoint', process.env.CONTRACTS_RPC_URL || 'http://127.0.0.1:8545', types.string)
    .addOptionalParam('start', 'Start block height', 0, types.int)
    .addOptionalParam('end', 'End block height', undefined, types.int)
    .setAction(async (args, hre) => {
    const provider = new ethers_1.ethers.providers.StaticJsonRpcProvider(args.contractsRpcUrl);
    let CanonicalTransactionChain = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.managed.contracts.CanonicalTransactionChain);
    CanonicalTransactionChain = CanonicalTransactionChain.connect(provider);
    const start = args.start;
    let end = args.end;
    if (!end) {
        end = await provider.getBlockNumber();
    }
    const batches = [];
    for (let i = start; i <= end; i += 2001) {
        const tip = Math.min(i + 2000, end);
        console.error(`Querying events ${i}-${tip}`);
        const events = await CanonicalTransactionChain.queryFilter(CanonicalTransactionChain.filters.SequencerBatchAppended(), i, tip);
        for (const event of events) {
            const tx = await provider.getTransaction(event.transactionHash);
            const batch = core_utils_1.SequencerBatch.fromHex(tx.data);
            batches.push(batch.toJSON());
        }
    }
    console.log(JSON.stringify(batches, null, 2));
});
//# sourceMappingURL=fetch-batches.js.map