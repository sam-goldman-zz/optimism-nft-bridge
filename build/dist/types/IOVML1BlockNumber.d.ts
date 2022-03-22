import { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IOVML1BlockNumberInterface extends utils.Interface {
    functions: {
        "getL1BlockNumber()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getL1BlockNumber", values?: undefined): string;
    decodeFunctionResult(functionFragment: "getL1BlockNumber", data: BytesLike): Result;
    events: {};
}
export interface IOVML1BlockNumber extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IOVML1BlockNumberInterface;
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
        getL1BlockNumber(overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    getL1BlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        getL1BlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        getL1BlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getL1BlockNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
