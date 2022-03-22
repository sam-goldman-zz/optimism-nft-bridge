"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_utils_1 = require("@eth-optimism/core-utils");
const deploy_utils_1 = require("../src/deploy-utils");
const address_names_1 = require("../src/address-names");
const deployFn = async (hre) => {
    const { deployer } = await hre.getNamedAccounts();
    const AddressDictator = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.unmanaged.AddressDictator, {
        signerOrProvider: deployer,
    });
    const Lib_AddressManager = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.unmanaged.Lib_AddressManager);
    const namedAddresses = await AddressDictator.getNamedAddresses();
    const finalOwner = await AddressDictator.finalOwner();
    const currentOwner = await Lib_AddressManager.owner();
    console.log(`
    The AddressDictator contract (glory to Arstotzka) has been deployed.

    FOLLOW THESE INSTRUCTIONS CAREFULLY!

    (1) Review the Contract Name / Contract Address pairs below and confirm that they match
        the addresses found in the contract artifacts of your current deployment.

    ${namedAddresses
        .map((namedAddress) => {
        const padding = ' '.repeat(40 - namedAddress.name.length);
        return `
        ${namedAddress.name}${padding}  ${namedAddress.addr}
      `;
    })
        .join('\n')}

    (2) Review the CURRENT and FINAL AddressManager owners and verify that these are the expected values:

        Current AddressManager owner: (${currentOwner})
        Final AddressManager owner:   (${finalOwner})

        [${currentOwner === finalOwner
        ? 'THESE ARE THE SAME ADDRESSES'
        : 'THESE ARE >>>NOT<<< THE SAME ADDRESSES'}]

    (3) Transfer ownership of the AddressManager located at (${Lib_AddressManager.address})
        to the AddressDictator contract located at the following address:

        TRANSFER OWNERSHIP TO THE FOLLOWING ADDRESS ONLY:
        >>>>> (${AddressDictator.address}) <<<<<

    (4) Wait for the deploy process to continue.
  `);
    if ((await (0, deploy_utils_1.isHardhatNode)(hre)) ||
        process.env.AUTOMATICALLY_TRANSFER_OWNERSHIP === 'true') {
        const owner = await hre.ethers.getSigner(currentOwner);
        await Lib_AddressManager.connect(owner).transferOwnership(AddressDictator.address);
    }
    await (0, core_utils_1.awaitCondition)(async () => {
        return (0, core_utils_1.hexStringEquals)(await Lib_AddressManager.owner(), AddressDictator.address);
    }, 30000, 1000);
    console.log('Ownership successfully transferred. Invoking setAddresses...');
    await AddressDictator.setAddresses();
    console.log('Verifying final ownership of Lib_AddressManager...');
    await (0, core_utils_1.awaitCondition)(async () => {
        return (0, core_utils_1.hexStringEquals)(await Lib_AddressManager.owner(), finalOwner);
    }, 500, 1000);
};
deployFn.tags = ['set-addresses', 'upgrade'];
exports.default = deployFn;
//# sourceMappingURL=011-set-addresses.js.map