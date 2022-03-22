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
const core_utils_1 = require("@eth-optimism/core-utils");
const contract_defs_1 = require("../src/contract-defs");
const address_names_1 = require("../src/address-names");
const validation_utils_1 = require("../src/validation-utils");
(0, config_1.task)('validate:address-dictator')
    .addParam('dictator', 'Address of the AddressDictator to validate.', undefined, types.string)
    .addParam('manager', 'Address of the Address Manager contract which would be updated by the Dictator.', undefined, types.string)
    .addParam('multisig', 'Address of the multisig contract which should be the final owner', undefined, types.string)
    .addOptionalParam('contractsRpcUrl', 'RPC Endpoint to query for data', process.env.CONTRACTS_RPC_URL, types.string)
    .setAction(async (args) => {
    if (!args.contractsRpcUrl) {
        throw new Error(validation_utils_1.color.red('RPC URL must be set in your env, or passed as an argument.'));
    }
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(args.contractsRpcUrl);
    const network = await provider.getNetwork();
    console.log();
    (0, validation_utils_1.printSectionHead)("First make sure you're on the right chain:");
    console.log(`Reading from the ${validation_utils_1.color.red(network.name)} network (Chain ID: ${validation_utils_1.color.red('' + network.chainId)})`);
    await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
    const dictatorArtifact = (0, contract_defs_1.getContractDefinition)('AddressDictator');
    const dictatorCode = await provider.getCode(args.dictator);
    (0, validation_utils_1.printSectionHead)(`
Validate the Address Dictator deployment at\n${(0, validation_utils_1.getEtherscanUrl)(network, args.dictator)}`);
    (0, validation_utils_1.printComparison)('Comparing deployed AddressDictator bytecode against local build artifacts', 'Deployed AddressDictator code', { name: 'Compiled bytecode', value: dictatorArtifact.deployedBytecode }, { name: 'Deployed bytecode', value: dictatorCode });
    const dictatorContract = (0, contract_defs_1.getContractFactory)('AddressDictator')
        .attach(args.dictator)
        .connect(provider);
    const finalOwner = await dictatorContract.finalOwner();
    (0, validation_utils_1.printComparison)('Comparing the finalOwner address in the AddressDictator to the multisig address', 'finalOwner', { name: 'multisig address', value: args.multisig }, { name: 'finalOwner      ', value: finalOwner });
    const deployedManager = await dictatorContract.manager();
    (0, validation_utils_1.printComparison)('Validating the AddressManager address in the AddressDictator', 'addressManager', { name: 'manager        ', value: args.manager }, { name: 'Address Manager', value: deployedManager });
    await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
    const namedAddresses = await dictatorContract.getNamedAddresses();
    const managerContract = (0, contract_defs_1.getContractFactory)('Lib_AddressManager')
        .attach(args.manager)
        .connect(provider);
    for (const pair of namedAddresses) {
        if (pair.name === 'L2CrossDomainMessenger') {
            console.log('L2CrossDomainMessenger is set to:', pair.addr);
            await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
            continue;
        }
        const currentAddress = await managerContract.getAddress(pair.name);
        const artifact = (0, validation_utils_1.getArtifactFromManagedName)(pair.name);
        const addressChanged = !(0, core_utils_1.hexStringEquals)(currentAddress, pair.addr);
        if (addressChanged) {
            (0, validation_utils_1.printSectionHead)(`Validate the ${pair.name} deployment.
Current address: ${(0, validation_utils_1.getEtherscanUrl)(network, currentAddress)}
Upgraded address ${(0, validation_utils_1.getEtherscanUrl)(network, pair.addr)}`);
            const code = await provider.getCode(pair.addr);
            (0, validation_utils_1.printComparison)(`Verifying ${pair.name} source code against local deployment artifacts`, `Deployed ${pair.name} code`, {
                name: 'artifact.deployedBytecode',
                value: artifact.deployedBytecode,
            }, { name: 'Deployed bytecode        ', value: code });
            if (Object.keys(artifact)) {
                if (artifact.abi.some((el) => el.name === 'libAddressManager')) {
                    const libAddressManager = await (0, contract_defs_1.getContractFactory)('Lib_AddressResolver')
                        .attach(pair.addr)
                        .connect(provider)
                        .libAddressManager();
                    (0, validation_utils_1.printComparison)(`Verifying ${pair.name} has the correct AddressManager address`, `The AddressManager address in ${pair.name}`, { name: 'Deployed value', value: libAddressManager }, { name: 'Expected value', value: deployedManager });
                    await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
                }
            }
        }
        await validateDeployedConfig(provider, network, args.manager, pair);
    }
    console.log(validation_utils_1.color.green('\nAddressManager Validation complete!'));
});
const validateDeployedConfig = async (provider, network, manager, pair) => {
    (0, validation_utils_1.printSectionHead)(`
Ensure that the ${pair.name} at\n${(0, validation_utils_1.getEtherscanUrl)(network, pair.addr)} is configured correctly`);
    if (pair.name === address_names_1.names.managed.contracts.StateCommitmentChain) {
        const scc = (0, contract_defs_1.getContractFactory)(pair.name)
            .attach(pair.addr)
            .connect(provider);
        const fraudProofWindow = await scc.FRAUD_PROOF_WINDOW();
        (0, validation_utils_1.printComparison)('Checking the fraudProofWindow of the StateCommitmentChain', 'StateCommitmentChain.fraudProofWindow', {
            name: 'Configured fraudProofWindow',
            value: ethers_1.ethers.BigNumber.from(604800).toHexString(),
        }, {
            name: 'Deployed fraudProofWindow  ',
            value: ethers_1.ethers.BigNumber.from(fraudProofWindow).toHexString(),
        });
        await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
        const sequencerPublishWindow = await scc.SEQUENCER_PUBLISH_WINDOW();
        (0, validation_utils_1.printComparison)('Checking the sequencerPublishWindow of the StateCommitmentChain', 'StateCommitmentChain.sequencerPublishWindow', {
            name: 'Configured sequencerPublishWindow  ',
            value: ethers_1.ethers.BigNumber.from(12592000).toHexString(),
        }, {
            name: 'Deployed sequencerPublishWindow',
            value: ethers_1.ethers.BigNumber.from(sequencerPublishWindow).toHexString(),
        });
        await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
    }
    else if (pair.name === address_names_1.names.managed.contracts.CanonicalTransactionChain) {
        const ctc = (0, contract_defs_1.getContractFactory)(pair.name)
            .attach(pair.addr)
            .connect(provider);
        const maxTransactionGasLimit = await ctc.maxTransactionGasLimit();
        (0, validation_utils_1.printComparison)('Checking the maxTransactionGasLimit of the CanonicalTransactionChain', 'CanonicalTransactionChain.maxTransactionGasLimit', {
            name: 'Configured maxTransactionGasLimit',
            value: ethers_1.ethers.BigNumber.from(15000000).toHexString(),
        }, {
            name: 'Deployed maxTransactionGasLimit  ',
            value: ethers_1.ethers.BigNumber.from(maxTransactionGasLimit).toHexString(),
        });
        await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
        const l2GasDiscountDivisor = await ctc.l2GasDiscountDivisor();
        (0, validation_utils_1.printComparison)('Checking the l2GasDiscountDivisor of the CanonicalTransactionChain', 'CanonicalTransactionChain.l2GasDiscountDivisor', {
            name: 'Configured l2GasDiscountDivisor',
            value: ethers_1.ethers.BigNumber.from(32).toHexString(),
        }, {
            name: 'Deployed l2GasDiscountDivisor  ',
            value: ethers_1.ethers.BigNumber.from(l2GasDiscountDivisor).toHexString(),
        });
        await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
        const enqueueGasCost = await ctc.enqueueGasCost();
        (0, validation_utils_1.printComparison)('Checking the enqueueGasCost of the CanonicalTransactionChain', 'CanonicalTransactionChain.enqueueGasCost', {
            name: 'Configured enqueueGasCost',
            value: ethers_1.ethers.BigNumber.from(60000).toHexString(),
        }, {
            name: 'Deployed enqueueGasCost  ',
            value: ethers_1.ethers.BigNumber.from(enqueueGasCost).toHexString(),
        });
        await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
    }
    else if (pair.name === address_names_1.names.managed.contracts.OVM_L1CrossDomainMessenger) {
        const messengerManager = await (0, contract_defs_1.getContractFactory)('L1CrossDomainMessenger')
            .attach(pair.addr)
            .connect(provider)
            .libAddressManager();
        (0, validation_utils_1.printComparison)('Ensure that the L1CrossDomainMessenger (implementation) is initialized with a non-zero Address Manager variable', "L1CrossDomainMessenger's Lib_AddressManager", {
            name: 'Configured Lib_AddressManager',
            value: messengerManager,
        }, {
            name: 'Deployed Lib_AddressManager  ',
            value: manager,
        });
    }
    else {
        console.log(validation_utils_1.color.green(`${pair.name} has no config to check`));
        await (0, validation_utils_1.getInput)(validation_utils_1.color.yellow('OK? Hit enter to continue.'));
    }
};
//# sourceMappingURL=validate-address-dictator.js.map