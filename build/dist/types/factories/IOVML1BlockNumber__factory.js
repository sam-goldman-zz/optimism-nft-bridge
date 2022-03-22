"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOVML1BlockNumber__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "getL1BlockNumber",
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
];
class IOVML1BlockNumber__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IOVML1BlockNumber__factory = IOVML1BlockNumber__factory;
IOVML1BlockNumber__factory.abi = _abi;
//# sourceMappingURL=IOVML1BlockNumber__factory.js.map