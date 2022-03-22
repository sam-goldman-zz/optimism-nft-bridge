import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface TestLibCrossDomainUtilsInterface extends utils.Interface {
    functions: {
        "encodeXDomainCalldata(address,address,bytes,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "encodeXDomainCalldata", values: [string, string, BytesLike, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "encodeXDomainCalldata", data: BytesLike): Result;
    events: {};
}
export interface TestLibCrossDomainUtils extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestLibCrossDomainUtilsInterface;
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
        encodeXDomainCalldata(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
    };
    encodeXDomainCalldata(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        encodeXDomainCalldata(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        encodeXDomainCalldata(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        encodeXDomainCalldata(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}