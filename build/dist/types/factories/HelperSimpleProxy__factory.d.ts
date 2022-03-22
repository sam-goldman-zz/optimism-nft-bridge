import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { HelperSimpleProxy, HelperSimpleProxyInterface } from "../HelperSimpleProxy";
declare type HelperSimpleProxyConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class HelperSimpleProxy__factory extends ContractFactory {
    constructor(...args: HelperSimpleProxyConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<HelperSimpleProxy>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): HelperSimpleProxy;
    connect(signer: Signer): HelperSimpleProxy__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610287806100326000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063776d1a0114610084575b60015460408051602036601f81018290048202830182019093528282526100829373ffffffffffffffffffffffffffffffffffffffff16926000918190840183828082843760009201919091525061009792505050565b005b6100826100923660046101d9565b61011c565b6000808373ffffffffffffffffffffffffffffffffffffffff16836040516100bf9190610216565b6000604051808303816000865af19150503d80600081146100fc576040519150601f19603f3d011682016040523d82523d6000602084013e610101565b606091505b5091509150811561011457805160208201f35b805160208201fd5b60005473ffffffffffffffffffffffffffffffffffffffff1633141561017f57600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff831617905550565b60015460408051602036601f81018290048202830182019093528282526101d69373ffffffffffffffffffffffffffffffffffffffff16926000918190840183828082843760009201919091525061009792505050565b50565b6000602082840312156101eb57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461020f57600080fd5b9392505050565b6000825160005b81811015610237576020818601810151858301520161021d565b81811115610246576000828501525b50919091019291505056fea264697066735822122066ac981f3a6ef2f18f93e7bf1dc67c94dbb6cab5480c3870726f5b124f751fe064736f6c63430008090033";
    static readonly abi: ({
        inputs: any[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        stateMutability: string;
        type: string;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: any[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): HelperSimpleProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): HelperSimpleProxy;
}
export {};
