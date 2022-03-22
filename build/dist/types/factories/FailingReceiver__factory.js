"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailingReceiver__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x6080604052348015600f57600080fd5b5060a98061001e6000396000f3fe608060405236606e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4661696c696e6752656365697665720000000000000000000000000000000000604482015260640160405180910390fd5b600080fdfea264697066735822122093dadd9a0eaea3eec12c80574f204b2b5c9c04b606f667740911c8a5735a459864736f6c63430008090033";
const isSuperArgs = (xs) => xs.length > 1;
class FailingReceiver__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.FailingReceiver__factory = FailingReceiver__factory;
FailingReceiver__factory.bytecode = _bytecode;
FailingReceiver__factory.abi = _abi;
//# sourceMappingURL=FailingReceiver__factory.js.map