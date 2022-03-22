"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperSimpleProxy__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        stateMutability: "nonpayable",
        type: "fallback",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_target",
                type: "address",
            },
        ],
        name: "setTarget",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610287806100326000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063776d1a0114610084575b60015460408051602036601f81018290048202830182019093528282526100829373ffffffffffffffffffffffffffffffffffffffff16926000918190840183828082843760009201919091525061009792505050565b005b6100826100923660046101d9565b61011c565b6000808373ffffffffffffffffffffffffffffffffffffffff16836040516100bf9190610216565b6000604051808303816000865af19150503d80600081146100fc576040519150601f19603f3d011682016040523d82523d6000602084013e610101565b606091505b5091509150811561011457805160208201f35b805160208201fd5b60005473ffffffffffffffffffffffffffffffffffffffff1633141561017f57600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff831617905550565b60015460408051602036601f81018290048202830182019093528282526101d69373ffffffffffffffffffffffffffffffffffffffff16926000918190840183828082843760009201919091525061009792505050565b50565b6000602082840312156101eb57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461020f57600080fd5b9392505050565b6000825160005b81811015610237576020818601810151858301520161021d565b81811115610246576000828501525b50919091019291505056fea264697066735822122066ac981f3a6ef2f18f93e7bf1dc67c94dbb6cab5480c3870726f5b124f751fe064736f6c63430008090033";
const isSuperArgs = (xs) => xs.length > 1;
class HelperSimpleProxy__factory extends ethers_1.ContractFactory {
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
exports.HelperSimpleProxy__factory = HelperSimpleProxy__factory;
HelperSimpleProxy__factory.bytecode = _bytecode;
HelperSimpleProxy__factory.abi = _abi;
//# sourceMappingURL=HelperSimpleProxy__factory.js.map