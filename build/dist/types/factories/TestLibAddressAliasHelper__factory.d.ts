import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestLibAddressAliasHelper, TestLibAddressAliasHelperInterface } from "../TestLibAddressAliasHelper";
declare type TestLibAddressAliasHelperConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TestLibAddressAliasHelper__factory extends ContractFactory {
    constructor(...args: TestLibAddressAliasHelperConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TestLibAddressAliasHelper>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TestLibAddressAliasHelper;
    connect(signer: Signer): TestLibAddressAliasHelper__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610147806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063689992b31461003b5780637528c2c614610077575b600080fd5b61004e6100493660046100d4565b61008a565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b61004e6100853660046100d4565b6100b6565b60007fffffffffffffffffffffffffeeeeffffffffffffffffffffffffffffffffeeef82015b92915050565b600073111100000000000000000000000000000000111182016100b0565b6000602082840312156100e657600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461010a57600080fd5b939250505056fea26469706673582212201457f8e5542f32e181572128a997cc6ed282c1dc72f41d4fd52b102e52787f8e64736f6c63430008090033";
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
    static createInterface(): TestLibAddressAliasHelperInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TestLibAddressAliasHelper;
}
export {};
