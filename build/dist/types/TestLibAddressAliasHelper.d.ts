import { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface TestLibAddressAliasHelperInterface extends utils.Interface {
    functions: {
        "applyL1ToL2Alias(address)": FunctionFragment;
        "undoL1ToL2Alias(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "applyL1ToL2Alias", values: [string]): string;
    encodeFunctionData(functionFragment: "undoL1ToL2Alias", values: [string]): string;
    decodeFunctionResult(functionFragment: "applyL1ToL2Alias", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "undoL1ToL2Alias", data: BytesLike): Result;
    events: {};
}
export interface TestLibAddressAliasHelper extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestLibAddressAliasHelperInterface;
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
        applyL1ToL2Alias(_address: string, overrides?: CallOverrides): Promise<[string]>;
        undoL1ToL2Alias(_address: string, overrides?: CallOverrides): Promise<[string]>;
    };
    applyL1ToL2Alias(_address: string, overrides?: CallOverrides): Promise<string>;
    undoL1ToL2Alias(_address: string, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        applyL1ToL2Alias(_address: string, overrides?: CallOverrides): Promise<string>;
        undoL1ToL2Alias(_address: string, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        applyL1ToL2Alias(_address: string, overrides?: CallOverrides): Promise<BigNumber>;
        undoL1ToL2Alias(_address: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        applyL1ToL2Alias(_address: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        undoL1ToL2Alias(_address: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}