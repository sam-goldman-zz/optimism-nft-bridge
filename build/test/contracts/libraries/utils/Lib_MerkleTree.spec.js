"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const merkletreejs_1 = require("merkletreejs");
const core_utils_1 = require("@eth-optimism/core-utils");
const smock_1 = require("@defi-wonderland/smock");
const setup_1 = require("../../../setup");
const helpers_1 = require("../../../helpers");
const NODE_COUNTS = [
    2, 3, 7, 9, 13, 63, 64, 123, 128, 129, 255, 1021, 1023, 1024,
];
const hash = (el) => {
    return Buffer.from(hardhat_1.ethers.utils.keccak256(el).slice(2), 'hex');
};
const fillDefaultHashes = (elements) => {
    const filled = [];
    for (let i = 0; i < Math.pow(2, Math.ceil(Math.log2(elements.length))); i++) {
        if (i < elements.length) {
            filled.push(elements[i]);
        }
        else {
            filled.push(hardhat_1.ethers.utils.keccak256('0x' + '00'.repeat(32)));
        }
    }
    return filled;
};
describe('Lib_MerkleTree', () => {
    let Lib_MerkleTree;
    let Fake__LibMerkleTree;
    before(async () => {
        Lib_MerkleTree = await (await hardhat_1.ethers.getContractFactory('TestLib_MerkleTree')).deploy();
        Fake__LibMerkleTree = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('TestLib_MerkleTree'));
    });
    describe('getMerkleRoot', () => {
        describe('when no elements are provided', () => {
            const elements = [];
            it('should revert', async () => {
                await (0, setup_1.expect)(Lib_MerkleTree.getMerkleRoot(elements)).to.be.revertedWith('Lib_MerkleTree: Must provide at least one leaf hash.');
            });
        });
        describe('when a single element is provided', () => {
            const elements = [hardhat_1.ethers.utils.keccak256('0x1234')];
            it('should return the input element', async () => {
                (0, setup_1.expect)(await Lib_MerkleTree.getMerkleRoot(elements)).to.equal(elements[0]);
            });
        });
        describe('when more than one element is provided', () => {
            for (const size of NODE_COUNTS) {
                it(`should generate the correct root when ${size} elements are provided`, async () => {
                    const elements = [...Array(size)].map((_, i) => {
                        return hardhat_1.ethers.utils.keccak256(ethers_1.BigNumber.from(i).toHexString());
                    });
                    const bufs = fillDefaultHashes(elements).map((element) => {
                        return (0, core_utils_1.fromHexString)(element);
                    });
                    const tree = new merkletreejs_1.MerkleTree(bufs, hash);
                    (0, setup_1.expect)(await Lib_MerkleTree.getMerkleRoot(bufs)).to.equal((0, core_utils_1.toHexString)(tree.getRoot()));
                });
            }
        });
        describe('when odd number of elements is provided', () => {
            it(`should generate the correct root when odd number of elements are provided`, async () => {
                const elements = ['0x12', '0x34', '0x56'].map((value) => hardhat_1.ethers.utils.keccak256(value));
                Fake__LibMerkleTree.getMerkleRoot.returns();
                await (0, setup_1.expect)(Lib_MerkleTree.getMerkleRoot(elements)).to.not.be.reverted;
            });
        });
    });
    describe('verify', () => {
        describe('when total elements is zero', () => {
            const totalLeaves = 0;
            it('should revert', async () => {
                await (0, setup_1.expect)(Lib_MerkleTree.verify(hardhat_1.ethers.constants.HashZero, hardhat_1.ethers.constants.HashZero, 0, [], totalLeaves)).to.be.revertedWith('Lib_MerkleTree: Total leaves must be greater than zero.');
            });
        });
        describe('when total elements is zero', () => {
            const totalLeaves = 0;
            it('should revert', async () => {
                await (0, setup_1.expect)(Lib_MerkleTree.verify(hardhat_1.ethers.constants.HashZero, hardhat_1.ethers.constants.HashZero, 0, [], totalLeaves)).to.be.revertedWith('Lib_MerkleTree: Total leaves must be greater than zero.');
            });
        });
        describe('when an index is out of bounds', () => {
            const totalLeaves = 1;
            const index = 2;
            it('should revert', async () => {
                await (0, setup_1.expect)(Lib_MerkleTree.verify(hardhat_1.ethers.constants.HashZero, hardhat_1.ethers.constants.HashZero, index, [], totalLeaves)).to.be.revertedWith('Lib_MerkleTree: Index out of bounds.');
            });
        });
        describe('when total siblings does not match provided total leaves', () => {
            const totalLeaves = 8;
            const siblings = [hardhat_1.ethers.constants.HashZero, hardhat_1.ethers.constants.HashZero];
            it('should revert', async () => {
                await (0, setup_1.expect)(Lib_MerkleTree.verify(hardhat_1.ethers.constants.HashZero, hardhat_1.ethers.constants.HashZero, 0, siblings, totalLeaves)).to.be.revertedWith('Lib_MerkleTree: Total siblings does not correctly correspond to total leaves.');
            });
        });
        describe('with valid proof for a single element', () => {
            const root = helpers_1.NON_NULL_BYTES32;
            const leaf = helpers_1.NON_NULL_BYTES32;
            const index = 0;
            const siblings = [];
            const totalLeaves = 1;
            it('should succeed', async () => {
                (0, setup_1.expect)(await Lib_MerkleTree.verify(root, leaf, index, siblings, totalLeaves)).to.equal(true);
            });
        });
        describe('with valid proof for more than one element', () => {
            for (const size of NODE_COUNTS) {
                describe(`for a tree with ${size} total elements`, () => {
                    const elements = [...Array(size)].map((_, i) => {
                        return hardhat_1.ethers.utils.keccak256(ethers_1.BigNumber.from(i).toHexString());
                    });
                    const bufs = fillDefaultHashes(elements).map((element) => {
                        return (0, core_utils_1.fromHexString)(element);
                    });
                    const tree = new merkletreejs_1.MerkleTree(bufs, hash);
                    for (let i = 0; i < size; i += Math.ceil(size / 8)) {
                        it(`should verify a proof for the ${i}(th/st/rd, whatever) element`, async () => {
                            const proof = tree.getProof(bufs[i], i).map((element) => {
                                return element.data;
                            });
                            (0, setup_1.expect)(await Lib_MerkleTree.verify(tree.getRoot(), bufs[i], i, proof, size)).to.equal(true);
                        });
                    }
                });
            }
        });
    });
});
//# sourceMappingURL=Lib_MerkleTree.spec.js.map