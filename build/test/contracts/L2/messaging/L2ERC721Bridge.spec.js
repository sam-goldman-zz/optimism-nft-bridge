"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const smock_1 = require("@defi-wonderland/smock");
const setup_1 = require("../../../setup");
const helpers_1 = require("../../../helpers");
const ERR_INVALID_MESSENGER = 'OVM_XCHAIN: messenger contract unauthenticated';
const ERR_INVALID_X_DOMAIN_MSG_SENDER = 'OVM_XCHAIN: wrong sender of cross-domain message';
const DUMMY_L1BRIDGE_ADDRESS = '0x1234123412341234123412341234123412341234';
const DUMMY_L1TOKEN_ADDRESS = '0x2234223412342234223422342234223422342234';
describe('L2ERC721Bridge', () => {
    let alice;
    let aliceAddress;
    let bob;
    let bobsAddress;
    let l2MessengerImpersonator;
    let Factory__L1ERC721Bridge;
    const ALICE_INITIAL_BALANCE = 10;
    const TOKEN_ID = 10;
    before(async () => {
        ;
        [alice, bob, l2MessengerImpersonator] = await hardhat_1.ethers.getSigners();
        aliceAddress = await alice.getAddress();
        bobsAddress = await bob.getAddress();
        Factory__L1ERC721Bridge = await hardhat_1.ethers.getContractFactory('L1ERC721Bridge');
    });
    let L2ERC721Bridge;
    let L2ERC721;
    let Fake__L2CrossDomainMessenger;
    beforeEach(async () => {
        Fake__L2CrossDomainMessenger = await smock_1.smock.fake(await hardhat_1.ethers.getContractFactory('L2CrossDomainMessenger'), { address: await l2MessengerImpersonator.getAddress() });
        L2ERC721Bridge = await (await hardhat_1.ethers.getContractFactory('L2ERC721Bridge')).deploy(Fake__L2CrossDomainMessenger.address, DUMMY_L1BRIDGE_ADDRESS);
        L2ERC721 = await (await hardhat_1.ethers.getContractFactory('L2StandardERC721', alice)).deploy(L2ERC721Bridge.address, DUMMY_L1TOKEN_ADDRESS, 'L2Token', 'L2T');
    });
    describe('finalizeDeposit', () => {
        it('onlyFromCrossDomainAccount: should revert on calls from a non-crossDomainMessenger L2 account', async () => {
            await (0, setup_1.expect)(L2ERC721Bridge.finalizeDeposit(DUMMY_L1TOKEN_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, TOKEN_ID, helpers_1.NON_NULL_BYTES32)).to.be.revertedWith(ERR_INVALID_MESSENGER);
        });
        it('onlyFromCrossDomainAccount: should revert on calls from the right crossDomainMessenger, but wrong xDomainMessageSender (ie. not the L1ERC721Bridge)', async () => {
            Fake__L2CrossDomainMessenger.xDomainMessageSender.returns(helpers_1.NON_ZERO_ADDRESS);
            await (0, setup_1.expect)(L2ERC721Bridge.connect(l2MessengerImpersonator).finalizeDeposit(DUMMY_L1TOKEN_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, helpers_1.NON_ZERO_ADDRESS, TOKEN_ID, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L2CrossDomainMessenger.address,
            })).to.be.revertedWith(ERR_INVALID_X_DOMAIN_MSG_SENDER);
        });
        it('should initialize a withdrawal if the L2 token is not compliant', async () => {
            const NonCompliantERC721 = await (await hardhat_1.ethers.getContractFactory('@openzeppelin/contracts/token/ERC721/ERC721.sol:ERC721')).deploy('L2Token', 'L2T');
            Fake__L2CrossDomainMessenger.xDomainMessageSender.returns(() => DUMMY_L1BRIDGE_ADDRESS);
            await L2ERC721Bridge.connect(l2MessengerImpersonator).finalizeDeposit(DUMMY_L1TOKEN_ADDRESS, NonCompliantERC721.address, aliceAddress, bobsAddress, TOKEN_ID, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L2CrossDomainMessenger.address,
            });
            const withdrawalCallToMessenger = Fake__L2CrossDomainMessenger.sendMessage.getCall(0);
            (0, setup_1.expect)(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS);
            (0, setup_1.expect)(withdrawalCallToMessenger.args[1]).to.equal(Factory__L1ERC721Bridge.interface.encodeFunctionData('finalizeERC721Withdrawal', [
                DUMMY_L1TOKEN_ADDRESS,
                NonCompliantERC721.address,
                bobsAddress,
                aliceAddress,
                TOKEN_ID,
                helpers_1.NON_NULL_BYTES32,
            ]));
            (0, setup_1.expect)(withdrawalCallToMessenger.args[2]).to.equal(0);
        });
        it('should credit funds to the depositor', async () => {
            Fake__L2CrossDomainMessenger.xDomainMessageSender.returns(() => DUMMY_L1BRIDGE_ADDRESS);
            await L2ERC721Bridge.connect(l2MessengerImpersonator).finalizeDeposit(DUMMY_L1TOKEN_ADDRESS, L2ERC721.address, aliceAddress, bobsAddress, TOKEN_ID, helpers_1.NON_NULL_BYTES32, {
                from: Fake__L2CrossDomainMessenger.address,
            });
            const tokenIdOwner = await L2ERC721.ownerOf(TOKEN_ID);
            tokenIdOwner.should.equal(bobsAddress);
        });
    });
    describe('withdrawals', () => {
        let Mock__L2Token;
        beforeEach(async () => {
            Mock__L2Token = await (await smock_1.smock.mock('L2StandardERC721')).deploy(L2ERC721Bridge.address, DUMMY_L1TOKEN_ADDRESS, 'L2Token', 'L2T');
            await Mock__L2Token.setVariable('_owners', {
                [TOKEN_ID]: aliceAddress,
            });
            await Mock__L2Token.setVariable('_balances', {
                [aliceAddress]: ALICE_INITIAL_BALANCE,
            });
        });
        it.only('withdraw() burns and sends the correct withdrawal message', async () => {
            const uri = await Mock__L2Token.tokenURI(TOKEN_ID);
            console.log(uri);
            await L2ERC721Bridge.withdraw(Mock__L2Token.address, TOKEN_ID, 0, helpers_1.NON_NULL_BYTES32);
            const withdrawalCallToMessenger = Fake__L2CrossDomainMessenger.sendMessage.getCall(0);
            const aliceBalance = await Mock__L2Token.balanceOf(aliceAddress);
            (0, setup_1.expect)(aliceBalance).to.equal(ALICE_INITIAL_BALANCE - 1);
            await (0, setup_1.expect)(Mock__L2Token.ownerOf(TOKEN_ID)).to.be.revertedWith("ERC721: owner query for nonexistent token");
            (0, setup_1.expect)(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS);
            (0, setup_1.expect)(withdrawalCallToMessenger.args[1]).to.equal(Factory__L1ERC721Bridge.interface.encodeFunctionData('finalizeERC721Withdrawal', [
                DUMMY_L1TOKEN_ADDRESS,
                Mock__L2Token.address,
                aliceAddress,
                aliceAddress,
                TOKEN_ID,
                helpers_1.NON_NULL_BYTES32,
            ]));
            (0, setup_1.expect)(withdrawalCallToMessenger.args[2]).to.equal(0);
        });
        it('withdrawTo() burns and sends the correct withdrawal message', async () => {
            await L2ERC721Bridge.withdrawTo(Mock__L2Token.address, bobsAddress, TOKEN_ID, 0, helpers_1.NON_NULL_BYTES32);
            const withdrawalCallToMessenger = Fake__L2CrossDomainMessenger.sendMessage.getCall(0);
            const aliceBalance = await Mock__L2Token.balanceOf(aliceAddress);
            (0, setup_1.expect)(aliceBalance).to.equal(ALICE_INITIAL_BALANCE - 1);
            await (0, setup_1.expect)(Mock__L2Token.ownerOf(TOKEN_ID)).to.be.revertedWith("ERC721: owner query for nonexistent token");
            (0, setup_1.expect)(withdrawalCallToMessenger.args[0]).to.equal(DUMMY_L1BRIDGE_ADDRESS);
            (0, setup_1.expect)(withdrawalCallToMessenger.args[1]).to.equal(Factory__L1ERC721Bridge.interface.encodeFunctionData('finalizeERC721Withdrawal', [
                DUMMY_L1TOKEN_ADDRESS,
                Mock__L2Token.address,
                aliceAddress,
                bobsAddress,
                TOKEN_ID,
                helpers_1.NON_NULL_BYTES32,
            ]));
            (0, setup_1.expect)(withdrawalCallToMessenger.args[2]).to.equal(0);
        });
    });
    describe('standard ERC721', () => {
        it('should not allow anyone but the L2 bridge to mint and burn', async () => {
            (0, setup_1.expect)(L2ERC721.connect(alice).mint(aliceAddress, 100)).to.be.revertedWith('Only L2 Bridge can mint and burn');
            (0, setup_1.expect)(L2ERC721.connect(alice).burn(aliceAddress, 100)).to.be.revertedWith('Only L2 Bridge can mint and burn');
        });
        it('should return the correct interface support', async () => {
            const supportsERC165 = await L2ERC721.supportsInterface(0x01ffc9a7);
            (0, setup_1.expect)(supportsERC165).to.be.true;
            const supportsL2TokenInterface = await L2ERC721.supportsInterface(0x1d1d8b63);
            (0, setup_1.expect)(supportsL2TokenInterface).to.be.true;
            const badSupports = await L2ERC721.supportsInterface(0xffffffff);
            (0, setup_1.expect)(badSupports).to.be.false;
        });
    });
});
//# sourceMappingURL=L2ERC721Bridge.spec.js.map