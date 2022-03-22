import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ChainStorageContainerInterface extends utils.Interface {
    functions: {
        "deleteElementsAfterInclusive(uint256,bytes27)": FunctionFragment;
        "get(uint256)": FunctionFragment;
        "getGlobalMetadata()": FunctionFragment;
        "length()": FunctionFragment;
        "libAddressManager()": FunctionFragment;
        "owner()": FunctionFragment;
        "push(bytes32,bytes27)": FunctionFragment;
        "resolve(string)": FunctionFragment;
        "setGlobalMetadata(bytes27)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "deleteElementsAfterInclusive", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "get", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getGlobalMetadata", values?: undefined): string;
    encodeFunctionData(functionFragment: "length", values?: undefined): string;
    encodeFunctionData(functionFragment: "libAddressManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "push", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "resolve", values: [string]): string;
    encodeFunctionData(functionFragment: "setGlobalMetadata", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "deleteElementsAfterInclusive", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getGlobalMetadata", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "length", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "libAddressManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "push", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setGlobalMetadata", data: BytesLike): Result;
    events: {};
}
export interface ChainStorageContainer extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ChainStorageContainerInterface;
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
        "deleteElementsAfterInclusive(uint256,bytes27)"(_index: BigNumberish, _globalMetadata: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        "deleteElementsAfterInclusive(uint256)"(_index: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        get(_index: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        getGlobalMetadata(overrides?: CallOverrides): Promise<[string]>;
        length(overrides?: CallOverrides): Promise<[BigNumber]>;
        libAddressManager(overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        "push(bytes32,bytes27)"(_object: BytesLike, _globalMetadata: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        "push(bytes32)"(_object: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        resolve(_name: string, overrides?: CallOverrides): Promise<[string]>;
        setGlobalMetadata(_globalMetadata: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    "deleteElementsAfterInclusive(uint256,bytes27)"(_index: BigNumberish, _globalMetadata: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    "deleteElementsAfterInclusive(uint256)"(_index: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    get(_index: BigNumberish, overrides?: CallOverrides): Promise<string>;
    getGlobalMetadata(overrides?: CallOverrides): Promise<string>;
    length(overrides?: CallOverrides): Promise<BigNumber>;
    libAddressManager(overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    "push(bytes32,bytes27)"(_object: BytesLike, _globalMetadata: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    "push(bytes32)"(_object: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    resolve(_name: string, overrides?: CallOverrides): Promise<string>;
    setGlobalMetadata(_globalMetadata: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        "deleteElementsAfterInclusive(uint256,bytes27)"(_index: BigNumberish, _globalMetadata: BytesLike, overrides?: CallOverrides): Promise<void>;
        "deleteElementsAfterInclusive(uint256)"(_index: BigNumberish, overrides?: CallOverrides): Promise<void>;
        get(_index: BigNumberish, overrides?: CallOverrides): Promise<string>;
        getGlobalMetadata(overrides?: CallOverrides): Promise<string>;
        length(overrides?: CallOverrides): Promise<BigNumber>;
        libAddressManager(overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        "push(bytes32,bytes27)"(_object: BytesLike, _globalMetadata: BytesLike, overrides?: CallOverrides): Promise<void>;
        "push(bytes32)"(_object: BytesLike, overrides?: CallOverrides): Promise<void>;
        resolve(_name: string, overrides?: CallOverrides): Promise<string>;
        setGlobalMetadata(_globalMetadata: BytesLike, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        "deleteElementsAfterInclusive(uint256,bytes27)"(_index: BigNumberish, _globalMetadata: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        "deleteElementsAfterInclusive(uint256)"(_index: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        get(_index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getGlobalMetadata(overrides?: CallOverrides): Promise<BigNumber>;
        length(overrides?: CallOverrides): Promise<BigNumber>;
        libAddressManager(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        "push(bytes32,bytes27)"(_object: BytesLike, _globalMetadata: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        "push(bytes32)"(_object: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        resolve(_name: string, overrides?: CallOverrides): Promise<BigNumber>;
        setGlobalMetadata(_globalMetadata: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        "deleteElementsAfterInclusive(uint256,bytes27)"(_index: BigNumberish, _globalMetadata: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        "deleteElementsAfterInclusive(uint256)"(_index: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        get(_index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getGlobalMetadata(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        length(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        libAddressManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "push(bytes32,bytes27)"(_object: BytesLike, _globalMetadata: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        "push(bytes32)"(_object: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        resolve(_name: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setGlobalMetadata(_globalMetadata: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}