"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IL1ERC721Bridge__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_l1Token",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "_l2Token",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "_from",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "ERC721DepositInitiated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_l1Token",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "_l2Token",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "_from",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "ERC721WithdrawalFinalized",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_l1Token",
                type: "address",
            },
            {
                internalType: "address",
                name: "_l2Token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
            },
            {
                internalType: "uint32",
                name: "_l2Gas",
                type: "uint32",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "depositERC721",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_l1Token",
                type: "address",
            },
            {
                internalType: "address",
                name: "_l2Token",
                type: "address",
            },
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
            },
            {
                internalType: "uint32",
                name: "_l2Gas",
                type: "uint32",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "depositERC721To",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_l1Token",
                type: "address",
            },
            {
                internalType: "address",
                name: "_l2Token",
                type: "address",
            },
            {
                internalType: "address",
                name: "_from",
                type: "address",
            },
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "finalizeERC721Withdrawal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "l2ERC721Bridge",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IL1ERC721Bridge__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IL1ERC721Bridge__factory = IL1ERC721Bridge__factory;
IL1ERC721Bridge__factory.abi = _abi;
//# sourceMappingURL=IL1ERC721Bridge__factory.js.map