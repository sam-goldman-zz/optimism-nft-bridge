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
const hardware_wallets_1 = require("@ethersproject/hardware-wallets");
const contract_defs_1 = require("../src/contract-defs");
const predeploys_1 = require("../src/predeploys");
(0, config_1.task)('withdraw-fees')
    .addOptionalParam('dryRun', 'simulate withdrawing fees', false, types.boolean)
    .addOptionalParam('useLedger', 'use a ledger for signing', false, types.boolean)
    .addOptionalParam('ledgerPath', 'ledger key derivation path', ethers_1.ethers.utils.defaultPath, types.string)
    .addOptionalParam('contractsRpcUrl', 'Sequencer HTTP Endpoint', process.env.CONTRACTS_RPC_URL, types.string)
    .addOptionalParam('privateKey', 'Private Key', process.env.CONTRACTS_DEPLOYER_KEY, types.string)
    .setAction(async (args) => {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(args.contractsRpcUrl);
    let signer;
    if (!args.useLedger) {
        if (!args.contractsDeployerKey) {
            throw new Error('Must pass --contracts-deployer-key');
        }
        signer = new ethers_1.ethers.Wallet(args.contractsDeployerKey).connect(provider);
    }
    else {
        signer = new hardware_wallets_1.LedgerSigner(provider, 'default', args.ledgerPath);
    }
    if (args.dryRun) {
        console.log('Performing dry run of fee withdrawal...');
    }
    const l2FeeVault = (0, contract_defs_1.getContractFactory)('OVM_SequencerFeeVault')
        .connect(signer)
        .attach(predeploys_1.predeploys.OVM_SequencerFeeVault);
    const signerAddress = await signer.getAddress();
    const signerBalance = await provider.getBalance(signerAddress);
    const signerBalanceInETH = ethers_1.ethers.utils.formatEther(signerBalance);
    console.log(`Using L2 signer ${signerAddress} with a balance of ${signerBalanceInETH} ETH`);
    const l1FeeWallet = await l2FeeVault.l1FeeWallet();
    const amount = await provider.getBalance(l2FeeVault.address);
    const amountInETH = ethers_1.ethers.utils.formatEther(amount);
    console.log(`${args.dryRun ? '[DRY RUN] ' : ''}Withdrawing ${amountInETH} ETH to the L1 address: ${l1FeeWallet}`);
    if (args.dryRun) {
        await l2FeeVault.estimateGas.withdraw();
        return;
    }
    else {
        const withdrawTx = await l2FeeVault.withdraw();
        console.log(`Withdrawal complete: https://optimistic.etherscan.io/tx/${withdrawTx.hash}`);
        console.log(`Complete withdrawal in 1 week here: https://optimistic.etherscan.io/address/${predeploys_1.predeploys.OVM_SequencerFeeVault}#withdrawaltxs`);
    }
});
//# sourceMappingURL=withdraw-fees.js.map