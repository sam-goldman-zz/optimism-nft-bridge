"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const core_utils_1 = require("@eth-optimism/core-utils");
const setup_1 = require("../../../setup");
describe('OVM_GasPriceOracle', () => {
    const initialGasPrice = 0;
    let signer1;
    let signer2;
    before(async () => {
        ;
        [signer1, signer2] = await hardhat_1.ethers.getSigners();
    });
    let Factory__OVM_GasPriceOracle;
    before(async () => {
        Factory__OVM_GasPriceOracle = await hardhat_1.ethers.getContractFactory('OVM_GasPriceOracle');
    });
    let OVM_GasPriceOracle;
    beforeEach(async () => {
        OVM_GasPriceOracle = await Factory__OVM_GasPriceOracle.deploy(await signer1.getAddress());
        OVM_GasPriceOracle.setOverhead(2750);
        OVM_GasPriceOracle.setScalar(1500000);
        OVM_GasPriceOracle.setDecimals(6);
    });
    describe('owner', () => {
        it('should have an owner', async () => {
            (0, setup_1.expect)(await OVM_GasPriceOracle.owner()).to.equal(await signer1.getAddress());
        });
    });
    describe('setGasPrice', () => {
        it('should revert if called by someone other than the owner', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer2).setGasPrice(1234)).to.be
                .reverted;
        });
        it('should succeed if called by the owner and is equal to `0`', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer1).setGasPrice(0)).to.not.be
                .reverted;
        });
        it('should emit event', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer1).setGasPrice(100))
                .to.emit(OVM_GasPriceOracle, 'GasPriceUpdated')
                .withArgs(100);
        });
    });
    describe('get gasPrice', () => {
        it('should return zero at first', async () => {
            (0, setup_1.expect)(await OVM_GasPriceOracle.gasPrice()).to.equal(initialGasPrice);
        });
        it('should change when setGasPrice is called', async () => {
            const gasPrice = 1234;
            await OVM_GasPriceOracle.connect(signer1).setGasPrice(gasPrice);
            (0, setup_1.expect)(await OVM_GasPriceOracle.gasPrice()).to.equal(gasPrice);
        });
        it('is the 1st storage slot', async () => {
            const gasPrice = 333433;
            const slot = 1;
            await OVM_GasPriceOracle.connect(signer1).setGasPrice(gasPrice);
            const priceAtSlot = await signer1.provider.getStorageAt(OVM_GasPriceOracle.address, slot);
            (0, setup_1.expect)(await OVM_GasPriceOracle.gasPrice()).to.equal(hardhat_1.ethers.BigNumber.from(priceAtSlot));
        });
    });
    describe('setL1BaseFee', () => {
        it('should revert if called by someone other than the owner', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer2).setL1BaseFee(1234)).to.be
                .reverted;
        });
        it('should succeed if called by the owner', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer1).setL1BaseFee(0)).to.not
                .be.reverted;
        });
        it('should emit event', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer1).setL1BaseFee(100))
                .to.emit(OVM_GasPriceOracle, 'L1BaseFeeUpdated')
                .withArgs(100);
        });
    });
    describe('get l1BaseFee', () => {
        it('should return zero at first', async () => {
            (0, setup_1.expect)(await OVM_GasPriceOracle.l1BaseFee()).to.equal(initialGasPrice);
        });
        it('should change when setL1BaseFee is called', async () => {
            const baseFee = 1234;
            await OVM_GasPriceOracle.connect(signer1).setL1BaseFee(baseFee);
            (0, setup_1.expect)(await OVM_GasPriceOracle.l1BaseFee()).to.equal(baseFee);
        });
        it('is the 2nd storage slot', async () => {
            const baseFee = 12345;
            const slot = 2;
            await OVM_GasPriceOracle.connect(signer1).setGasPrice(baseFee);
            const priceAtSlot = await signer1.provider.getStorageAt(OVM_GasPriceOracle.address, slot);
            (0, setup_1.expect)(await OVM_GasPriceOracle.l1BaseFee()).to.equal(hardhat_1.ethers.BigNumber.from(priceAtSlot));
        });
    });
    const inputs = [
        '0x',
        '0x00',
        '0x01',
        '0x0001',
        '0x0101',
        '0xffff',
        '0x00ff00ff00ff00ff00ff00ff',
    ];
    describe('getL1GasUsed', async () => {
        for (const input of inputs) {
            it(`case: ${input}`, async () => {
                const overhead = await OVM_GasPriceOracle.overhead();
                const cost = await OVM_GasPriceOracle.getL1GasUsed(input);
                const expected = (0, core_utils_1.calculateL1GasUsed)(input, overhead);
                (0, setup_1.expect)(cost).to.deep.equal(expected);
            });
        }
    });
    describe('getL1Fee', async () => {
        for (const input of inputs) {
            it(`case: ${input}`, async () => {
                await OVM_GasPriceOracle.setGasPrice(1);
                await OVM_GasPriceOracle.setL1BaseFee(1);
                const decimals = await OVM_GasPriceOracle.decimals();
                const overhead = await OVM_GasPriceOracle.overhead();
                const scalar = await OVM_GasPriceOracle.scalar();
                const l1BaseFee = await OVM_GasPriceOracle.l1BaseFee();
                const l1Fee = await OVM_GasPriceOracle.getL1Fee(input);
                const expected = (0, core_utils_1.calculateL1Fee)(input, overhead, l1BaseFee, scalar, decimals);
                (0, setup_1.expect)(l1Fee).to.deep.equal(expected);
            });
        }
    });
    describe('setOverhead', () => {
        it('should revert if called by someone other than the owner', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer2).setOverhead(1234)).to.be
                .reverted;
        });
        it('should succeed if called by the owner', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer1).setOverhead(0)).to.not.be
                .reverted;
        });
        it('should emit event', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer1).setOverhead(100))
                .to.emit(OVM_GasPriceOracle, 'OverheadUpdated')
                .withArgs(100);
        });
    });
    describe('get overhead', () => {
        it('should return 2750 at first', async () => {
            (0, setup_1.expect)(await OVM_GasPriceOracle.overhead()).to.equal(2750);
        });
        it('should change when setOverhead is called', async () => {
            const overhead = 6657;
            await OVM_GasPriceOracle.connect(signer1).setOverhead(overhead);
            (0, setup_1.expect)(await OVM_GasPriceOracle.overhead()).to.equal(overhead);
        });
        it('is the 3rd storage slot', async () => {
            const overhead = 119090;
            const slot = 3;
            await OVM_GasPriceOracle.connect(signer1).setOverhead(overhead);
            const priceAtSlot = await signer1.provider.getStorageAt(OVM_GasPriceOracle.address, slot);
            (0, setup_1.expect)(await OVM_GasPriceOracle.overhead()).to.equal(hardhat_1.ethers.BigNumber.from(priceAtSlot));
        });
    });
    describe('setScalar', () => {
        it('should revert if called by someone other than the owner', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer2).setScalar(1234)).to.be
                .reverted;
        });
        it('should succeed if called by the owner', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer1).setScalar(0)).to.not.be
                .reverted;
        });
        it('should emit event', async () => {
            await (0, setup_1.expect)(OVM_GasPriceOracle.connect(signer1).setScalar(100))
                .to.emit(OVM_GasPriceOracle, 'ScalarUpdated')
                .withArgs(100);
        });
    });
    describe('scalar', () => {
        it('should return 1 at first', async () => {
            (0, setup_1.expect)(await OVM_GasPriceOracle.scalar()).to.equal(1500000);
        });
        it('should change when setScalar is called', async () => {
            const scalar = 9999;
            await OVM_GasPriceOracle.connect(signer1).setScalar(scalar);
            (0, setup_1.expect)(await OVM_GasPriceOracle.scalar()).to.equal(scalar);
        });
        it('is the 4rd storage slot', async () => {
            const overhead = 111111;
            const slot = 4;
            await OVM_GasPriceOracle.connect(signer1).setScalar(overhead);
            const priceAtSlot = await signer1.provider.getStorageAt(OVM_GasPriceOracle.address, slot);
            (0, setup_1.expect)(await OVM_GasPriceOracle.scalar()).to.equal(hardhat_1.ethers.BigNumber.from(priceAtSlot));
        });
    });
    describe('decimals', () => {
        it('is the 5th storage slot', async () => {
            const slot = 5;
            const priceAtSlot = await signer1.provider.getStorageAt(OVM_GasPriceOracle.address, slot);
            (0, setup_1.expect)(await OVM_GasPriceOracle.decimals()).to.equal(hardhat_1.ethers.BigNumber.from(priceAtSlot));
        });
    });
});
//# sourceMappingURL=OVM_GasPriceOracle.spec.js.map