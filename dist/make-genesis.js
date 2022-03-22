"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeL2GenesisFile = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const ethers_1 = require("ethers");
const utils_1 = require("@defi-wonderland/smock/dist/src/utils");
const core_utils_1 = require("@eth-optimism/core-utils");
const predeploys_1 = require("./predeploys");
const contract_artifacts_1 = require("./contract-artifacts");
const makeL2GenesisFile = async (cfg) => {
    for (const [key, val] of Object.entries(cfg)) {
        if (val === undefined) {
            throw new Error(`must provide an input for config value: ${key}`);
        }
    }
    const variables = {
        OVM_DeployerWhitelist: {
            owner: cfg.whitelistOwner,
        },
        OVM_GasPriceOracle: {
            _owner: cfg.gasPriceOracleOwner,
            gasPrice: cfg.gasPriceOracleGasPrice,
            l1BaseFee: cfg.gasPriceOracleL1BaseFee,
            overhead: cfg.gasPriceOracleOverhead,
            scalar: cfg.gasPriceOracleScalar,
            decimals: cfg.gasPriceOracleDecimals,
        },
        L2StandardBridge: {
            l1TokenBridge: cfg.l1StandardBridgeAddress,
            messenger: predeploys_1.predeploys.L2CrossDomainMessenger,
        },
        OVM_SequencerFeeVault: {
            l1FeeWallet: cfg.l1FeeWalletAddress,
        },
        OVM_ETH: {
            l2Bridge: predeploys_1.predeploys.L2StandardBridge,
            l1Token: ethers_1.ethers.constants.AddressZero,
            _name: 'Ether',
            _symbol: 'ETH',
        },
        L2CrossDomainMessenger: {
            xDomainMsgSender: '0x000000000000000000000000000000000000dEaD',
            l1CrossDomainMessenger: cfg.l1CrossDomainMessengerAddress,
            messageNonce: 100000,
        },
        WETH9: {
            name: 'Wrapped Ether',
            symbol: 'WETH',
            decimals: 18,
        },
    };
    const dump = {};
    for (const predeployName of Object.keys(predeploys_1.predeploys)) {
        const predeployAddress = predeploys_1.predeploys[predeployName];
        dump[predeployAddress] = {
            balance: '00',
            storage: {},
        };
        if (predeployName === 'OVM_L1BlockNumber') {
            dump[predeployAddress].code = '0x4B60005260206000F3';
        }
        else {
            const artifact = (0, contract_artifacts_1.getContractArtifact)(predeployName);
            dump[predeployAddress].code = artifact.deployedBytecode;
        }
        if (predeployName in variables) {
            const storageLayout = await (0, utils_1.getStorageLayout)(predeployName);
            const slots = (0, utils_1.computeStorageSlots)(storageLayout, variables[predeployName]);
            for (const slot of slots) {
                dump[predeployAddress].storage[slot.key] = slot.val;
            }
        }
    }
    let commit;
    try {
        const { stdout } = await (0, util_1.promisify)(child_process_1.exec)('git rev-parse HEAD');
        commit = stdout.replace('\n', '');
    }
    catch (_a) {
        console.log('unable to get commit hash, using empty hash instead');
        commit = '0000000000000000000000000000000000000000';
    }
    return {
        commit,
        config: {
            chainId: cfg.l2ChainId,
            homesteadBlock: 0,
            eip150Block: 0,
            eip155Block: 0,
            eip158Block: 0,
            byzantiumBlock: 0,
            constantinopleBlock: 0,
            petersburgBlock: 0,
            istanbulBlock: 0,
            muirGlacierBlock: 0,
            berlinBlock: cfg.berlinBlock,
            clique: {
                period: 0,
                epoch: 30000,
            },
        },
        difficulty: '1',
        gasLimit: cfg.l2BlockGasLimit.toString(10),
        extradata: '0x' +
            '00'.repeat(32) +
            (0, core_utils_1.remove0x)(cfg.blockSignerAddress) +
            '00'.repeat(65),
        alloc: dump,
    };
};
exports.makeL2GenesisFile = makeL2GenesisFile;
//# sourceMappingURL=make-genesis.js.map