"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const smock_1 = require("@defi-wonderland/smock");
const core_utils_1 = require("@eth-optimism/core-utils");
const helpers_1 = require("../../../helpers");
const setup_1 = require("../../../setup");
const MAX_GAS_LIMIT = 8000000;
const INITIAL_TOTAL_L1_SUPPLY = 5000;
const FINALIZATION_GAS = 1200000;
describe('[GAS BENCHMARK] Depositing via the standard bridge [ @skip-on-coverage ]', () => {
    let sequencer;
    let alice;
    before(async () => {
        ;
        [sequencer, alice] = await hardhat_1.ethers.getSigners();
    });
    let AddressManager;
    before('Deploy address manager and register sequencer', async () => {
        AddressManager = await (0, helpers_1.makeAddressManager)();
        await AddressManager.setAddress('OVM_Sequencer', await sequencer.getAddress());
    });
    let CanonicalTransactionChain;
    let Factory__ChainStorageContainer;
    before('Init CTC and Storage Container contracts.', async () => {
        CanonicalTransactionChain = await (await hardhat_1.ethers.getContractFactory('CanonicalTransactionChain')).deploy(AddressManager.address, MAX_GAS_LIMIT, helpers_1.L2_GAS_DISCOUNT_DIVISOR, helpers_1.ENQUEUE_GAS_COST);
        Factory__ChainStorageContainer = await hardhat_1.ethers.getContractFactory('ChainStorageContainer');
        const batches = await Factory__ChainStorageContainer.deploy(AddressManager.address, 'CanonicalTransactionChain');
        await Factory__ChainStorageContainer.deploy(AddressManager.address, 'CanonicalTransactionChain');
        await AddressManager.setAddress('ChainStorageContainer-CTC-batches', batches.address);
        await AddressManager.setAddress('CanonicalTransactionChain', CanonicalTransactionChain.address);
    });
    let L1CrossDomainMessenger;
    before('Deploy Messenger proxy and implementation', async () => {
        const xDomainMessengerImpl = await (await hardhat_1.ethers.getContractFactory('L1CrossDomainMessenger')).deploy();
        await AddressManager.setAddress('L1CrossDomainMessenger', xDomainMessengerImpl.address);
        const proxy = await (await hardhat_1.ethers.getContractFactory('Lib_ResolvedDelegateProxy')).deploy(AddressManager.address, 'L1CrossDomainMessenger');
        L1CrossDomainMessenger = xDomainMessengerImpl.attach(proxy.address);
        await L1CrossDomainMessenger.initialize(AddressManager.address);
    });
    let L1ERC20;
    let L1StandardBridge;
    before('Deploy the bridge and setup the token', async () => {
        L1StandardBridge = await (await hardhat_1.ethers.getContractFactory('L1StandardBridge')).deploy();
        await L1StandardBridge.initialize(L1CrossDomainMessenger.address, helpers_1.NON_ZERO_ADDRESS);
        L1ERC20 = await (await smock_1.smock.mock('@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20')).deploy('L1ERC20', 'ERC');
        const aliceAddress = await alice.getAddress();
        await L1ERC20.setVariable('_totalSupply', INITIAL_TOTAL_L1_SUPPLY);
        await L1ERC20.setVariable('_balances', {
            [aliceAddress]: INITIAL_TOTAL_L1_SUPPLY,
        });
    });
    describe('[GAS BENCHMARK] L1 to L2 Deposit costs [ @skip-on-coverage ]', async () => {
        const depositAmount = 1000;
        before(async () => {
            await CanonicalTransactionChain.enqueue(helpers_1.NON_ZERO_ADDRESS, FINALIZATION_GAS, '0x1234');
        });
        it('cost to deposit ETH', async () => {
            const res = await L1StandardBridge.connect(alice).depositETH(FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32, {
                value: depositAmount,
            });
            const receipt = await res.wait();
            const gasUsed = receipt.gasUsed.toNumber();
            console.log('    - Gas used:', gasUsed);
            (0, core_utils_1.expectApprox)(gasUsed, 132481, {
                absoluteUpperDeviation: 500,
                percentLowerDeviation: 1,
            });
            (0, setup_1.expect)(await CanonicalTransactionChain.getQueueLength()).to.equal(2);
        });
        it('cost to deposit an ERC20', async () => {
            await L1ERC20.connect(alice).approve(L1StandardBridge.address, depositAmount);
            const res = await L1StandardBridge.connect(alice).depositERC20(L1ERC20.address, helpers_1.NON_ZERO_ADDRESS, depositAmount, FINALIZATION_GAS, helpers_1.NON_NULL_BYTES32);
            const receipt = await res.wait();
            const gasUsed = receipt.gasUsed.toNumber();
            console.log('    - Gas used:', gasUsed);
            (0, core_utils_1.expectApprox)(gasUsed, 192822, {
                absoluteUpperDeviation: 500,
                percentLowerDeviation: 1,
            });
            (0, setup_1.expect)(await CanonicalTransactionChain.getQueueLength()).to.equal(3);
        });
    });
});
//# sourceMappingURL=deposit.gas.spec.js.map