"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibAddressResolver__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "libAddressManager",
        outputs: [
            {
                internalType: "contract Lib_AddressManager",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_name",
                type: "string",
            },
        ],
        name: "resolve",
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
class LibAddressResolver__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.LibAddressResolver__factory = LibAddressResolver__factory;
LibAddressResolver__factory.abi = _abi;
//# sourceMappingURL=LibAddressResolver__factory.js.map