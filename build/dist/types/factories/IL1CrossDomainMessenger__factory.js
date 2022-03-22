"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IL1CrossDomainMessenger__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "msgHash",
                type: "bytes32",
            },
        ],
        name: "FailedRelayedMessage",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "msgHash",
                type: "bytes32",
            },
        ],
        name: "RelayedMessage",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "target",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "message",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "messageNonce",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "gasLimit",
                type: "uint256",
            },
        ],
        name: "SentMessage",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_target",
                type: "address",
            },
            {
                internalType: "address",
                name: "_sender",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "_message",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "_messageNonce",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "bytes32",
                        name: "stateRoot",
                        type: "bytes32",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "batchIndex",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "batchRoot",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "batchSize",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "prevTotalElements",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes",
                                name: "extraData",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Lib_OVMCodec.ChainBatchHeader",
                        name: "stateRootBatchHeader",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "index",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32[]",
                                name: "siblings",
                                type: "bytes32[]",
                            },
                        ],
                        internalType: "struct Lib_OVMCodec.ChainInclusionProof",
                        name: "stateRootProof",
                        type: "tuple",
                    },
                    {
                        internalType: "bytes",
                        name: "stateTrieWitness",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "storageTrieWitness",
                        type: "bytes",
                    },
                ],
                internalType: "struct IL1CrossDomainMessenger.L2MessageInclusionProof",
                name: "_proof",
                type: "tuple",
            },
        ],
        name: "relayMessage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_target",
                type: "address",
            },
            {
                internalType: "address",
                name: "_sender",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "_message",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "_queueIndex",
                type: "uint256",
            },
            {
                internalType: "uint32",
                name: "_oldGasLimit",
                type: "uint32",
            },
            {
                internalType: "uint32",
                name: "_newGasLimit",
                type: "uint32",
            },
        ],
        name: "replayMessage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_target",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "_message",
                type: "bytes",
            },
            {
                internalType: "uint32",
                name: "_gasLimit",
                type: "uint32",
            },
        ],
        name: "sendMessage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "xDomainMessageSender",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IL1CrossDomainMessenger__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IL1CrossDomainMessenger__factory = IL1CrossDomainMessenger__factory;
IL1CrossDomainMessenger__factory.abi = _abi;
//# sourceMappingURL=IL1CrossDomainMessenger__factory.js.map