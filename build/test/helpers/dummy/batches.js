"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DUMMY_BATCH_PROOFS = exports.DUMMY_BATCH_HEADERS = void 0;
const hardhat_1 = require("hardhat");
const constants_1 = require("../constants");
exports.DUMMY_BATCH_HEADERS = [
    {
        batchIndex: 0,
        batchRoot: hardhat_1.ethers.constants.HashZero,
        batchSize: 0,
        prevTotalElements: 0,
        extraData: hardhat_1.ethers.utils.defaultAbiCoder.encode(['uint256', 'address'], [hardhat_1.ethers.constants.HashZero, constants_1.NON_ZERO_ADDRESS]),
    },
    {
        batchIndex: 1,
        batchRoot: hardhat_1.ethers.constants.HashZero,
        batchSize: 0,
        prevTotalElements: 0,
        extraData: hardhat_1.ethers.utils.defaultAbiCoder.encode(['uint256', 'address'], [hardhat_1.ethers.constants.HashZero, constants_1.NON_ZERO_ADDRESS]),
    },
];
exports.DUMMY_BATCH_PROOFS = [
    {
        index: 0,
        siblings: [hardhat_1.ethers.constants.HashZero],
    },
    {
        index: 1,
        siblings: [hardhat_1.ethers.constants.HashZero],
    },
];
//# sourceMappingURL=batches.js.map