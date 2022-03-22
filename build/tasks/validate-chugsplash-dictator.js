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
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const config_1 = require("hardhat/config");
const types = __importStar(require("hardhat/internal/core/params/argumentTypes"));
const contract_defs_1 = require("../src/contract-defs");
const validation_utils_1 = require("../src/validation-utils");
(0, config_1.task)('validate:chugsplash-dictator')
    .addParam('dictator', 'Address of the ChugSplashDictator to validate.', undefined, types.string)
    .addParam('proxy', 'Address of the L1ChugSplashProxy to validate.', undefined, types.string)
    .addParam('multisig', 'Address of the multisig contract which should be the final owner', undefined, types.string)
    .addOptionalParam('contractsRpcUrl', 'RPC Endpoint to query for data', process.env.CONTRACTS_RPC_URL, types.string)
    .setAction(async (args) => {
    if (!args.contractsRpcUrl) {
        throw new Error(validation_utils_1.color.red('RPC URL must be set in your env, or passed as an argument.'));
    }
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(args.contractsRpcUrl);
    const network = await provider.getNetwork();
    console.log();
    console.log(validation_utils_1.color.cyan("First make sure you're on the right chain:"));
    console.log(`Reading from the ${validation_utils_1.color.red(network.name)} network (Chain ID: ${validation_utils_1.color.red('' + network.chainId)})`);
    await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
    console.log();
    const dictatorArtifact = (0, contract_defs_1.getContractDefinition)('ChugSplashDictator');
    const dictatorCode = await provider.getCode(args.dictator);
    (0, validation_utils_1.printSectionHead)(`Validate the Chugsplash Dictator deployment at\n${(0, validation_utils_1.getEtherscanUrl)(network, args.dictator)}`);
    (0, validation_utils_1.printComparison)('Compare the deployed ChugSplashDictator bytecode against local build artifacts', 'Deployed ChugSplashDictator code', { name: 'Compiled bytecode', value: dictatorArtifact.deployedBytecode }, { name: 'Deployed bytecode', value: dictatorCode });
    await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
    console.log();
    console.log(validation_utils_1.color.cyan("The next 4 checks will validate the ChugSplashDictator's config"));
    const dictatorContract = (0, contract_defs_1.getContractFactory)('ChugSplashDictator')
        .attach(args.dictator)
        .connect(provider);
    const finalOwner = await dictatorContract.finalOwner();
    (0, validation_utils_1.printComparison)('Compare the finalOwner address in the ChugSplashDictator to the multisig address', 'finalOwner', { name: 'multisig address', value: args.multisig }, { name: 'finalOwner      ', value: finalOwner });
    await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
    console.log();
    const dictatorMessengerSlotKey = await dictatorContract.messengerSlotKey();
    const dictatorMessengerSlotVal = await dictatorContract.messengerSlotVal();
    const proxyMessengerSlotVal = await provider.getStorageAt(args.proxy, dictatorMessengerSlotKey);
    (0, validation_utils_1.printComparison)('Compare the Messenger slot key/value to be set, with the current values in the proxy', `Storage slot key ${dictatorMessengerSlotKey}`, {
        name: `Value in the proxy at slot key\n${dictatorMessengerSlotKey}`,
        value: proxyMessengerSlotVal,
    }, {
        name: `Dictator will setStorage at slot key\n${dictatorMessengerSlotKey}`,
        value: dictatorMessengerSlotVal,
    });
    await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
    console.log();
    const dictatorBridgeSlotKey = await dictatorContract.bridgeSlotKey();
    const dictatorBridgeSlotVal = await dictatorContract.bridgeSlotVal();
    const proxyBridgeSlotVal = await provider.getStorageAt(args.proxy, dictatorBridgeSlotKey);
    (0, validation_utils_1.printComparison)('Compare the Bridge slot key/value to be set, with the current values in the proxy', `Storage slot key ${dictatorBridgeSlotKey}`, {
        name: `Value currently in the proxy at slot key\n${dictatorBridgeSlotKey}`,
        value: proxyBridgeSlotVal,
    }, {
        name: `Dictator will setStorage in the proxy at slot key\n${dictatorBridgeSlotKey}`,
        value: dictatorBridgeSlotVal,
    });
    await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
    console.log();
    const bridgeArtifact = (0, contract_defs_1.getContractDefinition)('L1StandardBridge');
    const expectedCodeHash = ethers_1.ethers.utils.keccak256(bridgeArtifact.deployedBytecode);
    const actualCodeHash = await dictatorContract.codeHash();
    (0, validation_utils_1.printComparison)("Compare the Dictator's codeHash against hash of the local L1StandardBridge build artifacts", "Dictator's codeHash", {
        name: 'Expected codeHash',
        value: expectedCodeHash,
    }, {
        name: 'Actual codeHash',
        value: actualCodeHash,
    });
    await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
    console.log();
    console.log(validation_utils_1.color.green('Chugsplash Dictator Validation complete!'));
});
//# sourceMappingURL=validate-chugsplash-dictator.js.map