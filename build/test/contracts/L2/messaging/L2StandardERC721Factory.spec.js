"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@defi-wonderland/smock");
const setup_1 = require("../../../setup");
const src_1 = require("../../../../src");
describe('L2StandardERC721Factory', () => {
    let signer;
    let Factory__L1ERC721;
    let L1ERC721;
    let L2StandardERC721Factory;
    before(async () => {
        [signer] = await hardhat_1.ethers.getSigners();
        Factory__L1ERC721 = await smock_1.smock.mock('@openzeppelin/contracts/token/ERC721/ERC721.sol:ERC721');
        L1ERC721 = await Factory__L1ERC721.deploy('L1ERC721', 'ERC');
        L2StandardERC721Factory = await (await hardhat_1.ethers.getContractFactory('L2StandardERC721Factory')).deploy();
    });
    describe('Standard ERC721 factory', () => {
        it('should be able to create a standard ERC721 contract', async () => {
            const tx = await L2StandardERC721Factory.createStandardL2ERC721(L1ERC721.address, 'L2ERC721', 'ERC');
            const receipt = await tx.wait();
            const [erc721CreatedEvent] = receipt.events;
            (0, setup_1.expect)(erc721CreatedEvent.event).to.be.eq('StandardL2ERC721Created');
            const l2ERC721Address = erc721CreatedEvent.args._l2Token;
            const l2Token = new ethers_1.Contract(l2ERC721Address, (0, src_1.getContractInterface)('L2StandardERC721'), signer);
            (0, setup_1.expect)(await l2Token.l2Bridge()).to.equal(src_1.predeploys.L2ERC721Bridge);
            (0, setup_1.expect)(await l2Token.l1Token()).to.equal(L1ERC721.address);
            (0, setup_1.expect)(await l2Token.name()).to.equal('L2ERC721');
            (0, setup_1.expect)(await l2Token.symbol()).to.equal('ERC');
        });
        it('should not be able to create a standard token with a 0 address for l1 token', async () => {
            await (0, setup_1.expect)(L2StandardERC721Factory.createStandardL2ERC721(hardhat_1.ethers.constants.AddressZero, 'L2ERC721', 'ERC')).to.be.revertedWith('Must provide L1 token address');
        });
    });
});
//# sourceMappingURL=L2StandardERC721Factory.spec.js.map