"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IL1ChugSplashDeployer__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "isUpgrading",
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
class IL1ChugSplashDeployer__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IL1ChugSplashDeployer__factory = IL1ChugSplashDeployer__factory;
IL1ChugSplashDeployer__factory.abi = _abi;
//# sourceMappingURL=IL1ChugSplashDeployer__factory.js.map