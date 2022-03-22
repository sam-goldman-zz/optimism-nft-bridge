import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface TestLibBytesUtilsInterface extends utils.Interface {
    functions: {
        "concat(bytes,bytes)": FunctionFragment;
        "equal(bytes,bytes)": FunctionFragment;
        "fromNibbles(bytes)": FunctionFragment;
        "slice(bytes,uint256,uint256)": FunctionFragment;
        "sliceWithTaintedMemory(bytes,uint256,uint256)": FunctionFragment;
        "toBytes32(bytes)": FunctionFragment;
        "toNibbles(bytes)": FunctionFragment;
        "toUint256(bytes)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "concat", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "equal", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "fromNibbles", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "slice", values: [BytesLike, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "sliceWithTaintedMemory", values: [BytesLike, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "toBytes32", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "toNibbles", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "toUint256", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "concat", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "equal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fromNibbles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "slice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sliceWithTaintedMemory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toBytes32", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toNibbles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toUint256", data: BytesLike): Result;
    events: {};
}
export interface TestLibBytesUtils extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestLibBytesUtilsInterface;
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
        concat(_preBytes: BytesLike, _postBytes: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        equal(_bytes: BytesLike, _other: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        fromNibbles(_bytes: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        slice(_bytes: BytesLike, _start: BigNumberish, _length: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        sliceWithTaintedMemory(_bytes: BytesLike, _start: BigNumberish, _length: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        toBytes32(_bytes: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        toNibbles(_bytes: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        toUint256(_bytes: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    concat(_preBytes: BytesLike, _postBytes: BytesLike, overrides?: CallOverrides): Promise<string>;
    equal(_bytes: BytesLike, _other: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    fromNibbles(_bytes: BytesLike, overrides?: CallOverrides): Promise<string>;
    slice(_bytes: BytesLike, _start: BigNumberish, _length: BigNumberish, overrides?: CallOverrides): Promise<string>;
    sliceWithTaintedMemory(_bytes: BytesLike, _start: BigNumberish, _length: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    toBytes32(_bytes: BytesLike, overrides?: CallOverrides): Promise<string>;
    toNibbles(_bytes: BytesLike, overrides?: CallOverrides): Promise<string>;
    toUint256(_bytes: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        concat(_preBytes: BytesLike, _postBytes: BytesLike, overrides?: CallOverrides): Promise<string>;
        equal(_bytes: BytesLike, _other: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        fromNibbles(_bytes: BytesLike, overrides?: CallOverrides): Promise<string>;
        slice(_bytes: BytesLike, _start: BigNumberish, _length: BigNumberish, overrides?: CallOverrides): Promise<string>;
        sliceWithTaintedMemory(_bytes: BytesLike, _start: BigNumberish, _length: BigNumberish, overrides?: CallOverrides): Promise<string>;
        toBytes32(_bytes: BytesLike, overrides?: CallOverrides): Promise<string>;
        toNibbles(_bytes: BytesLike, overrides?: CallOverrides): Promise<string>;
        toUint256(_bytes: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        concat(_preBytes: BytesLike, _postBytes: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        equal(_bytes: BytesLike, _other: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        fromNibbles(_bytes: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        slice(_bytes: BytesLike, _start: BigNumberish, _length: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        sliceWithTaintedMemory(_bytes: BytesLike, _start: BigNumberish, _length: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        toBytes32(_bytes: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        toNibbles(_bytes: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        toUint256(_bytes: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        concat(_preBytes: BytesLike, _postBytes: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        equal(_bytes: BytesLike, _other: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        fromNibbles(_bytes: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        slice(_bytes: BytesLike, _start: BigNumberish, _length: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        sliceWithTaintedMemory(_bytes: BytesLike, _start: BigNumberish, _length: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        toBytes32(_bytes: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        toNibbles(_bytes: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        toUint256(_bytes: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}