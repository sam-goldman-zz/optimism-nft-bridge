"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IChainStorageContainer__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_index",
                type: "uint256",
            },
            {
                internalType: "bytes27",
                name: "_globalMetadata",
                type: "bytes27",
            },
        ],
        name: "deleteElementsAfterInclusive",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_index",
                type: "uint256",
            },
        ],
        name: "deleteElementsAfterInclusive",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_index",
                type: "uint256",
            },
        ],
        name: "get",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getGlobalMetadata",
        outputs: [
            {
                internalType: "bytes27",
                name: "",
                type: "bytes27",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "length",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "_object",
                type: "bytes32",
            },
            {
                internalType: "bytes27",
                name: "_globalMetadata",
                type: "bytes27",
            },
        ],
        name: "push",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "_object",
                type: "bytes32",
            },
        ],
        name: "push",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes27",
                name: "_globalMetadata",
                type: "bytes27",
            },
        ],
        name: "setGlobalMetadata",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IChainStorageContainer__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IChainStorageContainer__factory = IChainStorageContainer__factory;
IChainStorageContainer__factory.abi = _abi;
//# sourceMappingURL=IChainStorageContainer__factory.js.map