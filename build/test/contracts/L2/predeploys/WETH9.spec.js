"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const smock_1 = require("@defi-wonderland/smock");
const setup_1 = require("../../../setup");
describe('WETH9', () => {
    let signer;
    let otherSigner;
    let signerAddress;
    let otherSignerAddress;
    let Mock__Factory_WETH9;
    let Mock__WETH9;
    before(async () => {
        ;
        [signer, otherSigner] = await hardhat_1.ethers.getSigners();
        signerAddress = await signer.getAddress();
        otherSignerAddress = await otherSigner.getAddress();
    });
    beforeEach(async () => {
        Mock__Factory_WETH9 = await smock_1.smock.mock('WETH9');
        Mock__WETH9 = await Mock__Factory_WETH9.deploy();
    });
    describe('deposit', () => {
        it('should create WETH with fallback function', async () => {
            await (0, setup_1.expect)(signer.sendTransaction({
                to: Mock__WETH9.address,
                value: 200,
            })).to.not.be.reverted;
            (0, setup_1.expect)(await Mock__WETH9.balanceOf(signerAddress)).to.be.equal(200);
        });
        it('should create WETH with deposit function', async () => {
            await (0, setup_1.expect)(Mock__WETH9.connect(signer).deposit({ value: 100 })).to.not
                .be.reverted;
            (0, setup_1.expect)(await Mock__WETH9.balanceOf(signerAddress)).to.be.equal(100);
        });
    });
    describe('withdraw', () => {
        it('should revert when withdraw amount is bigger than balance', async () => {
            await (0, setup_1.expect)(Mock__WETH9.connect(signer).withdraw(10000)).to.be.reverted;
        });
        it('should withdraw to eth', async () => {
            await Mock__WETH9.connect(signer).deposit({ value: 100 });
            await (0, setup_1.expect)(Mock__WETH9.connect(signer).withdraw(50)).to.not.be.reverted;
            (0, setup_1.expect)(await Mock__WETH9.balanceOf(signerAddress)).to.be.equal(50);
        });
    });
    describe('totalSupply', () => {
        it('should return the totalSupply', async () => {
            await (0, setup_1.expect)(Mock__WETH9.totalSupply()).to.not.be.reverted;
        });
    });
    describe('transfer', () => {
        it('should revert when sending more than deposited', async () => {
            await Mock__WETH9.connect(signer).deposit({ value: 100 });
            await (0, setup_1.expect)(Mock__WETH9.connect(signer).transfer(otherSignerAddress, 500)).to.be.reverted;
        });
        it('should transfer WETH to an other address', async () => {
            await Mock__WETH9.connect(signer).deposit({ value: 100 });
            await (0, setup_1.expect)(Mock__WETH9.connect(signer).transfer(otherSignerAddress, 50))
                .to.not.be.reverted;
            (0, setup_1.expect)(await Mock__WETH9.balanceOf(signerAddress)).to.be.equal(50);
            (0, setup_1.expect)(await Mock__WETH9.balanceOf(otherSignerAddress)).to.be.equal(50);
        });
    });
    describe('transferFrom', () => {
        it('should revert when there is no allowance', async () => {
            await Mock__WETH9.connect(signer).deposit({ value: 100 });
            await (0, setup_1.expect)(Mock__WETH9.connect(otherSigner).transferFrom(signerAddress, otherSignerAddress, 50)).to.be.reverted;
        });
        it('should transfer WETH to an other address when there is approvement', async () => {
            await Mock__WETH9.connect(signer).deposit({ value: 100 });
            await Mock__WETH9.connect(signer).approve(otherSignerAddress, 50);
            await (0, setup_1.expect)(Mock__WETH9.connect(otherSigner).transferFrom(signerAddress, otherSignerAddress, 50)).to.not.be.reverted;
        });
    });
});
//# sourceMappingURL=WETH9.spec.js.map