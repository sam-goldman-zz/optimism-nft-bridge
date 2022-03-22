"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = __importDefault(require("hardhat"));
const smock_1 = require("@defi-wonderland/smock");
const setup_1 = require("../../setup");
const src_1 = require("../../../src");
describe('L1ChugSplashProxy', () => {
    let signer1;
    let signer2;
    before(async () => {
        ;
        [signer1, signer2] = await hardhat_1.default.ethers.getSigners();
    });
    let L1ChugSplashProxy;
    beforeEach(async () => {
        const Factory__L1ChugSplashProxy = await hardhat_1.default.ethers.getContractFactory('L1ChugSplashProxy');
        L1ChugSplashProxy = await Factory__L1ChugSplashProxy.deploy(await signer1.getAddress());
    });
    describe('getOwner', () => {
        it('should return the owner if called by the owner', async () => {
            (0, setup_1.expect)(await L1ChugSplashProxy.connect(signer1).callStatic.getOwner()).to.equal(await signer1.getAddress());
        });
        it('should return the owner if called by the zero address in an eth_call', async () => {
            (0, setup_1.expect)(await L1ChugSplashProxy.connect(signer1.provider).callStatic.getOwner({
                from: hardhat_1.default.ethers.constants.AddressZero,
            })).to.equal(await signer1.getAddress());
        });
        it('should otherwise pass through to the proxied contract', async () => {
            await (0, setup_1.expect)(L1ChugSplashProxy.connect(signer2).callStatic.getOwner()).to.be.revertedWith('L1ChugSplashProxy: implementation is not set yet');
        });
    });
    describe('setOwner', () => {
        it('should succeed if called by the owner', async () => {
            await (0, setup_1.expect)(L1ChugSplashProxy.connect(signer1).setOwner(await signer2.getAddress())).to.not.be.reverted;
            (0, setup_1.expect)(await L1ChugSplashProxy.connect(signer2).callStatic.getOwner()).to.equal(await signer2.getAddress());
        });
        it('should otherwise pass through to the proxied contract', async () => {
            await (0, setup_1.expect)(L1ChugSplashProxy.connect(signer2).setOwner(await signer1.getAddress())).to.be.revertedWith('L1ChugSplashProxy: implementation is not set yet');
        });
    });
    describe('getImplementation', () => {
        it('should succeed if called by the owner', async () => {
            (0, setup_1.expect)(await L1ChugSplashProxy.connect(signer1).callStatic.getImplementation()).to.equal(hardhat_1.default.ethers.constants.AddressZero);
        });
        it('should succeed if called by the zero address in an eth_call', async () => {
            (0, setup_1.expect)(await L1ChugSplashProxy.connect(hardhat_1.default.ethers.provider).callStatic.getImplementation({
                from: hardhat_1.default.ethers.constants.AddressZero,
            })).to.equal(hardhat_1.default.ethers.constants.AddressZero);
        });
        it('should otherwise pass through to the proxied contract', async () => {
            await (0, setup_1.expect)(L1ChugSplashProxy.connect(signer2).getImplementation()).to.be.revertedWith('L1ChugSplashProxy: implementation is not set yet');
        });
    });
    describe('setStorage', () => {
        it('should succeed if called by the owner', async () => {
            const storageKey = hardhat_1.default.ethers.utils.keccak256('0x1234');
            const storageValue = hardhat_1.default.ethers.utils.keccak256('0x5678');
            await (0, setup_1.expect)(L1ChugSplashProxy.connect(signer1).setStorage(storageKey, storageValue)).to.not.be.reverted;
            (0, setup_1.expect)(await hardhat_1.default.ethers.provider.getStorageAt(L1ChugSplashProxy.address, storageKey)).to.equal(storageValue);
        });
        it('should otherwise pass through to the proxied contract', async () => {
            const storageKey = hardhat_1.default.ethers.utils.keccak256('0x1234');
            const storageValue = hardhat_1.default.ethers.utils.keccak256('0x5678');
            await (0, setup_1.expect)(L1ChugSplashProxy.connect(signer2).setStorage(storageKey, storageValue)).to.be.revertedWith('L1ChugSplashProxy: implementation is not set yet');
        });
    });
    describe('setCode', () => {
        it('should succeed if called by the owner', async () => {
            const code = '0x1234';
            await (0, setup_1.expect)(L1ChugSplashProxy.connect(signer1).setCode(code)).to.not.be
                .reverted;
            const implementation = await L1ChugSplashProxy.connect(signer1).callStatic.getImplementation();
            (0, setup_1.expect)(await hardhat_1.default.ethers.provider.getCode(implementation)).to.equal(code);
        });
        it('should not change the implementation address if the code does not change', async () => {
            const code = '0x1234';
            await L1ChugSplashProxy.connect(signer1).setCode(code);
            const implementation = await L1ChugSplashProxy.connect(signer1).callStatic.getImplementation();
            await L1ChugSplashProxy.connect(signer1).setCode(code);
            (0, setup_1.expect)(await L1ChugSplashProxy.connect(signer1).callStatic.getImplementation()).to.equal(implementation);
        });
    });
    describe('fallback', () => {
        it('should revert if implementation is not set', async () => {
            await (0, setup_1.expect)(signer1.sendTransaction({
                to: L1ChugSplashProxy.address,
                data: '0x',
            })).to.be.revertedWith('L1ChugSplashProxy: implementation is not set yet');
        });
        it('should execute the proxied contract when the implementation is set', async () => {
            const code = '0x00';
            await L1ChugSplashProxy.connect(signer1).setCode(code);
            await (0, setup_1.expect)(signer1.sendTransaction({
                to: L1ChugSplashProxy.address,
                data: '0x',
            })).to.not.be.reverted;
        });
        it('should throw an error if the owner has signalled an upgrade', async () => {
            const owner = await smock_1.smock.fake((0, src_1.getContractInterface)('iL1ChugSplashDeployer'));
            const factory = await hardhat_1.default.ethers.getContractFactory('L1ChugSplashProxy');
            const proxy = await factory.deploy(owner.address);
            owner.isUpgrading.returns(true);
            await (0, setup_1.expect)(owner.wallet.sendTransaction({
                to: proxy.address,
                data: '0x',
            })).to.be.revertedWith('L1ChugSplashProxy: system is currently being upgraded');
        });
    });
});
//# sourceMappingURL=L1ChugSplashProxy.spec.js.map