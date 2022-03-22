"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NON_ZERO_ADDRESS = exports.NON_NULL_BYTES32 = exports.ENQUEUE_GAS_COST = exports.L2_GAS_DISCOUNT_DIVISOR = exports.RUN_OVM_TEST_GAS = exports.DEFAULT_ACCOUNTS_HARDHAT = void 0;
const ethereum_waffle_1 = require("ethereum-waffle");
exports.DEFAULT_ACCOUNTS_HARDHAT = ethereum_waffle_1.defaultAccounts.map((account) => {
    return {
        balance: account.balance,
        privateKey: account.secretKey,
    };
});
exports.RUN_OVM_TEST_GAS = 20000000;
exports.L2_GAS_DISCOUNT_DIVISOR = 32;
exports.ENQUEUE_GAS_COST = 60000;
exports.NON_NULL_BYTES32 = '0x1111111111111111111111111111111111111111111111111111111111111111';
exports.NON_ZERO_ADDRESS = '0x1111111111111111111111111111111111111111';
//# sourceMappingURL=constants.js.map