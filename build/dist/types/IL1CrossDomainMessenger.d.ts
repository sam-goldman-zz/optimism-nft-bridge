import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type ChainBatchHeaderStruct = {
    batchIndex: BigNumberish;
    batchRoot: BytesLike;
    batchSize: BigNumberish;
    prevTotalElements: BigNumberish;
    extraData: BytesLike;
};
export declare type ChainBatchHeaderStructOutput = [
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    string
] & {
    batchIndex: BigNumber;
    batchRoot: string;
    batchSize: BigNumber;
    prevTotalElements: BigNumber;
    extraData: string;
};
export declare type ChainInclusionProofStruct = {
    index: BigNumberish;
    siblings: BytesLike[];
};
export declare type ChainInclusionProofStructOutput = [BigNumber, string[]] & {
    index: BigNumber;
    siblings: string[];
};
export declare type L2MessageInclusionProofStruct = {
    stateRoot: BytesLike;
    stateRootBatchHeader: ChainBatchHeaderStruct;
    stateRootProof: ChainInclusionProofStruct;
    stateTrieWitness: BytesLike;
    storageTrieWitness: BytesLike;
};
export declare type L2MessageInclusionProofStructOutput = [
    string,
    ChainBatchHeaderStructOutput,
    ChainInclusionProofStructOutput,
    string,
    string
] & {
    stateRoot: string;
    stateRootBatchHeader: ChainBatchHeaderStructOutput;
    stateRootProof: ChainInclusionProofStructOutput;
    stateTrieWitness: string;
    storageTrieWitness: string;
};
export interface IL1CrossDomainMessengerInterface extends utils.Interface {
    functions: {
        "relayMessage(address,address,bytes,uint256,(bytes32,(uint256,bytes32,uint256,uint256,bytes),(uint256,bytes32[]),bytes,bytes))": FunctionFragment;
        "replayMessage(address,address,bytes,uint256,uint32,uint32)": FunctionFragment;
        "sendMessage(address,bytes,uint32)": FunctionFragment;
        "xDomainMessageSender()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "relayMessage", values: [
        string,
        string,
        BytesLike,
        BigNumberish,
        L2MessageInclusionProofStruct
    ]): string;
    encodeFunctionData(functionFragment: "replayMessage", values: [
        string,
        string,
        BytesLike,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "sendMessage", values: [string, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "xDomainMessageSender", values?: undefined): string;
    decodeFunctionResult(functionFragment: "relayMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "replayMessage", data: BytesLike): Result;
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
export interface IL1CrossDomainMessenger extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IL1CrossDomainMessengerInterface;
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
        relayMessage(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, _proof: L2MessageInclusionProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        replayMessage(_target: string, _sender: string, _message: BytesLike, _queueIndex: BigNumberish, _oldGasLimit: BigNumberish, _newGasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        xDomainMessageSender(overrides?: CallOverrides): Promise<[string]>;
    };
    relayMessage(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, _proof: L2MessageInclusionProofStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    replayMessage(_target: string, _sender: string, _message: BytesLike, _queueIndex: BigNumberish, _oldGasLimit: BigNumberish, _newGasLimit: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    xDomainMessageSender(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        relayMessage(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, _proof: L2MessageInclusionProofStruct, overrides?: CallOverrides): Promise<void>;
        replayMessage(_target: string, _sender: string, _message: BytesLike, _queueIndex: BigNumberish, _oldGasLimit: BigNumberish, _newGasLimit: BigNumberish, overrides?: CallOverrides): Promise<void>;
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
        relayMessage(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, _proof: L2MessageInclusionProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        replayMessage(_target: string, _sender: string, _message: BytesLike, _queueIndex: BigNumberish, _oldGasLimit: BigNumberish, _newGasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        xDomainMessageSender(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        relayMessage(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, _proof: L2MessageInclusionProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        replayMessage(_target: string, _sender: string, _message: BytesLike, _queueIndex: BigNumberish, _oldGasLimit: BigNumberish, _newGasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        xDomainMessageSender(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
