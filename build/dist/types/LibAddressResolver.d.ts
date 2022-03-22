import { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface LibAddressResolverInterface extends utils.Interface {
    functions: {
        "libAddressManager()": FunctionFragment;
        "resolve(string)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "libAddressManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "resolve", values: [string]): string;
    decodeFunctionResult(functionFragment: "libAddressManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolve", data: BytesLike): Result;
    events: {};
}
export interface LibAddressResolver extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: LibAddressResolverInterface;
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
        libAddressManager(overrides?: CallOverrides): Promise<[string]>;
        resolve(_name: string, overrides?: CallOverrides): Promise<[string]>;
    };
    libAddressManager(overrides?: CallOverrides): Promise<string>;
    resolve(_name: string, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        libAddressManager(overrides?: CallOverrides): Promise<string>;
        resolve(_name: string, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        libAddressManager(overrides?: CallOverrides): Promise<BigNumber>;
        resolve(_name: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        libAddressManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        resolve(_name: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
