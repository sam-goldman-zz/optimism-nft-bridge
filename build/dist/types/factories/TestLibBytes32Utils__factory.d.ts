import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestLibBytes32Utils, TestLibBytes32UtilsInterface } from "../TestLibBytes32Utils";
declare type TestLibBytes32UtilsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TestLibBytes32Utils__factory extends ContractFactory {
    constructor(...args: TestLibBytes32UtilsConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TestLibBytes32Utils>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TestLibBytes32Utils;
    connect(signer: Signer): TestLibBytes32Utils__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506101ea806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063341f6623146100515780638f03f7fd1461008e578063934e03a4146100af578063b72e717d146100d2575b600080fd5b61006461005f36600461013c565b6100e5565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100a161009c366004610155565b6100ef565b604051908152602001610085565b6100c26100bd36600461013c565b6100fa565b6040519015158152602001610085565b6100a16100e036600461017e565b610104565b6000815b92915050565b60006100e982610122565b60008115156100e9565b600073ffffffffffffffffffffffffffffffffffffffff82166100e9565b600081610130576000610133565b60015b60ff1692915050565b60006020828403121561014e57600080fd5b5035919050565b60006020828403121561016757600080fd5b8135801515811461017757600080fd5b9392505050565b60006020828403121561019057600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461017757600080fdfea264697066735822122023d0fcf220a19838726dcbb6e91624b5d0b776a452b4288059f0c18acb176e9564736f6c63430008090033";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): TestLibBytes32UtilsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TestLibBytes32Utils;
}
export {};