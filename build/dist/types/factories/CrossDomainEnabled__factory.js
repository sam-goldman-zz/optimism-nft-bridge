"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossDomainEnabled__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_messenger",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "messenger",
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161013d38038061013d83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b60ab806100926000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80633cb747bf14602d575b600080fd5b600054604c9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f3fea2646970667358221220b52471b7729e6fe40a68d7d737ccfb517579a5333f595547ae2e7aade5bd2ab564736f6c63430008090033";
const isSuperArgs = (xs) => xs.length > 1;
class CrossDomainEnabled__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_messenger, overrides) {
        return super.deploy(_messenger, overrides || {});
    }
    getDeployTransaction(_messenger, overrides) {
        return super.getDeployTransaction(_messenger, overrides || {});
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
exports.CrossDomainEnabled__factory = CrossDomainEnabled__factory;
CrossDomainEnabled__factory.bytecode = _bytecode;
CrossDomainEnabled__factory.abi = _abi;
//# sourceMappingURL=CrossDomainEnabled__factory.js.map