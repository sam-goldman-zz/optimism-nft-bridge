import { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface TestLibRLPReaderInterface extends utils.Interface {
    functions: {
        "readAddress(bytes)": FunctionFragment;
        "readBool(bytes)": FunctionFragment;
        "readBytes(bytes)": FunctionFragment;
        "readBytes32(bytes)": FunctionFragment;
        "readList(bytes)": FunctionFragment;
        "readString(bytes)": FunctionFragment;
        "readUint256(bytes)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "readAddress", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "readBool", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "readBytes", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "readBytes32", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "readList", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "readString", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "readUint256", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "readAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readBool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readBytes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readBytes32", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readList", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readString", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readUint256", data: BytesLike): Result;
    events: {};
}
export interface TestLibRLPReader extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestLibRLPReaderInterface;
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
        readAddress(_in: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        readBool(_in: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        readBytes(_in: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        readBytes32(_in: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        readList(_in: BytesLike, overrides?: CallOverrides): Promise<[string[]]>;
        readString(_in: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        readUint256(_in: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    readAddress(_in: BytesLike, overrides?: CallOverrides): Promise<string>;
    readBool(_in: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    readBytes(_in: BytesLike, overrides?: CallOverrides): Promise<string>;
    readBytes32(_in: BytesLike, overrides?: CallOverrides): Promise<string>;
    readList(_in: BytesLike, overrides?: CallOverrides): Promise<string[]>;
    readString(_in: BytesLike, overrides?: CallOverrides): Promise<string>;
    readUint256(_in: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        readAddress(_in: BytesLike, overrides?: CallOverrides): Promise<string>;
        readBool(_in: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        readBytes(_in: BytesLike, overrides?: CallOverrides): Promise<string>;
        readBytes32(_in: BytesLike, overrides?: CallOverrides): Promise<string>;
        readList(_in: BytesLike, overrides?: CallOverrides): Promise<string[]>;
        readString(_in: BytesLike, overrides?: CallOverrides): Promise<string>;
        readUint256(_in: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        readAddress(_in: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        readBool(_in: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        readBytes(_in: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        readBytes32(_in: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        readList(_in: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        readString(_in: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        readUint256(_in: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        readAddress(_in: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        readBool(_in: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        readBytes(_in: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        readBytes32(_in: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        readList(_in: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        readString(_in: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        readUint256(_in: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}