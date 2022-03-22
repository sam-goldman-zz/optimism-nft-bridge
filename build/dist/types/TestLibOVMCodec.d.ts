import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type TransactionStruct = {
    timestamp: BigNumberish;
    blockNumber: BigNumberish;
    l1QueueOrigin: BigNumberish;
    l1TxOrigin: string;
    entrypoint: string;
    gasLimit: BigNumberish;
    data: BytesLike;
};
export declare type TransactionStructOutput = [
    BigNumber,
    BigNumber,
    number,
    string,
    string,
    BigNumber,
    string
] & {
    timestamp: BigNumber;
    blockNumber: BigNumber;
    l1QueueOrigin: number;
    l1TxOrigin: string;
    entrypoint: string;
    gasLimit: BigNumber;
    data: string;
};
export interface TestLibOVMCodecInterface extends utils.Interface {
    functions: {
        "encodeTransaction((uint256,uint256,uint8,address,address,uint256,bytes))": FunctionFragment;
        "hashTransaction((uint256,uint256,uint8,address,address,uint256,bytes))": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "encodeTransaction", values: [TransactionStruct]): string;
    encodeFunctionData(functionFragment: "hashTransaction", values: [TransactionStruct]): string;
    decodeFunctionResult(functionFragment: "encodeTransaction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hashTransaction", data: BytesLike): Result;
    events: {};
}
export interface TestLibOVMCodec extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestLibOVMCodecInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        encodeTransaction(_transaction: TransactionStruct, overrides?: CallOverrides): Promise<[string] & {
            _encoded: string;
        }>;
        hashTransaction(_transaction: TransactionStruct, overrides?: CallOverrides): Promise<[string] & {
            _hash: string;
        }>;
    };
    encodeTransaction(_transaction: TransactionStruct, overrides?: CallOverrides): Promise<string>;
    hashTransaction(_transaction: TransactionStruct, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        encodeTransaction(_transaction: TransactionStruct, overrides?: CallOverrides): Promise<string>;
        hashTransaction(_transaction: TransactionStruct, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        encodeTransaction(_transaction: TransactionStruct, overrides?: CallOverrides): Promise<BigNumber>;
        hashTransaction(_transaction: TransactionStruct, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        encodeTransaction(_transaction: TransactionStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hashTransaction(_transaction: TransactionStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
