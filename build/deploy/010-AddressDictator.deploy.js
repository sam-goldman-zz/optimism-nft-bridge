"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_utils_1 = require("@eth-optimism/core-utils");
const deploy_utils_1 = require("../src/deploy-utils");
const address_names_1 = require("../src/address-names");
const predeploys_1 = require("../src/predeploys");
const deployFn = async (hre) => {
    const Lib_AddressManager = await (0, deploy_utils_1.getContractFromArtifact)(hre, address_names_1.names.unmanaged.Lib_AddressManager);
    let namesAndAddresses = await Promise.all(Object.values(address_names_1.names.managed.contracts).map(async (name) => {
        return {
            name,
            address: (await (0, deploy_utils_1.getContractFromArtifact)(hre, name)).address,
        };
    }));
    namesAndAddresses = [
        ...namesAndAddresses,
        {
            name: 'L2CrossDomainMessenger',
            address: predeploys_1.predeploys.L2CrossDomainMessenger,
        },
        {
            name: address_names_1.names.managed.accounts.OVM_Sequencer,
            address: hre.deployConfig.ovmSequencerAddress,
        },
        {
            name: address_names_1.names.managed.accounts.OVM_Proposer,
            address: hre.deployConfig.ovmProposerAddress,
        },
    ];
    const existingAddresses = {};
    for (const pair of namesAndAddresses) {
        existingAddresses[pair.name] = await Lib_AddressManager.getAddress(pair.name);
    }
    namesAndAddresses = namesAndAddresses.filter(({ name, address }) => {
        return !(0, core_utils_1.hexStringEquals)(existingAddresses[name], address);
    });
    await (0, deploy_utils_1.deployAndVerifyAndThen)({
        hre,
        name: address_names_1.names.unmanaged.AddressDictator,
        args: [
            Lib_AddressManager.address,
            hre.deployConfig.ovmAddressManagerOwner,
            namesAndAddresses.map((pair) => {
                return pair.name;
            }),
            namesAndAddresses.map((pair) => {
                return pair.address;
            }),
        ],
    });
};
deployFn.tags = ['upgrade', 'AddressDictator'];
exports.default = deployFn;
//# sourceMappingURL=010-AddressDictator.deploy.js.map