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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const mkdirp = __importStar(require("mkdirp"));
const ensure = (value, key) => {
    if (typeof value === 'undefined' || value === null || Number.isNaN(value)) {
        throw new Error(`${key} is undefined, null or NaN`);
    }
};
const make_genesis_1 = require("../src/make-genesis");
(async () => {
    const outdir = path.resolve(__dirname, '../dist/dumps');
    const outfile = path.join(outdir, 'state-dump.latest.json');
    mkdirp.sync(outdir);
    const env = process.env;
    const whitelistOwner = env.WHITELIST_OWNER;
    const gasPriceOracleOwner = env.GAS_PRICE_ORACLE_OWNER;
    const gasPriceOracleOverhead = parseInt(env.GAS_PRICE_ORACLE_OVERHEAD || '2750', 10);
    const gasPriceOracleScalar = parseInt(env.GAS_PRICE_ORACLE_SCALAR || '1500000', 10);
    const gasPriceOracleDecimals = parseInt(env.GAS_PRICE_ORACLE_DECIMALS || '6', 10);
    const gasPriceOracleL1BaseFee = parseInt(env.GAS_PRICE_ORACLE_L1_BASE_FEE || '1', 10);
    const gasPriceOracleGasPrice = parseInt(env.GAS_PRICE_ORACLE_GAS_PRICE || '1', 10);
    const l2BlockGasLimit = parseInt(env.L2_BLOCK_GAS_LIMIT, 10);
    const l2ChainId = parseInt(env.L2_CHAIN_ID, 10);
    const blockSignerAddress = env.BLOCK_SIGNER_ADDRESS;
    const l1StandardBridgeAddress = env.L1_STANDARD_BRIDGE_ADDRESS;
    const l1FeeWalletAddress = env.L1_FEE_WALLET_ADDRESS;
    const l1CrossDomainMessengerAddress = env.L1_CROSS_DOMAIN_MESSENGER_ADDRESS;
    const berlinBlock = parseInt(env.BERLIN_BLOCK, 10) || 0;
    ensure(whitelistOwner, 'WHITELIST_OWNER');
    ensure(gasPriceOracleOwner, 'GAS_PRICE_ORACLE_OWNER');
    ensure(l2BlockGasLimit, 'L2_BLOCK_GAS_LIMIT');
    ensure(l2ChainId, 'L2_CHAIN_ID');
    ensure(blockSignerAddress, 'BLOCK_SIGNER_ADDRESS');
    ensure(l1StandardBridgeAddress, 'L1_STANDARD_BRIDGE_ADDRESS');
    ensure(l1FeeWalletAddress, 'L1_FEE_WALLET_ADDRESS');
    ensure(l1CrossDomainMessengerAddress, 'L1_CROSS_DOMAIN_MESSENGER_ADDRESS');
    ensure(berlinBlock, 'BERLIN_BLOCK');
    if (env.WHITELIST_OWNER === '0x' + '00'.repeat(20)) {
        console.log('WARNING: whitelist owner is address(0), whitelist will be disabled');
    }
    const genesis = await (0, make_genesis_1.makeL2GenesisFile)({
        whitelistOwner,
        gasPriceOracleOwner,
        gasPriceOracleOverhead,
        gasPriceOracleScalar,
        gasPriceOracleL1BaseFee,
        gasPriceOracleGasPrice,
        gasPriceOracleDecimals,
        l2BlockGasLimit,
        l2ChainId,
        blockSignerAddress,
        l1StandardBridgeAddress,
        l1FeeWalletAddress,
        l1CrossDomainMessengerAddress,
        berlinBlock,
    });
    fs.writeFileSync(outfile, JSON.stringify(genesis, null, 4));
})();
//# sourceMappingURL=take-dump.js.map