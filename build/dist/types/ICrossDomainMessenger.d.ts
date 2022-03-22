import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ICrossDomainMessengerInterface extends utils.Interface {
    functions: {
        "sendMessage(address,bytes,uint32)": FunctionFragment;
        "xDomainMessageSender()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "sendMessage", values: [string, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "xDomainMessageSender", values?: undefined): string;
    decodeFunctionResult(functionFragment: "sendMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "xDomainMessageSender", data: BytesLike): Result;
    events: {
        "FailedRelayedMessage(bytes32)": EventFragment;
        "RelayedMessage(bytes32)": EventFragment;
        "SentMessage(address,address,bytes,uint256,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "FailedRelayedMessage"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RelayedMessage"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SentMessage"): EventFragment;
}
export declare type FailedRelayedMessageEvent = TypedEvent<[
    string
], {
    msgHash: string;
}>;
export declare type FailedRelayedMessageEventFilter = TypedEventFilter<FailedRelayedMessageEvent>;
export declare type RelayedMessageEvent = TypedEvent<[string], {
    msgHash: string;
}>;
export declare type RelayedMessageEventFilter = TypedEventFilter<RelayedMessageEvent>;
export declare type SentMessageEvent = TypedEvent<[
    string,
    string,
    string,
    BigNumber,
    BigNumber
], {
    target: string;
    sender: string;
    message: string;
    messageNonce: BigNumber;
    gasLimit: BigNumber;
}>;
export declare type SentMessageEventFilter = TypedEventFilter<SentMessageEvent>;
export interface ICrossDomainMessenger extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ICrossDomainMessengerInterface;
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
        sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        xDomainMessageSender(overrides?: CallOverrides): Promise<[string]>;
    };
    sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    xDomainMessageSender(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: CallOverrides): Promise<void>;
        xDomainMessageSender(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "FailedRelayedMessage(bytes32)"(msgHash?: BytesLike | null): FailedRelayedMessageEventFilter;
        FailedRelayedMessage(msgHash?: BytesLike | null): FailedRelayedMessageEventFilter;
        "RelayedMessage(bytes32)"(msgHash?: BytesLike | null): RelayedMessageEventFilter;
        RelayedMessage(msgHash?: BytesLike | null): RelayedMessageEventFilter;
        "SentMessage(address,address,bytes,uint256,uint256)"(target?: string | null, sender?: null, message?: null, messageNonce?: null, gasLimit?: null): SentMessageEventFilter;
        SentMessage(target?: string | null, sender?: null, message?: null, messageNonce?: null, gasLimit?: null): SentMessageEventFilter;
    };
    estimateGas: {
        sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        xDomainMessageSender(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        xDomainMessageSender(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
