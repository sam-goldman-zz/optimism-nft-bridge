"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICrossDomainMessenger__factory = void 0;
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
class ICrossDomainMessenger__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ICrossDomainMessenger__factory = ICrossDomainMessenger__factory;
ICrossDomainMessenger__factory.abi = _abi;
//# sourceMappingURL=ICrossDomainMessenger__factory.js.map