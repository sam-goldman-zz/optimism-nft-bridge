"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IBondManager__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_who",
                type: "address",
            },
        ],
        name: "isCollateralized",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IBondManager__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IBondManager__factory = IBondManager__factory;
IBondManager__factory.abi = _abi;
//# sourceMappingURL=IBondManager__factory.js.map