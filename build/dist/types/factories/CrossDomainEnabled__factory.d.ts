import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CrossDomainEnabled, CrossDomainEnabledInterface } from "../CrossDomainEnabled";
declare type CrossDomainEnabledConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class CrossDomainEnabled__factory extends ContractFactory {
    constructor(...args: CrossDomainEnabledConstructorParams);
    deploy(_messenger: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<CrossDomainEnabled>;
    getDeployTransaction(_messenger: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): CrossDomainEnabled;
    connect(signer: Signer): CrossDomainEnabled__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060405161013d38038061013d83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b60ab806100926000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80633cb747bf14602d575b600080fd5b600054604c9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f3fea2646970667358221220b52471b7729e6fe40a68d7d737ccfb517579a5333f595547ae2e7aade5bd2ab564736f6c63430008090033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: any[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): CrossDomainEnabledInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): CrossDomainEnabled;
}
export {};
