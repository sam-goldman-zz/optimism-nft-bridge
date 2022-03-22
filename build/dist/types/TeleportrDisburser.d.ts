import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type DisbursementStruct = {
    amount: BigNumberish;
    addr: string;
};
export declare type DisbursementStructOutput = [BigNumber, string] & {
    amount: BigNumber;
    addr: string;
};
export interface TeleportrDisburserInterface extends utils.Interface {
    functions: {
        "disburse(uint256,(uint256,address)[])": FunctionFragment;
        "owner()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "totalDisbursements()": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "withdrawBalance()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "disburse", values: [BigNumberish, DisbursementStruct[]]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalDisbursements", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
    encodeFunctionData(functionFragment: "withdrawBalance", values?: undefined): string;
    decodeFunctionResult(functionFragment: "disburse", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalDisbursements", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance", data: BytesLike): Result;
    events: {
        "BalanceWithdrawn(address,uint256)": EventFragment;
        "DisbursementFailed(uint256,address,uint256)": EventFragment;
        "DisbursementSuccess(uint256,address,uint256)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "BalanceWithdrawn"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DisbursementFailed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DisbursementSuccess"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export declare type BalanceWithdrawnEvent = TypedEvent<[
    string,
    BigNumber
], {
    owner: string;
    balance: BigNumber;
}>;
export declare type BalanceWithdrawnEventFilter = TypedEventFilter<BalanceWithdrawnEvent>;
export declare type DisbursementFailedEvent = TypedEvent<[
    BigNumber,
    string,
    BigNumber
], {
    depositId: BigNumber;
    to: string;
    amount: BigNumber;
}>;
export declare type DisbursementFailedEventFilter = TypedEventFilter<DisbursementFailedEvent>;
export declare type DisbursementSuccessEvent = TypedEvent<[
    BigNumber,
    string,
    BigNumber
], {
    depositId: BigNumber;
    to: string;
    amount: BigNumber;
}>;
export declare type DisbursementSuccessEventFilter = TypedEventFilter<DisbursementSuccessEvent>;
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], {
    previousOwner: string;
    newOwner: string;
}>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface TeleportrDisburser extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TeleportrDisburserInterface;
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
        disburse(_nextDepositId: BigNumberish, _disbursements: DisbursementStruct[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        totalDisbursements(overrides?: CallOverrides): Promise<[BigNumber]>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        withdrawBalance(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    disburse(_nextDepositId: BigNumberish, _disbursements: DisbursementStruct[], overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    totalDisbursements(overrides?: CallOverrides): Promise<BigNumber>;
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    withdrawBalance(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        disburse(_nextDepositId: BigNumberish, _disbursements: DisbursementStruct[], overrides?: CallOverrides): Promise<void>;
        owner(overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        totalDisbursements(overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
        withdrawBalance(overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "BalanceWithdrawn(address,uint256)"(owner?: string | null, balance?: null): BalanceWithdrawnEventFilter;
        BalanceWithdrawn(owner?: string | null, balance?: null): BalanceWithdrawnEventFilter;
        "DisbursementFailed(uint256,address,uint256)"(depositId?: BigNumberish | null, to?: string | null, amount?: null): DisbursementFailedEventFilter;
        DisbursementFailed(depositId?: BigNumberish | null, to?: string | null, amount?: null): DisbursementFailedEventFilter;
        "DisbursementSuccess(uint256,address,uint256)"(depositId?: BigNumberish | null, to?: string | null, amount?: null): DisbursementSuccessEventFilter;
        DisbursementSuccess(depositId?: BigNumberish | null, to?: string | null, amount?: null): DisbursementSuccessEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        disburse(_nextDepositId: BigNumberish, _disbursements: DisbursementStruct[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        totalDisbursements(overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        withdrawBalance(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        disburse(_nextDepositId: BigNumberish, _disbursements: DisbursementStruct[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        totalDisbursements(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        withdrawBalance(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}