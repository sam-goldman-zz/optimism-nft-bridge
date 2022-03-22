"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const setup_1 = require("../../../setup");
const helpers_1 = require("../../../helpers");
describe('AddressDictator', () => {
    let signer;
    let otherSigner;
    let signerAddress;
    let Factory__AddressDictator;
    let Factory__Lib_AddressManager;
    before(async () => {
        ;
        [signer, otherSigner] = await hardhat_1.ethers.getSigners();
        Factory__AddressDictator = await hardhat_1.ethers.getContractFactory('AddressDictator');
        Factory__Lib_AddressManager = await hardhat_1.ethers.getContractFactory('Lib_AddressManager');
        signerAddress = await signer.getAddress();
    });
    let AddressDictator;
    let Lib_AddressManager;
    beforeEach(async () => {
        Lib_AddressManager = await Factory__Lib_AddressManager.connect(signer).deploy();
        AddressDictator = await Factory__AddressDictator.connect(signer).deploy(Lib_AddressManager.address, signerAddress, ['addr1'], [helpers_1.NON_ZERO_ADDRESS]);
        Lib_AddressManager.transferOwnership(AddressDictator.address);
    });
    describe('initialize', () => {
        it('should revert when providing wrong arguments', async () => {
            await (0, setup_1.expect)(Factory__AddressDictator.connect(signer).deploy(Lib_AddressManager.address, signerAddress, ['addr1', 'addr2'], [helpers_1.NON_ZERO_ADDRESS])).to.be.revertedWith('AddressDictator: Must provide an equal number of names and addresses.');
        });
    });
    describe('setAddresses', async () => {
        it('should change the addresses associated with a name', async () => {
            await AddressDictator.setAddresses();
            (0, setup_1.expect)(await Lib_AddressManager.getAddress('addr1')).to.be.equal(helpers_1.NON_ZERO_ADDRESS);
        });
    });
    describe('getNamedAddresses', () => {
        it('should return all the addresses and their names', async () => {
            (0, setup_1.expect)(await AddressDictator.getNamedAddresses()).to.be.deep.equal([
                ['addr1', helpers_1.NON_ZERO_ADDRESS],
            ]);
        });
    });
    describe('returnOwnership', () => {
        it('should transfer contract ownership to finalOwner', async () => {
            await (0, setup_1.expect)(AddressDictator.connect(signer).returnOwnership()).to.not.be
                .reverted;
        });
        it('should revert when called by non-owner', async () => {
            await (0, setup_1.expect)(AddressDictator.connect(otherSigner).returnOwnership()).to.be.revertedWith('AddressDictator: only callable by finalOwner');
        });
    });
});
//# sourceMappingURL=AddressDictator.spec.js.map