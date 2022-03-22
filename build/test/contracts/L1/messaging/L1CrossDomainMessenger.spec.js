"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@defi-wonderland/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
const setup_1 = require("../../../setup");
const helpers_1 = require("../../../helpers");
const src_1 = require("../../../../src");
const MAX_GAS_LIMIT = 8000000;
const deployProxyXDomainMessenger = async (addressManager, l1XDomainMessenger) => {
    await addressManager.setAddress('L1CrossDomainMessenger', l1XDomainMessenger.address);
    const proxy = await (await hardhat_1.ethers.getContractFactory('Lib_ResolvedDelegateProxy')).deploy(addressManager.address, 'L1CrossDomainMessenger');
    return l1XDomainMessenger.attach(proxy.address);
};
describe('L1CrossDomainMessenger', () => {
    let signer;
    let signer2;
    before(async () => {
        ;
        [signer, signer2] = await hardhat_1.ethers.getSigners();
    });
    let AddressManager;
    before(async () => {
        AddressManager = await (0, helpers_1.makeAddressManager)();
    });
    let Fake__TargetContract;
    let Fake__L2CrossDomainMessenger;
    let Fake__StateCommitmentChain;
    let Factory__CanonicalTransactionChain;
    let Factory__ChainStorageContainer;
    let Factory__L1CrossDomainMessenger;
    let CanonicalTransactionChain;
    before(async () => {
        Fake__TargetContract = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('Helper_SimpleProxy'));
        Fake__L2CrossDomainMessenger = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('L2CrossDomainMessenger'), {
            address: src_1.predeploys.L2CrossDomainMessenger,
        });
        Fake__StateCommitmentChain = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('StateCommitmentChain'));
        await AddressManager.setAddress('L2CrossDomainMessenger', Fake__L2CrossDomainMessenger.address);
        await (0, helpers_1.setProxyTarget)(AddressManager, 'StateCommitmentChain', Fake__StateCommitmentChain);
        Factory__CanonicalTransactionChain = await hardhat_1.ethers.getContractFactory('CanonicalTransactionChain');
        Factory__ChainStorageContainer = await hardhat_1.ethers.getContractFactory('ChainStorageContainer');
        Factory__L1CrossDomainMessenger = await hardhat_1.ethers.getContractFactory('L1CrossDomainMessenger');
        CanonicalTransactionChain = await Factory__CanonicalTransactionChain.deploy(AddressManager.address, MAX_GAS_LIMIT, helpers_1.L2_GAS_DISCOUNT_DIVISOR, helpers_1.ENQUEUE_GAS_COST);
        const batches = await Factory__ChainStorageContainer.deploy(AddressManager.address, 'CanonicalTransactionChain');
        await Factory__ChainStorageContainer.deploy(AddressManager.address, 'CanonicalTransactionChain');
        await AddressManager.setAddress('ChainStorageContainer-CTC-batches', batches.address);
        await AddressManager.setAddress('CanonicalTransactionChain', CanonicalTransactionChain.address);
    });
    let L1CrossDomainMessenger;
    beforeEach(async () => {
        const xDomainMessengerImpl = await Factory__L1CrossDomainMessenger.deploy();
        L1CrossDomainMessenger = await deployProxyXDomainMessenger(AddressManager, xDomainMessengerImpl);
        await L1CrossDomainMessenger.initialize(AddressManager.address);
    });
    describe('pause', () => {
        describe('when called by the current owner', () => {
            it('should pause the contract', async () => {
                await L1CrossDomainMessenger.pause();
                (0, setup_1.expect)(await L1CrossDomainMessenger.paused()).to.be.true;
            });
        });
        describe('when called by account other than the owner', () => {
            it('should not pause the contract', async () => {
                await (0, setup_1.expect)(L1CrossDomainMessenger.connect(signer2).pause()).to.be.revertedWith('Ownable: caller is not the owner');
            });
        });
    });
    describe('sendMessage', () => {
        const target = helpers_1.NON_ZERO_ADDRESS;
        const message = helpers_1.NON_NULL_BYTES32;
        const gasLimit = 100000;
        it('should be able to send a single message', async () => {
            await (0, setup_1.expect)(L1CrossDomainMessenger.sendMessage(target, message, gasLimit)).to.not.be.reverted;
            const calldata = (0, helpers_1.encodeXDomainCalldata)(target, await signer.getAddress(), message, 0);
            const transactionHash = hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.defaultAbiCoder.encode(['address', 'address', 'uint256', 'bytes'], [
                (0, core_utils_1.applyL1ToL2Alias)(L1CrossDomainMessenger.address),
                Fake__L2CrossDomainMessenger.address,
                gasLimit,
                calldata,
            ]));
            const queueLength = await CanonicalTransactionChain.getQueueLength();
            const queueElement = await CanonicalTransactionChain.getQueueElement(queueLength - 1);
            (0, setup_1.expect)(queueElement[0]).to.equal(transactionHash);
        });
        it('should be able to send the same message twice', async () => {
            await L1CrossDomainMessenger.sendMessage(target, message, gasLimit);
            await (0, setup_1.expect)(L1CrossDomainMessenger.sendMessage(target, message, gasLimit)).to.not.be.reverted;
        });
    });
    describe('replayMessage', () => {
        const target = helpers_1.NON_ZERO_ADDRESS;
        const message = helpers_1.NON_NULL_BYTES32;
        const oldGasLimit = 100000;
        const newGasLimit = 200000;
        let sender;
        before(async () => {
            sender = await signer.getAddress();
        });
        let queueIndex;
        beforeEach(async () => {
            await L1CrossDomainMessenger.connect(signer).sendMessage(target, message, oldGasLimit);
            const queueLength = await CanonicalTransactionChain.getQueueLength();
            queueIndex = queueLength - 1;
        });
        describe('when giving some incorrect input value', async () => {
            it('should revert if given the wrong target', async () => {
                await (0, setup_1.expect)(L1CrossDomainMessenger.replayMessage(hardhat_1.ethers.constants.AddressZero, sender, message, queueIndex, oldGasLimit, newGasLimit)).to.be.revertedWith('Provided message has not been enqueued.');
            });
            it('should revert if given the wrong sender', async () => {
                await (0, setup_1.expect)(L1CrossDomainMessenger.replayMessage(target, hardhat_1.ethers.constants.AddressZero, message, queueIndex, oldGasLimit, newGasLimit)).to.be.revertedWith('Provided message has not been enqueued.');
            });
            it('should revert if given the wrong message', async () => {
                await (0, setup_1.expect)(L1CrossDomainMessenger.replayMessage(target, sender, '0x', queueIndex, oldGasLimit, newGasLimit)).to.be.revertedWith('Provided message has not been enqueued.');
            });
            it('should revert if given the wrong queue index', async () => {
                await (0, setup_1.expect)(L1CrossDomainMessenger.replayMessage(target, sender, message, queueIndex - 1, oldGasLimit, newGasLimit)).to.be.revertedWith('Provided message has not been enqueued.');
            });
            it('should revert if given the wrong old gas limit', async () => {
                await (0, setup_1.expect)(L1CrossDomainMessenger.replayMessage(target, sender, message, queueIndex, oldGasLimit + 1, newGasLimit)).to.be.revertedWith('Provided message has not been enqueued.');
            });
        });
        describe('when all input values are the same as the existing message', () => {
            it('should succeed', async () => {
                await (0, setup_1.expect)(L1CrossDomainMessenger.replayMessage(target, sender, message, queueIndex, oldGasLimit, newGasLimit)).to.not.be.reverted;
            });
            it('should emit the TransactionEnqueued event', async () => {
                const newQueueIndex = await CanonicalTransactionChain.getQueueLength();
                const newTimestamp = (await (0, helpers_1.getEthTime)(hardhat_1.ethers.provider)) + 100;
                await (0, helpers_1.setEthTime)(hardhat_1.ethers.provider, newTimestamp);
                await (0, setup_1.expect)(L1CrossDomainMessenger.replayMessage(target, sender, message, queueIndex, oldGasLimit, newGasLimit))
                    .to.emit(CanonicalTransactionChain, 'TransactionEnqueued')
                    .withArgs((0, core_utils_1.applyL1ToL2Alias)(L1CrossDomainMessenger.address), Fake__L2CrossDomainMessenger.address, newGasLimit, (0, helpers_1.encodeXDomainCalldata)(target, sender, message, queueIndex), newQueueIndex, newTimestamp);
            });
        });
        it('should succeed if all inputs are the same as the existing message', async () => {
            await L1CrossDomainMessenger.sendMessage(target, message, oldGasLimit);
            const queueLength = await CanonicalTransactionChain.getQueueLength();
            await (0, setup_1.expect)(L1CrossDomainMessenger.replayMessage(target, await signer.getAddress(), message, queueLength - 1, oldGasLimit, newGasLimit)).to.not.be.reverted;
        });
    });
    describe('xDomainMessageSender', () => {
        let Mock__Factory__L1CrossDomainMessenger;
        let Mock__L1CrossDomainMessenger;
        before(async () => {
            Mock__Factory__L1CrossDomainMessenger = await smock_1.smock.mock('L1CrossDomainMessenger');
            Mock__L1CrossDomainMessenger =
                await Mock__Factory__L1CrossDomainMessenger.deploy();
        });
        it('should return the xDomainMsgSender address', async () => {
            await Mock__L1CrossDomainMessenger.setVariable('xDomainMsgSender', '0x0000000000000000000000000000000000000000');
            (0, setup_1.expect)(await Mock__L1CrossDomainMessenger.xDomainMessageSender()).to.equal('0x0000000000000000000000000000000000000000');
        });
    });
    const generateMockRelayMessageProof = async (target, sender, message, messageNonce = 0) => {
        const calldata = (0, helpers_1.encodeXDomainCalldata)(target, sender, message, messageNonce);
        const storageKey = hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.keccak256(calldata + (0, core_utils_1.remove0x)(Fake__L2CrossDomainMessenger.address)) + '00'.repeat(32));
        const storageGenerator = await helpers_1.TrieTestGenerator.fromNodes({
            nodes: [
                {
                    key: storageKey,
                    val: '0x' + '01'.padStart(2, '0'),
                },
            ],
            secure: true,
        });
        const generator = await helpers_1.TrieTestGenerator.fromAccounts({
            accounts: [
                {
                    address: src_1.predeploys.OVM_L2ToL1MessagePasser,
                    nonce: 0,
                    balance: 0,
                    codeHash: hardhat_1.ethers.utils.keccak256('0x1234'),
                    storageRoot: (0, core_utils_1.toHexString)(storageGenerator._trie.root),
                },
            ],
            secure: true,
        });
        const proof = {
            stateRoot: (0, core_utils_1.toHexString)(generator._trie.root),
            stateRootBatchHeader: helpers_1.DUMMY_BATCH_HEADERS[0],
            stateRootProof: helpers_1.DUMMY_BATCH_PROOFS[0],
            stateTrieWitness: (await generator.makeAccountProofTest(src_1.predeploys.OVM_L2ToL1MessagePasser)).accountTrieWitness,
            storageTrieWitness: (await storageGenerator.makeInclusionProofTest(storageKey)).proof,
        };
        return {
            calldata,
            proof,
        };
    };
    describe('relayMessage', () => {
        let target;
        let sender;
        let message;
        let proof;
        let calldata;
        before(async () => {
            target = Fake__TargetContract.address;
            message = Fake__TargetContract.interface.encodeFunctionData('setTarget', [
                helpers_1.NON_ZERO_ADDRESS,
            ]);
            sender = await signer.getAddress();
            const mockProof = await generateMockRelayMessageProof(target, sender, message);
            proof = mockProof.proof;
            calldata = mockProof.calldata;
        });
        beforeEach(async () => {
            Fake__StateCommitmentChain.verifyStateCommitment.returns(true);
            Fake__StateCommitmentChain.insideFraudProofWindow.returns(false);
        });
        it('should revert if still inside the fraud proof window', async () => {
            Fake__StateCommitmentChain.insideFraudProofWindow.returns(true);
            const proof1 = {
                stateRoot: hardhat_1.ethers.constants.HashZero,
                stateRootBatchHeader: helpers_1.DUMMY_BATCH_HEADERS[0],
                stateRootProof: helpers_1.DUMMY_BATCH_PROOFS[0],
                stateTrieWitness: '0x',
                storageTrieWitness: '0x',
            };
            await (0, setup_1.expect)(L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof1)).to.be.revertedWith('Provided message could not be verified.');
        });
        it('should revert if attempting to relay a message sent to an L1 system contract', async () => {
            const maliciousProof = await generateMockRelayMessageProof(CanonicalTransactionChain.address, sender, message);
            await (0, setup_1.expect)(L1CrossDomainMessenger.relayMessage(CanonicalTransactionChain.address, sender, message, 0, maliciousProof.proof)).to.be.revertedWith('Cannot send L2->L1 messages to L1 system contracts.');
        });
        it('should revert if provided an invalid state root proof', async () => {
            Fake__StateCommitmentChain.verifyStateCommitment.returns(false);
            const proof1 = {
                stateRoot: hardhat_1.ethers.constants.HashZero,
                stateRootBatchHeader: helpers_1.DUMMY_BATCH_HEADERS[0],
                stateRootProof: helpers_1.DUMMY_BATCH_PROOFS[0],
                stateTrieWitness: '0x',
                storageTrieWitness: '0x',
            };
            await (0, setup_1.expect)(L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof1)).to.be.revertedWith('Provided message could not be verified.');
        });
        it('should revert if provided an invalid storage trie witness', async () => {
            await (0, setup_1.expect)(L1CrossDomainMessenger.relayMessage(target, sender, message, 0, Object.assign(Object.assign({}, proof), { storageTrieWitness: '0x' }))).to.be.reverted;
        });
        it('should revert if provided an invalid state trie witness', async () => {
            await (0, setup_1.expect)(L1CrossDomainMessenger.relayMessage(target, sender, message, 0, Object.assign(Object.assign({}, proof), { stateTrieWitness: '0x' }))).to.be.reverted;
        });
        it('should send a successful call to the target contract', async () => {
            const blockNumber = await (0, helpers_1.getNextBlockNumber)(hardhat_1.ethers.provider);
            await L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof);
            (0, setup_1.expect)(await L1CrossDomainMessenger.successfulMessages(hardhat_1.ethers.utils.keccak256(calldata))).to.equal(true);
            (0, setup_1.expect)(await L1CrossDomainMessenger.relayedMessages(hardhat_1.ethers.utils.keccak256(calldata +
                (0, core_utils_1.remove0x)(await signer.getAddress()) +
                (0, core_utils_1.remove0x)(ethers_1.BigNumber.from(blockNumber).toHexString()).padStart(64, '0')))).to.equal(true);
        });
        it('the xDomainMessageSender is reset to the original value', async () => {
            await (0, setup_1.expect)(L1CrossDomainMessenger.xDomainMessageSender()).to.be.revertedWith('xDomainMessageSender is not set');
            await L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof);
            await (0, setup_1.expect)(L1CrossDomainMessenger.xDomainMessageSender()).to.be.revertedWith('xDomainMessageSender is not set');
        });
        it('should revert if trying to send the same message twice', async () => {
            await L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof);
            await (0, setup_1.expect)(L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof)).to.be.revertedWith('Provided message has already been received.');
        });
        it('should revert if paused', async () => {
            await L1CrossDomainMessenger.pause();
            await (0, setup_1.expect)(L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof)).to.be.revertedWith('Pausable: paused');
        });
        describe('blockMessage and allowMessage', () => {
            it('should revert if called by an account other than the owner', async () => {
                const L1CrossDomainMessenger2 = L1CrossDomainMessenger.connect(signer2);
                await (0, setup_1.expect)(L1CrossDomainMessenger2.blockMessage(hardhat_1.ethers.utils.keccak256(calldata))).to.be.revertedWith('Ownable: caller is not the owner');
                await (0, setup_1.expect)(L1CrossDomainMessenger2.allowMessage(hardhat_1.ethers.utils.keccak256(calldata))).to.be.revertedWith('Ownable: caller is not the owner');
            });
            it('should revert if the message is blocked', async () => {
                await L1CrossDomainMessenger.blockMessage(hardhat_1.ethers.utils.keccak256(calldata));
                await (0, setup_1.expect)(L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof)).to.be.revertedWith('Provided message has been blocked.');
            });
            it('should succeed if the message is blocked, then unblocked', async () => {
                await L1CrossDomainMessenger.blockMessage(hardhat_1.ethers.utils.keccak256(calldata));
                await (0, setup_1.expect)(L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof)).to.be.revertedWith('Provided message has been blocked.');
                await L1CrossDomainMessenger.allowMessage(hardhat_1.ethers.utils.keccak256(calldata));
                await (0, setup_1.expect)(L1CrossDomainMessenger.relayMessage(target, sender, message, 0, proof)).to.not.be.reverted;
            });
        });
    });
});
//# sourceMappingURL=L1CrossDomainMessenger.spec.js.map