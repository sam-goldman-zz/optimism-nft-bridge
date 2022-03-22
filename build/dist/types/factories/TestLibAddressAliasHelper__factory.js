"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestLibAddressAliasHelper__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "applyL1ToL2Alias",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "undoL1ToL2Alias",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50610147806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063689992b31461003b5780637528c2c614610077575b600080fd5b61004e6100493660046100d4565b61008a565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b61004e6100853660046100d4565b6100b6565b60007fffffffffffffffffffffffffeeeeffffffffffffffffffffffffffffffffeeef82015b92915050565b600073111100000000000000000000000000000000111182016100b0565b6000602082840312156100e657600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461010a57600080fd5b939250505056fea26469706673582212201457f8e5542f32e181572128a997cc6ed282c1dc72f41d4fd52b102e52787f8e64736f6c63430008090033";
const isSuperArgs = (xs) => xs.length > 1;
class TestLibAddressAliasHelper__factory extends ethers_1.ContractFactory {
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
exports.TestLibAddressAliasHelper__factory = TestLibAddressAliasHelper__factory;
TestLibAddressAliasHelper__factory.bytecode = _bytecode;
TestLibAddressAliasHelper__factory.abi = _abi;
//# sourceMappingURL=TestLibAddressAliasHelper__factory.js.map