"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOVML2ToL1MessagePasser__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_nonce",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "_sender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "L2ToL1Message",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "_message",
                type: "bytes",
            },
        ],
        name: "passMessageToL1",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IOVML2ToL1MessagePasser__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IOVML2ToL1MessagePasser__factory = IOVML2ToL1MessagePasser__factory;
IOVML2ToL1MessagePasser__factory.abi = _abi;
//# sourceMappingURL=IOVML2ToL1MessagePasser__factory.js.map