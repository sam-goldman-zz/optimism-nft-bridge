"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const smock_1 = require("@defi-wonderland/smock");
const setup_1 = require("../../../setup");
const src_1 = require("../../../../src");
describe('L2StandardTokenFactory', () => {
    let signer;
    let Factory__L1ERC20;
    let L1ERC20;
    let L2StandardTokenFactory;
    before(async () => {
        ;
        [signer] = await hardhat_1.ethers.getSigners();
        Factory__L1ERC20 = await smock_1.smock.mock('@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20');
        L1ERC20 = await Factory__L1ERC20.deploy('L1ERC20', 'ERC');
        L2StandardTokenFactory = await (await hardhat_1.ethers.getContractFactory('L2StandardTokenFactory')).deploy();
    });
    describe('Standard token factory', () => {
        it('should be able to create a standard token', async () => {
            const tx = await L2StandardTokenFactory.createStandardL2Token(L1ERC20.address, 'L2ERC20', 'ERC');
            const receipt = await tx.wait();
            const [tokenCreatedEvent] = receipt.events;
            (0, setup_1.expect)(tokenCreatedEvent.event).to.be.eq('StandardL2TokenCreated');
            const l2TokenAddress = tokenCreatedEvent.args._l2Token;
            const l2Token = new ethers_1.Contract(l2TokenAddress, (0, src_1.getContractInterface)('L2StandardERC20'), signer);
            (0, setup_1.expect)(await l2Token.l2Bridge()).to.equal(src_1.predeploys.L2StandardBridge);
            (0, setup_1.expect)(await l2Token.l1Token()).to.equal(L1ERC20.address);
            (0, setup_1.expect)(await l2Token.name()).to.equal('L2ERC20');
            (0, setup_1.expect)(await l2Token.symbol()).to.equal('ERC');
        });
        it('should not be able to create a standard token with a 0 address for l1 token', async () => {
            await (0, setup_1.expect)(L2StandardTokenFactory.createStandardL2Token(hardhat_1.ethers.constants.AddressZero, 'L2ERC20', 'ERC')).to.be.revertedWith('Must provide L1 token address');
        });
    });
});
//# sourceMappingURL=L2StandardTokenFactory.spec.js.map