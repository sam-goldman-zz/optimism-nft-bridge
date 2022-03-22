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
export interface StateCommitmentChainInterface extends utils.Interface {
    functions: {
        "FRAUD_PROOF_WINDOW()": FunctionFragment;
        "SEQUENCER_PUBLISH_WINDOW()": FunctionFragment;
        "appendStateBatch(bytes32[],uint256)": FunctionFragment;
        "batches()": FunctionFragment;
        "deleteStateBatch((uint256,bytes32,uint256,uint256,bytes))": FunctionFragment;
        "getLastSequencerTimestamp()": FunctionFragment;
        "getTotalBatches()": FunctionFragment;
        "getTotalElements()": FunctionFragment;
        "insideFraudProofWindow((uint256,bytes32,uint256,uint256,bytes))": FunctionFragment;
        "libAddressManager()": FunctionFragment;
        "resolve(string)": FunctionFragment;
        "verifyStateCommitment(bytes32,(uint256,bytes32,uint256,uint256,bytes),(uint256,bytes32[]))": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "FRAUD_PROOF_WINDOW", values?: undefined): string;
    encodeFunctionData(functionFragment: "SEQUENCER_PUBLISH_WINDOW", values?: undefined): string;
    encodeFunctionData(functionFragment: "appendStateBatch", values: [BytesLike[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "batches", values?: undefined): string;
    encodeFunctionData(functionFragment: "deleteStateBatch", values: [ChainBatchHeaderStruct]): string;
    encodeFunctionData(functionFragment: "getLastSequencerTimestamp", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTotalBatches", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTotalElements", values?: undefined): string;
    encodeFunctionData(functionFragment: "insideFraudProofWindow", values: [ChainBatchHeaderStruct]): string;
    encodeFunctionData(functionFragment: "libAddressManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "resolve", values: [string]): string;
    encodeFunctionData(functionFragment: "verifyStateCommitment", values: [BytesLike, ChainBatchHeaderStruct, ChainInclusionProofStruct]): string;
    decodeFunctionResult(functionFragment: "FRAUD_PROOF_WINDOW", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "SEQUENCER_PUBLISH_WINDOW", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "appendStateBatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batches", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deleteStateBatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLastSequencerTimestamp", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTotalBatches", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTotalElements", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "insideFraudProofWindow", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "libAddressManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resolve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verifyStateCommitment", data: BytesLike): Result;
    events: {
        "StateBatchAppended(uint256,bytes32,uint256,uint256,bytes)": EventFragment;
        "StateBatchDeleted(uint256,bytes32)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "StateBatchAppended"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "StateBatchDeleted"): EventFragment;
}
export declare type StateBatchAppendedEvent = TypedEvent<[
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    string
], {
    _batchIndex: BigNumber;
    _batchRoot: string;
    _batchSize: BigNumber;
    _prevTotalElements: BigNumber;
    _extraData: string;
}>;
export declare type StateBatchAppendedEventFilter = TypedEventFilter<StateBatchAppendedEvent>;
export declare type StateBatchDeletedEvent = TypedEvent<[
    BigNumber,
    string
], {
    _batchIndex: BigNumber;
    _batchRoot: string;
}>;
export declare type StateBatchDeletedEventFilter = TypedEventFilter<StateBatchDeletedEvent>;
export interface StateCommitmentChain extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: StateCommitmentChainInterface;
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
        FRAUD_PROOF_WINDOW(overrides?: CallOverrides): Promise<[BigNumber]>;
        SEQUENCER_PUBLISH_WINDOW(overrides?: CallOverrides): Promise<[BigNumber]>;
        appendStateBatch(_batch: BytesLike[], _shouldStartAtElement: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        batches(overrides?: CallOverrides): Promise<[string]>;
        deleteStateBatch(_batchHeader: ChainBatchHeaderStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getLastSequencerTimestamp(overrides?: CallOverrides): Promise<[BigNumber] & {
            _lastSequencerTimestamp: BigNumber;
        }>;
        getTotalBatches(overrides?: CallOverrides): Promise<[BigNumber] & {
            _totalBatches: BigNumber;
        }>;
        getTotalElements(overrides?: CallOverrides): Promise<[BigNumber] & {
            _totalElements: BigNumber;
        }>;
        insideFraudProofWindow(_batchHeader: ChainBatchHeaderStruct, overrides?: CallOverrides): Promise<[boolean] & {
            _inside: boolean;
        }>;
        libAddressManager(overrides?: CallOverrides): Promise<[string]>;
        resolve(_name: string, overrides?: CallOverrides): Promise<[string]>;
        verifyStateCommitment(_element: BytesLike, _batchHeader: ChainBatchHeaderStruct, _proof: ChainInclusionProofStruct, overrides?: CallOverrides): Promise<[boolean]>;
    };
    FRAUD_PROOF_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;
    SEQUENCER_PUBLISH_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;
    appendStateBatch(_batch: BytesLike[], _shouldStartAtElement: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    batches(overrides?: CallOverrides): Promise<string>;
    deleteStateBatch(_batchHeader: ChainBatchHeaderStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getLastSequencerTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
    getTotalBatches(overrides?: CallOverrides): Promise<BigNumber>;
    getTotalElements(overrides?: CallOverrides): Promise<BigNumber>;
    insideFraudProofWindow(_batchHeader: ChainBatchHeaderStruct, overrides?: CallOverrides): Promise<boolean>;
    libAddressManager(overrides?: CallOverrides): Promise<string>;
    resolve(_name: string, overrides?: CallOverrides): Promise<string>;
    verifyStateCommitment(_element: BytesLike, _batchHeader: ChainBatchHeaderStruct, _proof: ChainInclusionProofStruct, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        FRAUD_PROOF_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;
        SEQUENCER_PUBLISH_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;
        appendStateBatch(_batch: BytesLike[], _shouldStartAtElement: BigNumberish, overrides?: CallOverrides): Promise<void>;
        batches(overrides?: CallOverrides): Promise<string>;
        deleteStateBatch(_batchHeader: ChainBatchHeaderStruct, overrides?: CallOverrides): Promise<void>;
        getLastSequencerTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
        getTotalBatches(overrides?: CallOverrides): Promise<BigNumber>;
        getTotalElements(overrides?: CallOverrides): Promise<BigNumber>;
        insideFraudProofWindow(_batchHeader: ChainBatchHeaderStruct, overrides?: CallOverrides): Promise<boolean>;
        libAddressManager(overrides?: CallOverrides): Promise<string>;
        resolve(_name: string, overrides?: CallOverrides): Promise<string>;
        verifyStateCommitment(_element: BytesLike, _batchHeader: ChainBatchHeaderStruct, _proof: ChainInclusionProofStruct, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "StateBatchAppended(uint256,bytes32,uint256,uint256,bytes)"(_batchIndex?: BigNumberish | null, _batchRoot?: null, _batchSize?: null, _prevTotalElements?: null, _extraData?: null): StateBatchAppendedEventFilter;
        StateBatchAppended(_batchIndex?: BigNumberish | null, _batchRoot?: null, _batchSize?: null, _prevTotalElements?: null, _extraData?: null): StateBatchAppendedEventFilter;
        "StateBatchDeleted(uint256,bytes32)"(_batchIndex?: BigNumberish | null, _batchRoot?: null): StateBatchDeletedEventFilter;
        StateBatchDeleted(_batchIndex?: BigNumberish | null, _batchRoot?: null): StateBatchDeletedEventFilter;
    };
    estimateGas: {
        FRAUD_PROOF_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;
        SEQUENCER_PUBLISH_WINDOW(overrides?: CallOverrides): Promise<BigNumber>;
        appendStateBatch(_batch: BytesLike[], _shouldStartAtElement: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        batches(overrides?: CallOverrides): Promise<BigNumber>;
        deleteStateBatch(_batchHeader: ChainBatchHeaderStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getLastSequencerTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
        getTotalBatches(overrides?: CallOverrides): Promise<BigNumber>;
        getTotalElements(overrides?: CallOverrides): Promise<BigNumber>;
        insideFraudProofWindow(_batchHeader: ChainBatchHeaderStruct, overrides?: CallOverrides): Promise<BigNumber>;
        libAddressManager(overrides?: CallOverrides): Promise<BigNumber>;
        resolve(_name: string, overrides?: CallOverrides): Promise<BigNumber>;
        verifyStateCommitment(_element: BytesLike, _batchHeader: ChainBatchHeaderStruct, _proof: ChainInclusionProofStruct, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        FRAUD_PROOF_WINDOW(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        SEQUENCER_PUBLISH_WINDOW(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        appendStateBatch(_batch: BytesLike[], _shouldStartAtElement: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        batches(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        deleteStateBatch(_batchHeader: ChainBatchHeaderStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getLastSequencerTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTotalBatches(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTotalElements(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        insideFraudProofWindow(_batchHeader: ChainBatchHeaderStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        libAddressManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        resolve(_name: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verifyStateCommitment(_element: BytesLike, _batchHeader: ChainBatchHeaderStruct, _proof: ChainInclusionProofStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}