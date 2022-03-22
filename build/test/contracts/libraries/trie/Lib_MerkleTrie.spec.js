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
const rlp = __importStar(require("rlp"));
const hardhat_1 = require("hardhat");
const core_utils_1 = require("@eth-optimism/core-utils");
const baseTrie_1 = require("merkle-patricia-tree/dist/baseTrie");
const setup_1 = require("../../../setup");
const helpers_1 = require("../../../helpers");
const officialTestJson = __importStar(require("../../../data/json/libraries/trie/trietest.json"));
const officialTestAnyOrderJson = __importStar(require("../../../data/json/libraries/trie/trieanyorder.json"));
const NODE_COUNTS = [1, 2, 32, 128];
describe('Lib_MerkleTrie', () => {
    let Lib_MerkleTrie;
    before(async () => {
        Lib_MerkleTrie = await (await hardhat_1.ethers.getContractFactory('TestLib_MerkleTrie')).deploy();
    });
    describe('official tests', () => {
        for (const testName of Object.keys(officialTestJson.tests)) {
            it(`should perform official test: ${testName}`, async () => {
                const trie = new baseTrie_1.Trie();
                const inputs = officialTestJson.tests[testName].in;
                const expected = officialTestJson.tests[testName].root;
                for (const input of inputs) {
                    let key;
                    if (input[0].startsWith('0x')) {
                        key = (0, core_utils_1.fromHexString)(input[0]);
                    }
                    else {
                        key = (0, core_utils_1.fromHexString)(hardhat_1.ethers.utils.hexlify(hardhat_1.ethers.utils.toUtf8Bytes(input[0])));
                    }
                    let val;
                    if (input[1] === null) {
                        throw new Error('deletions not supported, check your tests');
                    }
                    else if (input[1].startsWith('0x')) {
                        val = (0, core_utils_1.fromHexString)(input[1]);
                    }
                    else {
                        val = (0, core_utils_1.fromHexString)(hardhat_1.ethers.utils.hexlify(hardhat_1.ethers.utils.toUtf8Bytes(input[1])));
                    }
                    const proof = await baseTrie_1.Trie.createProof(trie, key);
                    const root = trie.root;
                    await trie.put(key, val);
                    const out = await Lib_MerkleTrie.update((0, core_utils_1.toHexString)(key), (0, core_utils_1.toHexString)(val), (0, core_utils_1.toHexString)(rlp.encode(proof)), root);
                    (0, setup_1.expect)(out).to.equal((0, core_utils_1.toHexString)(trie.root));
                }
                (0, setup_1.expect)((0, core_utils_1.toHexString)(trie.root)).to.equal(expected);
            });
        }
    });
    describe('official tests - trie any order', () => {
        for (const testName of Object.keys(officialTestAnyOrderJson.tests)) {
            it(`should perform official test: ${testName}`, async () => {
                const trie = new baseTrie_1.Trie();
                const inputs = officialTestAnyOrderJson.tests[testName].in;
                const expected = officialTestAnyOrderJson.tests[testName].root;
                for (const input of Object.keys(inputs)) {
                    let key;
                    if (input.startsWith('0x')) {
                        key = (0, core_utils_1.fromHexString)(input);
                    }
                    else {
                        key = (0, core_utils_1.fromHexString)(hardhat_1.ethers.utils.hexlify(hardhat_1.ethers.utils.toUtf8Bytes(input)));
                    }
                    let val;
                    if (inputs[input] === null) {
                        throw new Error('deletions not supported, check your tests');
                    }
                    else if (inputs[input].startsWith('0x')) {
                        val = (0, core_utils_1.fromHexString)(inputs[input]);
                    }
                    else {
                        val = (0, core_utils_1.fromHexString)(hardhat_1.ethers.utils.hexlify(hardhat_1.ethers.utils.toUtf8Bytes(inputs[input])));
                    }
                    const proof = await baseTrie_1.Trie.createProof(trie, key);
                    const root = trie.root;
                    await trie.put(key, val);
                    const out = await Lib_MerkleTrie.update((0, core_utils_1.toHexString)(key), (0, core_utils_1.toHexString)(val), (0, core_utils_1.toHexString)(rlp.encode(proof)), root);
                    (0, setup_1.expect)(out).to.equal((0, core_utils_1.toHexString)(trie.root));
                }
                (0, setup_1.expect)((0, core_utils_1.toHexString)(trie.root)).to.equal(expected);
            });
        }
    });
    describe('verifyInclusionProof', () => {
        for (const nodeCount of NODE_COUNTS) {
            describe(`inside a trie with ${nodeCount} nodes and keys/vals of size ${nodeCount} bytes`, () => {
                let generator;
                before(async () => {
                    generator = await helpers_1.TrieTestGenerator.fromRandom({
                        seed: `seed.incluson.${nodeCount}`,
                        nodeCount,
                        secure: false,
                        keySize: nodeCount,
                        valSize: nodeCount,
                    });
                });
                for (let i = 0; i < nodeCount; i += nodeCount / (nodeCount > 8 ? 8 : 1)) {
                    it(`should correctly prove inclusion for node #${i}`, async () => {
                        const test = await generator.makeInclusionProofTest(i);
                        (0, setup_1.expect)(await Lib_MerkleTrie.verifyInclusionProof(test.key, test.val, test.proof, test.root)).to.equal(true);
                    });
                }
            });
        }
    });
    describe('update', () => {
        for (const nodeCount of NODE_COUNTS) {
            describe(`inside a trie with ${nodeCount} nodes and keys/vals of size ${nodeCount} bytes`, () => {
                let generator;
                before(async () => {
                    generator = await helpers_1.TrieTestGenerator.fromRandom({
                        seed: `seed.update.${nodeCount}`,
                        nodeCount,
                        secure: false,
                        keySize: nodeCount,
                        valSize: nodeCount,
                    });
                });
                for (let i = 0; i < nodeCount; i += nodeCount / (nodeCount > 8 ? 8 : 1)) {
                    it(`should correctly update node #${i}`, async () => {
                        const test = await generator.makeNodeUpdateTest(i, '0x1234123412341234');
                        (0, setup_1.expect)(await Lib_MerkleTrie.update(test.key, test.val, test.proof, test.root)).to.equal(test.newRoot);
                    });
                }
            });
        }
        it('should return the single-node root hash if the trie was previously empty', async () => {
            const key = '0x1234';
            const val = '0x5678';
            const trie = new baseTrie_1.Trie();
            await trie.put((0, core_utils_1.fromHexString)(key), (0, core_utils_1.fromHexString)(val));
            (0, setup_1.expect)(await Lib_MerkleTrie.update(key, val, '0x', hardhat_1.ethers.utils.keccak256('0x80'))).to.equal((0, core_utils_1.toHexString)(trie.root));
        });
    });
    describe('get', () => {
        for (const nodeCount of NODE_COUNTS) {
            describe(`inside a trie with ${nodeCount} nodes and keys/vals of size ${nodeCount} bytes`, () => {
                let generator;
                before(async () => {
                    generator = await helpers_1.TrieTestGenerator.fromRandom({
                        seed: `seed.get.${nodeCount}`,
                        nodeCount,
                        secure: false,
                        keySize: nodeCount,
                        valSize: nodeCount,
                    });
                });
                for (let i = 0; i < nodeCount; i += nodeCount / (nodeCount > 8 ? 8 : 1)) {
                    it(`should correctly get the value of node #${i}`, async () => {
                        const test = await generator.makeInclusionProofTest(i);
                        (0, setup_1.expect)(await Lib_MerkleTrie.get(test.key, test.proof, test.root)).to.deep.equal([true, test.val]);
                    });
                    if (i > 3) {
                        it(`should revert when the proof node does not pass the root check`, async () => {
                            const test = await generator.makeInclusionProofTest(i - 1);
                            const test2 = await generator.makeInclusionProofTest(i - 2);
                            await (0, setup_1.expect)(Lib_MerkleTrie.get(test2.key, test.proof, test.root)).to.be.revertedWith('Invalid large internal hash');
                        });
                        it(`should revert when the first proof element is not the root node`, async () => {
                            const test = await generator.makeInclusionProofTest(0);
                            const decodedProof = rlp.decode(test.proof);
                            decodedProof[0].write('abcd', 8);
                            const badProof = rlp.encode(decodedProof);
                            await (0, setup_1.expect)(Lib_MerkleTrie.get(test.key, badProof, test.root)).to.be.revertedWith('Invalid root hash');
                        });
                        it(`should be false when calling get on an incorrect key`, async () => {
                            const test = await generator.makeInclusionProofTest(i - 1);
                            let newKey = test.key.slice(0, test.key.length - 8);
                            newKey = newKey.concat('88888888');
                            (0, setup_1.expect)(await Lib_MerkleTrie.get(newKey, test.proof, test.root)).to.deep.equal([false, '0x']);
                        });
                    }
                }
            });
        }
    });
    describe(`inside a trie with one node`, () => {
        let generator;
        const nodeCount = 1;
        before(async () => {
            generator = await helpers_1.TrieTestGenerator.fromRandom({
                seed: `seed.get.${nodeCount}`,
                nodeCount,
                secure: false,
            });
        });
        it(`should revert on an incorrect proof node prefix`, async () => {
            const test = await generator.makeInclusionProofTest(0);
            const decodedProof = rlp.decode(test.proof);
            decodedProof[0].write('a', 3);
            test.root = hardhat_1.ethers.utils.keccak256((0, core_utils_1.toHexString)(decodedProof[0]));
            const badProof = rlp.encode(decodedProof);
            await (0, setup_1.expect)(Lib_MerkleTrie.get(test.key, badProof, test.root)).to.be.revertedWith('Received a node with an unknown prefix');
        });
    });
});
//# sourceMappingURL=Lib_MerkleTrie.spec.js.map