"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const smock_1 = require("@defi-wonderland/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
const utils_1 = require("ethers/lib/utils");
const helpers_1 = require("../../../helpers");
const MAX_GAS_LIMIT = 8000000;
const appendSequencerBatch = async (CanonicalTransactionChain, batch) => {
    const methodId = (0, utils_1.keccak256)(Buffer.from('appendSequencerBatch()')).slice(2, 10);
    const calldata = (0, core_utils_1.encodeAppendSequencerBatch)(batch);
    return CanonicalTransactionChain.signer.sendTransaction({
        to: CanonicalTransactionChain.address,
        data: '0x' + methodId + calldata,
    });
};
describe('[GAS BENCHMARK] CanonicalTransactionChain [ @skip-on-coverage ]', () => {
    let sequencer;
    before(async () => {
        ;
        [sequencer] = await hardhat_1.ethers.getSigners();
    });
    let AddressManager;
    let Fake__StateCommitmentChain;
    before(async () => {
        AddressManager = await (0, helpers_1.makeAddressManager)();
        await AddressManager.setAddress('OVM_Sequencer', await sequencer.getAddress());
        Fake__StateCommitmentChain = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('StateCommitmentChain'));
        await (0, helpers_1.setProxyTarget)(AddressManager, 'StateCommitmentChain', Fake__StateCommitmentChain);
    });
    let Factory__CanonicalTransactionChain;
    let Factory__ChainStorageContainer;
    before(async () => {
        Factory__CanonicalTransactionChain = await hardhat_1.ethers.getContractFactory('CanonicalTransactionChain');
        Factory__ChainStorageContainer = await hardhat_1.ethers.getContractFactory('ChainStorageContainer');
    });
    let CanonicalTransactionChain;
    beforeEach(async () => {
        CanonicalTransactionChain = await Factory__CanonicalTransactionChain.deploy(AddressManager.address, MAX_GAS_LIMIT, helpers_1.L2_GAS_DISCOUNT_DIVISOR, helpers_1.ENQUEUE_GAS_COST);
        const batches = await Factory__ChainStorageContainer.deploy(AddressManager.address, 'CanonicalTransactionChain');
        await Factory__ChainStorageContainer.deploy(AddressManager.address, 'CanonicalTransactionChain');
        await AddressManager.setAddress('ChainStorageContainer-CTC-batches', batches.address);
        await AddressManager.setAddress('CanonicalTransactionChain', CanonicalTransactionChain.address);
    });
    describe('appendSequencerBatch [ @skip-on-coverage ]', () => {
        beforeEach(() => {
            CanonicalTransactionChain = CanonicalTransactionChain.connect(sequencer);
        });
        it('200 transactions in a single context', async () => {
            console.log(`Benchmark: 200 transactions in a single context.`);
            const timestamp = (await (0, helpers_1.getEthTime)(hardhat_1.ethers.provider)) - 100;
            const blockNumber = await (0, helpers_1.getNextBlockNumber)(hardhat_1.ethers.provider);
            const transactionTemplate = '0x' + '11'.repeat(400);
            const transactions = [];
            const numTxs = 200;
            for (let i = 0; i < numTxs; i++) {
                transactions.push(transactionTemplate);
            }
            const fixedCalldataCost = (transactionTemplate.slice(2).length / 2) * 16 * numTxs;
            const res = await appendSequencerBatch(CanonicalTransactionChain, {
                shouldStartAtElement: 0,
                totalElementsToAppend: numTxs,
                contexts: [
                    {
                        numSequencedTransactions: numTxs,
                        numSubsequentQueueTransactions: 0,
                        timestamp,
                        blockNumber,
                    },
                ],
                transactions,
            });
            const receipt = await res.wait();
            const gasUsed = receipt.gasUsed.toNumber();
            console.log('Benchmark complete.');
            console.log('Fixed calldata cost:', fixedCalldataCost);
            console.log('Non-calldata overhead gas cost per transaction:', (gasUsed - fixedCalldataCost) / numTxs);
            (0, core_utils_1.expectApprox)(gasUsed, 1402638, {
                absoluteUpperDeviation: 1000,
                percentLowerDeviation: 1,
            });
        }).timeout(10000000);
        it('200 transactions in 200 contexts', async () => {
            console.log(`Benchmark: 200 transactions in 200 contexts.`);
            const timestamp = (await (0, helpers_1.getEthTime)(hardhat_1.ethers.provider)) - 100;
            const blockNumber = await (0, helpers_1.getNextBlockNumber)(hardhat_1.ethers.provider);
            const transactionTemplate = '0x' + '11'.repeat(400);
            const transactions = [];
            const numTxs = 200;
            for (let i = 0; i < numTxs; i++) {
                transactions.push(transactionTemplate);
            }
            const fixedCalldataCost = (transactionTemplate.slice(2).length / 2) * 16 * numTxs;
            const res = await appendSequencerBatch(CanonicalTransactionChain, {
                shouldStartAtElement: 0,
                totalElementsToAppend: numTxs,
                contexts: [...Array(numTxs)].map(() => {
                    return {
                        numSequencedTransactions: 1,
                        numSubsequentQueueTransactions: 0,
                        timestamp,
                        blockNumber,
                    };
                }),
                transactions,
            });
            const receipt = await res.wait();
            const gasUsed = receipt.gasUsed.toNumber();
            console.log('Benchmark complete.');
            console.log('Fixed calldata cost:', fixedCalldataCost);
            console.log('Non-calldata overhead gas cost per transaction:', (gasUsed - fixedCalldataCost) / numTxs);
            (0, core_utils_1.expectApprox)(gasUsed, 1619781, {
                absoluteUpperDeviation: 1000,
                percentLowerDeviation: 1,
            });
        }).timeout(10000000);
        it('100 Sequencer transactions and 100 Queue transactions in 100 contexts', async () => {
            console.log(`Benchmark: 100 Sequencer transactions and 100 Queue transactions in 100 contexts`);
            const transactionTemplate = '0x' + '11'.repeat(400);
            const transactions = [];
            const numTxs = 100;
            for (let i = 0; i < numTxs; i++) {
                transactions.push(transactionTemplate);
            }
            const target = helpers_1.NON_ZERO_ADDRESS;
            const gasLimit = 500000;
            const data = '0x' + '12'.repeat(1234);
            const numEnqueues = numTxs;
            const queueContexts = [];
            for (let i = 0; i < numEnqueues; i++) {
                await CanonicalTransactionChain.enqueue(target, gasLimit, data);
                queueContexts.push({
                    blockNumber: (await (0, helpers_1.getNextBlockNumber)(hardhat_1.ethers.provider)) - 1,
                    timestamp: await (0, helpers_1.getEthTime)(hardhat_1.ethers.provider),
                    numSequencedTransactions: 1,
                    numSubsequentQueueTransactions: 1,
                });
            }
            const fixedCalldataCost = (transactionTemplate.slice(2).length / 2) * 16 * numTxs;
            const res = await appendSequencerBatch(CanonicalTransactionChain, {
                shouldStartAtElement: 0,
                totalElementsToAppend: numTxs + numEnqueues,
                contexts: queueContexts,
                transactions,
            });
            const receipt = await res.wait();
            const gasUsed = receipt.gasUsed.toNumber();
            console.log('Benchmark complete.');
            console.log('Fixed calldata cost:', fixedCalldataCost);
            console.log('Non-calldata overhead gas cost per transaction:', (gasUsed - fixedCalldataCost) / numTxs);
            (0, core_utils_1.expectApprox)(gasUsed, 891158, {
                absoluteUpperDeviation: 1000,
                percentLowerDeviation: 1,
            });
        }).timeout(10000000);
    });
    describe('enqueue [ @skip-on-coverage ]', () => {
        let enqueueL2GasPrepaid;
        let data;
        beforeEach(async () => {
            CanonicalTransactionChain = CanonicalTransactionChain.connect(sequencer);
            enqueueL2GasPrepaid =
                await CanonicalTransactionChain.enqueueL2GasPrepaid();
            data = '0x' + '12'.repeat(1234);
        });
        it('cost to enqueue a transaction above the prepaid threshold', async () => {
            const l2GasLimit = 2 * enqueueL2GasPrepaid;
            const res = await CanonicalTransactionChain.enqueue(helpers_1.NON_ZERO_ADDRESS, l2GasLimit, data);
            const receipt = await res.wait();
            const gasUsed = receipt.gasUsed.toNumber();
            console.log('Benchmark complete.');
            (0, core_utils_1.expectApprox)(gasUsed, 196687, {
                absoluteUpperDeviation: 500,
                percentLowerDeviation: 1,
            });
        });
        it('cost to enqueue a transaction below the prepaid threshold', async () => {
            const l2GasLimit = enqueueL2GasPrepaid - 1;
            const res = await CanonicalTransactionChain.enqueue(helpers_1.NON_ZERO_ADDRESS, l2GasLimit, data);
            const receipt = await res.wait();
            const gasUsed = receipt.gasUsed.toNumber();
            console.log('Benchmark complete.');
            (0, core_utils_1.expectApprox)(gasUsed, 134100, {
                absoluteUpperDeviation: 500,
                percentLowerDeviation: 1,
            });
        });
    });
});
//# sourceMappingURL=CanonicalTransactionChain.gas.spec.js.map