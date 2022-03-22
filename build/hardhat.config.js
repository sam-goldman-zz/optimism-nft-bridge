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
require("solidity-coverage");
const dotenv = __importStar(require("dotenv"));
const constants_1 = require("./test/helpers/constants");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("@typechain/hardhat");
require("./tasks");
require("hardhat-gas-reporter");
require("@primitivefi/hardhat-dodoc");
require("hardhat-output-validator");
dotenv.config();
const enableGasReport = !!process.env.ENABLE_GAS_REPORT;
const privateKey = process.env.PRIVATE_KEY || '0x' + '11'.repeat(32);
const config = {
    networks: {
        hardhat: {
            accounts: constants_1.DEFAULT_ACCOUNTS_HARDHAT,
            blockGasLimit: constants_1.RUN_OVM_TEST_GAS * 2,
            live: false,
            saveDeployments: false,
            tags: ['local'],
        },
        optimism: {
            url: 'http://127.0.0.1:8545',
            saveDeployments: false,
        },
        'optimism-kovan': {
            chainId: 69,
            url: 'https://kovan.optimism.io',
            accounts: [privateKey],
        },
        'optimism-mainnet': {
            chainId: 10,
            url: 'https://mainnet.optimism.io',
            accounts: [privateKey],
        },
        'mainnet-trial': {
            chainId: 42069,
            url: 'http://127.0.0.1:8545',
            accounts: [privateKey],
        },
    },
    solidity: {
        compilers: [
            {
                version: '0.8.9',
                settings: {
                    optimizer: { enabled: true, runs: 10000 },
                },
            },
            {
                version: '0.5.17',
                settings: {
                    optimizer: { enabled: true, runs: 10000 },
                },
            },
        ],
        settings: {
            metadata: {
                bytecodeHash: 'none',
            },
            outputSelection: {
                '*': {
                    '*': ['metadata', 'storageLayout'],
                },
            },
        },
    },
    typechain: {
        outDir: 'dist/types',
        target: 'ethers-v5',
    },
    paths: {
        deploy: './deploy',
        deployments: './deployments',
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    gasReporter: {
        enabled: enableGasReport,
        currency: 'USD',
        gasPrice: 100,
        outputFile: process.env.CI ? 'gas-report.txt' : undefined,
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    dodoc: {
        runOnCompile: true,
        exclude: [
            'Helper_GasMeasurer',
            'Helper_SimpleProxy',
            'TestERC20',
            'TestLib_CrossDomainUtils',
            'TestLib_OVMCodec',
            'TestLib_RLPReader',
            'TestLib_RLPWriter',
            'TestLib_AddressAliasHelper',
            'TestLib_MerkleTrie',
            'TestLib_SecureMerkleTrie',
            'TestLib_Buffer',
            'TestLib_Bytes32Utils',
            'TestLib_BytesUtils',
            'TestLib_MerkleTree',
        ],
    },
    outputValidator: {
        runOnCompile: true,
        errorMode: false,
        checks: {
            events: false,
            variables: false,
        },
        exclude: ['contracts/test-helpers', 'contracts/test-libraries'],
    },
};
if (process.env.CONTRACTS_TARGET_NETWORK &&
    process.env.CONTRACTS_DEPLOYER_KEY &&
    process.env.CONTRACTS_RPC_URL) {
    config.networks[process.env.CONTRACTS_TARGET_NETWORK] = {
        accounts: [process.env.CONTRACTS_DEPLOYER_KEY],
        url: process.env.CONTRACTS_RPC_URL,
        live: true,
        saveDeployments: true,
        tags: [process.env.CONTRACTS_TARGET_NETWORK],
    };
}
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map