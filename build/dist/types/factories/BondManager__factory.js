"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BondManager__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_libAddressManager",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
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
const _bytecode = "0x608060405234801561001057600080fd5b5060405161048838038061048883398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b6103f5806100936000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806302ad4d2a14610046578063299ca4781461006e578063461a4478146100b3575b600080fd5b61005961005436600461020d565b6100c6565b60405190151581526020015b60405180910390f35b60005461008e9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610065565b61008e6100c1366004610260565b61013b565b60006101066040518060400160405280600c81526020017f4f564d5f50726f706f736572000000000000000000000000000000000000000081525061013b565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16149050919050565b600080546040517fbf40fac100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063bf40fac19061019290859060040161032f565b60206040518083038186803b1580156101aa57600080fd5b505afa1580156101be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e291906103a2565b92915050565b73ffffffffffffffffffffffffffffffffffffffff8116811461020a57600080fd5b50565b60006020828403121561021f57600080fd5b813561022a816101e8565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60006020828403121561027257600080fd5b813567ffffffffffffffff8082111561028a57600080fd5b818401915084601f83011261029e57600080fd5b8135818111156102b0576102b0610231565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156102f6576102f6610231565b8160405282815287602084870101111561030f57600080fd5b826020860160208301376000928101602001929092525095945050505050565b600060208083528351808285015260005b8181101561035c57858101830151858201604001528201610340565b8181111561036e576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b6000602082840312156103b457600080fd5b815161022a816101e856fea264697066735822122087d4cb97cd5a4456c2b8ab23d1374b6ac6874a5b854a207714f5b3768ca6d73a64736f6c63430008090033";
const isSuperArgs = (xs) => xs.length > 1;
class BondManager__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(_libAddressManager, overrides) {
        return super.deploy(_libAddressManager, overrides || {});
    }
    getDeployTransaction(_libAddressManager, overrides) {
        return super.getDeployTransaction(_libAddressManager, overrides || {});
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
exports.BondManager__factory = BondManager__factory;
BondManager__factory.bytecode = _bytecode;
BondManager__factory.abi = _abi;
//# sourceMappingURL=BondManager__factory.js.map