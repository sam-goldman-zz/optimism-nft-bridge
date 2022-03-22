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
const DEFAULT_L1_BLOCK_TIME_SECONDS = 15;
const DEFAULT_CTC_MAX_TRANSACTION_GAS_LIMIT = 11000000;
const DEFAULT_CTC_L2_GAS_DISCOUNT_DIVISOR = 32;
const DEFAULT_CTC_ENQUEUE_GAS_COST = 60000;
const DEFAULT_SCC_FRAUD_PROOF_WINDOW = 60 * 60 * 24 * 7;
const DEFAULT_SCC_SEQUENCER_PUBLISH_WINDOW = 60 * 30;
const DEFAULT_DEPLOY_CONFIRMATIONS = 12;
(0, config_1.task)('deploy')
    .addOptionalParam('l1BlockTimeSeconds', 'Number of seconds on average between every L1 block.', DEFAULT_L1_BLOCK_TIME_SECONDS, types.int)
    .addOptionalParam('ctcMaxTransactionGasLimit', 'Max gas limit for L1 queue transactions.', DEFAULT_CTC_MAX_TRANSACTION_GAS_LIMIT, types.int)
    .addOptionalParam('ctcL2GasDiscountDivisor', 'Max gas limit for L1 queue transactions.', DEFAULT_CTC_L2_GAS_DISCOUNT_DIVISOR, types.int)
    .addOptionalParam('ctcEnqueueGasCost', 'Max gas limit for L1 queue transactions.', DEFAULT_CTC_ENQUEUE_GAS_COST, types.int)
    .addOptionalParam('sccFraudProofWindow', 'Number of seconds until a transaction is considered finalized.', DEFAULT_SCC_FRAUD_PROOF_WINDOW, types.int)
    .addOptionalParam('sccSequencerPublishWindow', 'Number of seconds that the sequencer is exclusively allowed to post state roots.', DEFAULT_SCC_SEQUENCER_PUBLISH_WINDOW, types.int)
    .addOptionalParam('ovmSequencerAddress', 'Address of the sequencer. Must be provided or this deployment will fail.', undefined, types.string)
    .addOptionalParam('ovmProposerAddress', 'Address of the account that will propose state roots. Must be provided or this deployment will fail.', undefined, types.string)
    .addOptionalParam('ovmAddressManagerOwner', 'Address that will own the Lib_AddressManager. Must be provided or this deployment will fail.', undefined, types.string)
    .addOptionalParam('numDeployConfirmations', 'Number of confirmations to wait for each transaction in the deployment. More is safer.', DEFAULT_DEPLOY_CONFIRMATIONS, types.int)
    .addOptionalParam('forked', 'Enable this when using a forked network (use "true")', undefined, types.string)
    .setAction(async (args, hre, runSuper) => {
    const validateAddressArg = (argName) => {
        if (args[argName] === undefined) {
            throw new Error(`argument for ${argName} is required but was not provided`);
        }
        if (!ethers_1.ethers.utils.isAddress(args[argName])) {
            throw new Error(`argument for ${argName} is not a valid address: ${args[argName]}`);
        }
    };
    validateAddressArg('ovmSequencerAddress');
    validateAddressArg('ovmProposerAddress');
    validateAddressArg('ovmAddressManagerOwner');
    hre.deployConfig = args;
    return runSuper(args);
});
//# sourceMappingURL=deploy.js.map