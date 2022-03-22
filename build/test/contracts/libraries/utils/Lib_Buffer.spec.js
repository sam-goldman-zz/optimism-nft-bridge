"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = __importDefault(require("hardhat"));
const ethers_1 = require("ethers");
const setup_1 = require("../../../setup");
describe('Lib_Buffer', () => {
    let Lib_Buffer;
    beforeEach(async () => {
        const Factory__Lib_Buffer = await hardhat_1.default.ethers.getContractFactory('TestLib_Buffer');
        Lib_Buffer = await Factory__Lib_Buffer.deploy();
    });
    describe('push(bytes32,bytes27)', () => {
        for (const len of [1, 2, 4, 8, 32]) {
            it(`it should be able to add ${len} element(s) to the array`, async () => {
                for (let i = 0; i < len; i++) {
                    await (0, setup_1.expect)(Lib_Buffer['push(bytes32,bytes27)'](ethers_1.ethers.utils.keccak256(`0x${i.toString(16).padStart(16, '0')}`), `0x${'00'.repeat(27)}`)).to.not.be.reverted;
                }
            });
        }
    });
    describe('push(bytes32)', () => {
        for (const len of [1, 2, 4, 8, 32]) {
            it(`it should be able to add ${len} element(s) to the array`, async () => {
                for (let i = 0; i < len; i++) {
                    await (0, setup_1.expect)(Lib_Buffer['push(bytes32)'](ethers_1.ethers.utils.keccak256(`0x${i.toString(16).padStart(16, '0')}`))).to.not.be.reverted;
                }
            });
        }
    });
    describe('get', () => {
        for (const len of [1, 2, 4, 8, 32]) {
            describe(`when the array has ${len} element(s)`, () => {
                const values = [];
                beforeEach(async () => {
                    for (let i = 0; i < len; i++) {
                        const value = ethers_1.ethers.utils.keccak256(`0x${i.toString(16).padStart(16, '0')}`);
                        values.push(value);
                        await Lib_Buffer['push(bytes32,bytes27)'](value, `0x${'00'.repeat(27)}`);
                    }
                });
                for (let i = 0; i < len; i += Math.max(1, len / 4)) {
                    it(`should be able to get the ${i}th/st/rd/whatever value`, async () => {
                        (0, setup_1.expect)(await Lib_Buffer.get(i)).to.equal(values[i]);
                    });
                }
                it('should throw if attempting to access an element that does not exist', async () => {
                    await (0, setup_1.expect)(Lib_Buffer.get(len + 1)).to.be.reverted;
                });
            });
        }
    });
    describe('getLength', () => {
        it('should return zero by default', async () => {
            (0, setup_1.expect)(await Lib_Buffer.getLength()).to.equal(0);
        });
        for (const len of [1, 2, 4, 8, 32]) {
            describe(`when the array has ${len} element(s)`, () => {
                const values = [];
                beforeEach(async () => {
                    for (let i = 0; i < len; i++) {
                        const value = ethers_1.ethers.utils.keccak256(`0x${i.toString(16).padStart(16, '0')}`);
                        values.push(value);
                        await Lib_Buffer['push(bytes32,bytes27)'](value, `0x${'00'.repeat(27)}`);
                    }
                });
                it(`should return a value of ${len}`, async () => {
                    (0, setup_1.expect)(await Lib_Buffer.getLength()).to.equal(len);
                });
            });
        }
    });
    describe('getExtraData', () => {
        it('should be bytes27(0) by default', async () => {
            (0, setup_1.expect)(await Lib_Buffer.getExtraData()).to.equal(`0x${'00'.repeat(27)}`);
        });
        it('should change if set by a call to push()', async () => {
            const extraData = `0x${'11'.repeat(27)}`;
            await Lib_Buffer['push(bytes32,bytes27)'](ethers_1.ethers.utils.keccak256('0x00'), extraData);
            (0, setup_1.expect)(await Lib_Buffer.getExtraData()).to.equal(extraData);
        });
        it('should change if set multiple times', async () => {
            await Lib_Buffer['push(bytes32,bytes27)'](ethers_1.ethers.utils.keccak256('0x00'), `0x${'11'.repeat(27)}`);
            const extraData = `0x${'22'.repeat(27)}`;
            await Lib_Buffer['push(bytes32,bytes27)'](ethers_1.ethers.utils.keccak256('0x00'), extraData);
            (0, setup_1.expect)(await Lib_Buffer.getExtraData()).to.equal(extraData);
        });
    });
    describe('setExtraData', () => {
        it('should modify the extra data', async () => {
            const extraData = `0x${'11'.repeat(27)}`;
            await Lib_Buffer.setExtraData(extraData);
            (0, setup_1.expect)(await Lib_Buffer.getExtraData()).to.equal(extraData);
        });
        it('should be able to modify the extra data multiple times', async () => {
            const extraData1 = `0x${'22'.repeat(27)}`;
            await Lib_Buffer.setExtraData(extraData1);
            (0, setup_1.expect)(await Lib_Buffer.getExtraData()).to.equal(extraData1);
            const extraData2 = `0x${'11'.repeat(27)}`;
            await Lib_Buffer.setExtraData(extraData2);
            (0, setup_1.expect)(await Lib_Buffer.getExtraData()).to.equal(extraData2);
        });
    });
    describe('deleteElementsAfterInclusive', () => {
        it('should revert when the array is empty', async () => {
            await (0, setup_1.expect)(Lib_Buffer['deleteElementsAfterInclusive(uint40)'](0)).to.be
                .reverted;
        });
        for (const len of [1, 2, 4, 8, 32]) {
            describe(`when the array has ${len} element(s)`, () => {
                const values = [];
                beforeEach(async () => {
                    for (let i = 0; i < len; i++) {
                        const value = ethers_1.ethers.utils.keccak256(`0x${i.toString(16).padStart(16, '0')}`);
                        values.push(value);
                        await Lib_Buffer['push(bytes32,bytes27)'](value, `0x${'00'.repeat(27)}`);
                    }
                });
                for (let i = len - 1; i > 0; i -= Math.max(1, len / 4)) {
                    it(`should be able to delete everything after and including the ${i}th/st/rd/whatever element`, async () => {
                        await (0, setup_1.expect)(Lib_Buffer['deleteElementsAfterInclusive(uint40)'](i))
                            .to.not.be.reverted;
                        (0, setup_1.expect)(await Lib_Buffer.getLength()).to.equal(i);
                        await (0, setup_1.expect)(Lib_Buffer.get(i)).to.be.reverted;
                    });
                }
                for (let i = len - 1; i > 0; i -= Math.max(1, len / 4)) {
                    it(`should be able to delete after and incl. ${i}th/st/rd/whatever element while changing extra data`, async () => {
                        const extraData = `0x${i.toString(16).padStart(54, '0')}`;
                        await (0, setup_1.expect)(Lib_Buffer['deleteElementsAfterInclusive(uint40,bytes27)'](i, extraData)).to.not.be.reverted;
                        (0, setup_1.expect)(await Lib_Buffer.getLength()).to.equal(i);
                        await (0, setup_1.expect)(Lib_Buffer.get(i)).to.be.reverted;
                        (0, setup_1.expect)(await Lib_Buffer.getExtraData()).to.equal(extraData);
                    });
                }
            });
        }
    });
    describe('setContext', () => {
        it('should modify the context', async () => {
            const length = 20;
            const extraData = `0x${'11'.repeat(27)}`;
            const cntx = [length, extraData];
            await Lib_Buffer.setContext(length, extraData);
            (0, setup_1.expect)(await Lib_Buffer.getContext()).to.eql(cntx);
        });
        it('should not modify the context', async () => {
            const length = 0;
            const extraData = `0x${'00'.repeat(27)}`;
            const prevContext = await Lib_Buffer.getContext();
            await Lib_Buffer.setContext(length, extraData);
            (0, setup_1.expect)(await Lib_Buffer.getContext()).to.eql(prevContext);
        });
    });
});
//# sourceMappingURL=Lib_Buffer.spec.js.map