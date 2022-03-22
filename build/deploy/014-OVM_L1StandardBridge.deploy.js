"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const core_utils_1 = require("@eth-optimism/core-utils");
const contract_defs_1 = require("../src/contract-defs");
const deploy_utils_1 = require("../src/deploy-utils");
const address_names_1 = require("../src/address-names");
const deployFn = async (hre) => {
    const { deployer } = await hre.getNamedAccounts();
    const ChugSplashDictator = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.unmanaged.ChugSplashDictator, {
        signerOrProvider: deployer,
    });
    const Proxy__OVM_L1StandardBridge = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.managed.contracts.Proxy__OVM_L1StandardBridge, {
        iface: 'L1ChugSplashProxy',
        signerOrProvider: deployer,
    });
    const bridgeArtifact = (0, contract_defs_1.getContractDefinition)('L1StandardBridge');
    const bridgeCode = bridgeArtifact.deployedBytecode;
    const codeHash = await ChugSplashDictator.codeHash();
    if (ethers_1.ethers.utils.keccak256(bridgeCode) !== codeHash) {
        throw new Error('code hash does not match actual bridge code');
    }
    const currentOwner = await Proxy__OVM_L1StandardBridge.connect(Proxy__OVM_L1StandardBridge.signer.provider).callStatic.getOwner({
        from: ethers_1.ethers.constants.AddressZero,
    });
    const finalOwner = await ChugSplashDictator.finalOwner();
    const messengerSlotKey = await ChugSplashDictator.messengerSlotKey();
    const messengerSlotVal = await ChugSplashDictator.messengerSlotVal();
    const bridgeSlotKey = await ChugSplashDictator.bridgeSlotKey();
    const bridgeSlotVal = await ChugSplashDictator.bridgeSlotVal();
    console.log(`
    The ChugSplashDictator contract (glory to Arstotzka) has been deployed.

    FOLLOW THESE INSTRUCTIONS CAREFULLY!

    (1) Review the storage key/value pairs below and make sure they match the expected values:

        ${messengerSlotKey}:   ${messengerSlotVal}
        ${bridgeSlotKey}:   ${bridgeSlotVal}

    (2) Review the CURRENT and FINAL proxy owners and verify that these are the expected values:

        Current proxy owner: (${currentOwner})
        Final proxy owner:   (${finalOwner})

        [${currentOwner === finalOwner
        ? 'THESE ARE THE SAME ADDRESSES'
        : 'THESE ARE >>>NOT<<< THE SAME ADDRESSES'}]

    (3) Transfer ownership of the L1ChugSplashProxy located at (${Proxy__OVM_L1StandardBridge.address})
        to the ChugSplashDictator contract located at the following address:

        TRANSFER OWNERSHIP TO THE FOLLOWING ADDRESS ONLY:
        >>>>> (${ChugSplashDictator.address}) <<<<<

    (4) Wait for the deploy process to continue.
  `);
    if ((await (0, deploy_utils_1.isHardhatNode)(hre)) ||
        process.env.AUTOMATICALLY_TRANSFER_OWNERSHIP === 'true') {
        const owner = await hre.ethers.getSigner(currentOwner);
        await Proxy__OVM_L1StandardBridge.connect(owner).setOwner(ChugSplashDictator.address);
    }
    await (0, core_utils_1.awaitCondition)(async () => {
        return (0, core_utils_1.hexStringEquals)(await Proxy__OVM_L1StandardBridge.connect(Proxy__OVM_L1StandardBridge.signer.provider).callStatic.getOwner({
            from: ethers_1.ethers.constants.AddressZero,
        }), ChugSplashDictator.address);
    }, 30000, 1000);
    console.log('Ownership successfully transferred. Invoking doActions...');
    await ChugSplashDictator.doActions(bridgeCode);
    console.log(`Confirming that owner address was correctly set...`);
    await (0, core_utils_1.awaitCondition)(async () => {
        return (0, core_utils_1.hexStringEquals)(await Proxy__OVM_L1StandardBridge.connect(Proxy__OVM_L1StandardBridge.signer.provider).callStatic.getOwner({
            from: ethers_1.ethers.constants.AddressZero,
        }), finalOwner);
    }, 5000, 100);
    console.log(`Deploying a copy of the bridge for Etherscan verification...`);
    await (0, deploy_utils_1.deployAndVerifyAndThen)({
        hre,
        name: 'L1StandardBridge_for_verification_only',
        contract: 'L1StandardBridge',
        args: [],
    });
};
deployFn.tags = ['L1StandardBridge', 'upgrade'];
exports.default = deployFn;
//# sourceMappingURL=014-OVM_L1StandardBridge.deploy.js.map