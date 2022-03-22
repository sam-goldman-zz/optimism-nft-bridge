"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OVML2ToL1MessagePasser__factory = void 0;
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
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "sentMessages",
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
const _bytecode = "0x608060405234801561001057600080fd5b506102c8806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806382e3702d1461003b578063cafa81dc14610072575b600080fd5b61005e610049366004610112565b60006020819052908152604090205460ff1681565b604051901515815260200160405180910390f35b61008561008036600461015a565b610087565b005b6001600080833360405160200161009f929190610229565b604080518083037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe001815291815281516020928301208352908201929092520160002080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001691151591909117905550565b60006020828403121561012457600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60006020828403121561016c57600080fd5b813567ffffffffffffffff8082111561018457600080fd5b818401915084601f83011261019857600080fd5b8135818111156101aa576101aa61012b565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156101f0576101f061012b565b8160405282815287602084870101111561020957600080fd5b826020860160208301376000928101602001929092525095945050505050565b6000835160005b8181101561024a5760208187018101518583015201610230565b81811115610259576000828501525b5060609390931b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000016919092019081526014019291505056fea26469706673582212209ffc0b44ce8a27c46cae74a3b3b620a72f10aaea97ed37c15b5d36792abd2aa464736f6c63430008090033";
const isSuperArgs = (xs) => xs.length > 1;
class OVML2ToL1MessagePasser__factory extends ethers_1.ContractFactory {
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
exports.OVML2ToL1MessagePasser__factory = OVML2ToL1MessagePasser__factory;
OVML2ToL1MessagePasser__factory.bytecode = _bytecode;
OVML2ToL1MessagePasser__factory.abi = _abi;
//# sourceMappingURL=OVML2ToL1MessagePasser__factory.js.map