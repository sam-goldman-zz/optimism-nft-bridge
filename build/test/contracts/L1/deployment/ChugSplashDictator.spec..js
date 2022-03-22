"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const setup_1 = require("../../../setup");
describe('ChugSplashDictator', () => {
    let signer;
    let otherSigner;
    let signerAddress;
    let Factory__L1ChugSplashProxy;
    let Factory__ChugSplashDictator;
    before(async () => {
        ;
        [signer, otherSigner] = await hardhat_1.ethers.getSigners();
        Factory__L1ChugSplashProxy = await hardhat_1.ethers.getContractFactory('L1ChugSplashProxy');
        Factory__ChugSplashDictator = await hardhat_1.ethers.getContractFactory('ChugSplashDictator');
        signerAddress = await signer.getAddress();
    });
    let L1ChugSplashProxy;
    let ChugSplashDictator;
    beforeEach(async () => {
        L1ChugSplashProxy = await Factory__L1ChugSplashProxy.connect(signer).deploy(signerAddress);
        ChugSplashDictator = await Factory__ChugSplashDictator.connect(signer).deploy(L1ChugSplashProxy.address, signerAddress, hardhat_1.ethers.utils.keccak256('0x1111'), hardhat_1.ethers.utils.keccak256('0x1234'), hardhat_1.ethers.utils.keccak256('0x5678'), hardhat_1.ethers.utils.keccak256('0x1234'), hardhat_1.ethers.utils.keccak256('0x1234'));
        await L1ChugSplashProxy.connect(signer).setOwner(ChugSplashDictator.address);
    });
    describe('doActions', () => {
        it('should revert when sent wrong code', async () => {
            await (0, setup_1.expect)(ChugSplashDictator.doActions('0x2222')).to.be.revertedWith('ChugSplashDictator: Incorrect code hash.');
        });
        it('should set the proxy code, storage & owner', async () => {
            await (0, setup_1.expect)(ChugSplashDictator.connect(signer).doActions('0x1111')).to
                .not.be.reverted;
        });
    });
    describe('returnOwnership', () => {
        it('should transfer contractc ownership to finalOwner', async () => {
            await (0, setup_1.expect)(ChugSplashDictator.connect(signer).returnOwnership()).to.not
                .be.reverted;
        });
        it('should revert when called by non-owner', async () => {
            await (0, setup_1.expect)(ChugSplashDictator.connect(otherSigner).returnOwnership()).to.be.revertedWith('ChugSplashDictator: only callable by finalOwner');
        });
    });
});
//# sourceMappingURL=ChugSplashDictator.spec..js.map