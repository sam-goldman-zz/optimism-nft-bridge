import { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IOVML2ToL1MessagePasserInterface extends utils.Interface {
    functions: {
        "passMessageToL1(bytes)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "passMessageToL1", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "passMessageToL1", data: BytesLike): Result;
    events: {
        "L2ToL1Message(uint256,address,bytes)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "L2ToL1Message"): EventFragment;
}
export declare type L2ToL1MessageEvent = TypedEvent<[
    BigNumber,
    string,
    string
], {
    _nonce: BigNumber;
    _sender: string;
    _data: string;
}>;
export declare type L2ToL1MessageEventFilter = TypedEventFilter<L2ToL1MessageEvent>;
export interface IOVML2ToL1MessagePasser extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IOVML2ToL1MessagePasserInterface;
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
        passMessageToL1(_message: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    passMessageToL1(_message: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        passMessageToL1(_message: BytesLike, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "L2ToL1Message(uint256,address,bytes)"(_nonce?: null, _sender?: null, _data?: null): L2ToL1MessageEventFilter;
        L2ToL1Message(_nonce?: null, _sender?: null, _data?: null): L2ToL1MessageEventFilter;
    };
    estimateGas: {
        passMessageToL1(_message: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        passMessageToL1(_message: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
