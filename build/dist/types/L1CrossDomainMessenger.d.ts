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
export interface L1CrossDomainMessengerInterface extends utils.Interface {
    functions: {
        "allowMessage(bytes32)": FunctionFragment;
        "blockMessage(bytes32)": FunctionFragment;
        "blockedMessages(bytes32)": FunctionFragment;
        "initialize(address)": FunctionFragment;
        "libAddressManager()": FunctionFragment;
        "owner()": FunctionFragment;
        "pause()": FunctionFragment;
        "paused()": FunctionFragment;
        "relayMessage(address,address,bytes,uint256,(bytes32,(uint256,bytes32,uint256,uint256,bytes),(uint256,bytes32[]),bytes,bytes))": FunctionFragment;
        "relayedMessages(bytes32)": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "replayMessage(address,address,bytes,uint256,uint32,uint32)": FunctionFragment;
        "resolve(string)": FunctionFragment;
        "sendMessage(address,bytes,uint32)": FunctionFragment;
        "successfulMessages(bytes32)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "xDomainMessageSender()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "allowMessage", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "blockMessage", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "blockedMessages", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [string]): string;
    encodeFunctionData(functionFragment: "libAddressManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "relayMessage", values: [
        string,
        string,
        BytesLike,
        BigNumberish,
        L2MessageInclusionProofStruct
    ]): string;
    encodeFunctionData(functionFragment: "relayedMessages", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "replayMessage", values: [
        string,
        string,
        BytesLike,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "resolve", values: [string]): string;
    encodeFunctionData(functionFragment: "sendMessage", values: [string, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "successfulMessages", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
    encodeFunctionData(functionFragment: "xDomainMessageSender", values?: undefined): string;
    decodeFunctionResult(functionFragment: "allowMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "blockMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "blockedMessages", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "libAddressManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "relayMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "relayedMessages", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "replayMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sendMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "successfulMessages", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "xDomainMessageSender", data: BytesLike): Result;
    events: {
        "FailedRelayedMessage(bytes32)": EventFragment;
        "MessageAllowed(bytes32)": EventFragment;
        "MessageBlocked(bytes32)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "Paused(address)": EventFragment;
        "RelayedMessage(bytes32)": EventFragment;
        "SentMessage(address,address,bytes,uint256,uint256)": EventFragment;
        "Unpaused(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "FailedRelayedMessage"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MessageAllowed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MessageBlocked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RelayedMessage"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SentMessage"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}
export declare type FailedRelayedMessageEvent = TypedEvent<[
    string
], {
    msgHash: string;
}>;
export declare type FailedRelayedMessageEventFilter = TypedEventFilter<FailedRelayedMessageEvent>;
export declare type MessageAllowedEvent = TypedEvent<[
    string
], {
    _xDomainCalldataHash: string;
}>;
export declare type MessageAllowedEventFilter = TypedEventFilter<MessageAllowedEvent>;
export declare type MessageBlockedEvent = TypedEvent<[
    string
], {
    _xDomainCalldataHash: string;
}>;
export declare type MessageBlockedEventFilter = TypedEventFilter<MessageBlockedEvent>;
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], {
    previousOwner: string;
    newOwner: string;
}>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export declare type PausedEvent = TypedEvent<[string], {
    account: string;
}>;
export declare type PausedEventFilter = TypedEventFilter<PausedEvent>;
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
export declare type UnpausedEvent = TypedEvent<[string], {
    account: string;
}>;
export declare type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;
export interface L1CrossDomainMessenger extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: L1CrossDomainMessengerInterface;
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
        allowMessage(_xDomainCalldataHash: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        blockMessage(_xDomainCalldataHash: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        blockedMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        initialize(_libAddressManager: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        libAddressManager(overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        pause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        paused(overrides?: CallOverrides): Promise<[boolean]>;
        relayMessage(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, _proof: L2MessageInclusionProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        relayedMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        replayMessage(_target: string, _sender: string, _message: BytesLike, _queueIndex: BigNumberish, _oldGasLimit: BigNumberish, _newGasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        resolve(_name: string, overrides?: CallOverrides): Promise<[string]>;
        sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        successfulMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        xDomainMessageSender(overrides?: CallOverrides): Promise<[string]>;
    };
    allowMessage(_xDomainCalldataHash: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    blockMessage(_xDomainCalldataHash: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    blockedMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    initialize(_libAddressManager: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    libAddressManager(overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    pause(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    relayMessage(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, _proof: L2MessageInclusionProofStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    relayedMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    renounceOwnership(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    replayMessage(_target: string, _sender: string, _message: BytesLike, _queueIndex: BigNumberish, _oldGasLimit: BigNumberish, _newGasLimit: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    resolve(_name: string, overrides?: CallOverrides): Promise<string>;
    sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    successfulMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    xDomainMessageSender(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        allowMessage(_xDomainCalldataHash: BytesLike, overrides?: CallOverrides): Promise<void>;
        blockMessage(_xDomainCalldataHash: BytesLike, overrides?: CallOverrides): Promise<void>;
        blockedMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        initialize(_libAddressManager: string, overrides?: CallOverrides): Promise<void>;
        libAddressManager(overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        pause(overrides?: CallOverrides): Promise<void>;
        paused(overrides?: CallOverrides): Promise<boolean>;
        relayMessage(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, _proof: L2MessageInclusionProofStruct, overrides?: CallOverrides): Promise<void>;
        relayedMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        replayMessage(_target: string, _sender: string, _message: BytesLike, _queueIndex: BigNumberish, _oldGasLimit: BigNumberish, _newGasLimit: BigNumberish, overrides?: CallOverrides): Promise<void>;
        resolve(_name: string, overrides?: CallOverrides): Promise<string>;
        sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: CallOverrides): Promise<void>;
        successfulMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
        xDomainMessageSender(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "FailedRelayedMessage(bytes32)"(msgHash?: BytesLike | null): FailedRelayedMessageEventFilter;
        FailedRelayedMessage(msgHash?: BytesLike | null): FailedRelayedMessageEventFilter;
        "MessageAllowed(bytes32)"(_xDomainCalldataHash?: BytesLike | null): MessageAllowedEventFilter;
        MessageAllowed(_xDomainCalldataHash?: BytesLike | null): MessageAllowedEventFilter;
        "MessageBlocked(bytes32)"(_xDomainCalldataHash?: BytesLike | null): MessageBlockedEventFilter;
        MessageBlocked(_xDomainCalldataHash?: BytesLike | null): MessageBlockedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        "Paused(address)"(account?: null): PausedEventFilter;
        Paused(account?: null): PausedEventFilter;
        "RelayedMessage(bytes32)"(msgHash?: BytesLike | null): RelayedMessageEventFilter;
        RelayedMessage(msgHash?: BytesLike | null): RelayedMessageEventFilter;
        "SentMessage(address,address,bytes,uint256,uint256)"(target?: string | null, sender?: null, message?: null, messageNonce?: null, gasLimit?: null): SentMessageEventFilter;
        SentMessage(target?: string | null, sender?: null, message?: null, messageNonce?: null, gasLimit?: null): SentMessageEventFilter;
        "Unpaused(address)"(account?: null): UnpausedEventFilter;
        Unpaused(account?: null): UnpausedEventFilter;
    };
    estimateGas: {
        allowMessage(_xDomainCalldataHash: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        blockMessage(_xDomainCalldataHash: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        blockedMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(_libAddressManager: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        libAddressManager(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        pause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        paused(overrides?: CallOverrides): Promise<BigNumber>;
        relayMessage(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, _proof: L2MessageInclusionProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        relayedMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        replayMessage(_target: string, _sender: string, _message: BytesLike, _queueIndex: BigNumberish, _oldGasLimit: BigNumberish, _newGasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        resolve(_name: string, overrides?: CallOverrides): Promise<BigNumber>;
        sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        successfulMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        xDomainMessageSender(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        allowMessage(_xDomainCalldataHash: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        blockMessage(_xDomainCalldataHash: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        blockedMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(_libAddressManager: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        libAddressManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        relayMessage(_target: string, _sender: string, _message: BytesLike, _messageNonce: BigNumberish, _proof: L2MessageInclusionProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        relayedMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        replayMessage(_target: string, _sender: string, _message: BytesLike, _queueIndex: BigNumberish, _oldGasLimit: BigNumberish, _newGasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        resolve(_name: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        sendMessage(_target: string, _message: BytesLike, _gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        successfulMessages(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        xDomainMessageSender(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}