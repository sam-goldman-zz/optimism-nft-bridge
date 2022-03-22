import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { FailingReceiver, FailingReceiverInterface } from "../FailingReceiver";
declare type FailingReceiverConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class FailingReceiver__factory extends ContractFactory {
    constructor(...args: FailingReceiverConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<FailingReceiver>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): FailingReceiver;
    connect(signer: Signer): FailingReceiver__factory;
    static readonly bytecode = "0x6080604052348015600f57600080fd5b5060a98061001e6000396000f3fe608060405236606e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4661696c696e6752656365697665720000000000000000000000000000000000604482015260640160405180910390fd5b600080fdfea264697066735822122093dadd9a0eaea3eec12c80574f204b2b5c9c04b606f667740911c8a5735a459864736f6c63430008090033";
    static readonly abi: {
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): FailingReceiverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): FailingReceiver;
}
export {};
