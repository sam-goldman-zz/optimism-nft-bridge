import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IL2ERC20BridgeInterface extends utils.Interface {
    functions: {
        "finalizeDeposit(address,address,address,address,uint256,bytes)": FunctionFragment;
        "l1TokenBridge()": FunctionFragment;
        "withdraw(address,uint256,uint32,bytes)": FunctionFragment;
        "withdrawTo(address,address,uint256,uint32,bytes)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "finalizeDeposit", values: [string, string, string, string, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "l1TokenBridge", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdraw", values: [string, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "withdrawTo", values: [string, string, BigNumberish, BigNumberish, BytesLike]): string;
    decodeFunctionResult(functionFragment: "finalizeDeposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "l1TokenBridge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawTo", data: BytesLike): Result;
    events: {
        "DepositFailed(address,address,address,address,uint256,bytes)": EventFragment;
        "DepositFinalized(address,address,address,address,uint256,bytes)": EventFragment;
        "WithdrawalInitiated(address,address,address,address,uint256,bytes)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "DepositFailed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DepositFinalized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WithdrawalInitiated"): EventFragment;
}
export declare type DepositFailedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    BigNumber,
    string
], {
    _l1Token: string;
    _l2Token: string;
    _from: string;
    _to: string;
    _amount: BigNumber;
    _data: string;
}>;
export declare type DepositFailedEventFilter = TypedEventFilter<DepositFailedEvent>;
export declare type DepositFinalizedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    BigNumber,
    string
], {
    _l1Token: string;
    _l2Token: string;
    _from: string;
    _to: string;
    _amount: BigNumber;
    _data: string;
}>;
export declare type DepositFinalizedEventFilter = TypedEventFilter<DepositFinalizedEvent>;
export declare type WithdrawalInitiatedEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    BigNumber,
    string
], {
    _l1Token: string;
    _l2Token: string;
    _from: string;
    _to: string;
    _amount: BigNumber;
    _data: string;
}>;
export declare type WithdrawalInitiatedEventFilter = TypedEventFilter<WithdrawalInitiatedEvent>;
export interface IL2ERC20Bridge extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IL2ERC20BridgeInterface;
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
        finalizeDeposit(_l1Token: string, _l2Token: string, _from: string, _to: string, _amount: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        l1TokenBridge(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        withdraw(_l2Token: string, _amount: BigNumberish, _l1Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        withdrawTo(_l2Token: string, _to: string, _amount: BigNumberish, _l1Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    finalizeDeposit(_l1Token: string, _l2Token: string, _from: string, _to: string, _amount: BigNumberish, _data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    l1TokenBridge(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    withdraw(_l2Token: string, _amount: BigNumberish, _l1Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    withdrawTo(_l2Token: string, _to: string, _amount: BigNumberish, _l1Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        finalizeDeposit(_l1Token: string, _l2Token: string, _from: string, _to: string, _amount: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<void>;
        l1TokenBridge(overrides?: CallOverrides): Promise<string>;
        withdraw(_l2Token: string, _amount: BigNumberish, _l1Gas: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<void>;
        withdrawTo(_l2Token: string, _to: string, _amount: BigNumberish, _l1Gas: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "DepositFailed(address,address,address,address,uint256,bytes)"(_l1Token?: string | null, _l2Token?: string | null, _from?: string | null, _to?: null, _amount?: null, _data?: null): DepositFailedEventFilter;
        DepositFailed(_l1Token?: string | null, _l2Token?: string | null, _from?: string | null, _to?: null, _amount?: null, _data?: null): DepositFailedEventFilter;
        "DepositFinalized(address,address,address,address,uint256,bytes)"(_l1Token?: string | null, _l2Token?: string | null, _from?: string | null, _to?: null, _amount?: null, _data?: null): DepositFinalizedEventFilter;
        DepositFinalized(_l1Token?: string | null, _l2Token?: string | null, _from?: string | null, _to?: null, _amount?: null, _data?: null): DepositFinalizedEventFilter;
        "WithdrawalInitiated(address,address,address,address,uint256,bytes)"(_l1Token?: string | null, _l2Token?: string | null, _from?: string | null, _to?: null, _amount?: null, _data?: null): WithdrawalInitiatedEventFilter;
        WithdrawalInitiated(_l1Token?: string | null, _l2Token?: string | null, _from?: string | null, _to?: null, _amount?: null, _data?: null): WithdrawalInitiatedEventFilter;
    };
    estimateGas: {
        finalizeDeposit(_l1Token: string, _l2Token: string, _from: string, _to: string, _amount: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        l1TokenBridge(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        withdraw(_l2Token: string, _amount: BigNumberish, _l1Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        withdrawTo(_l2Token: string, _to: string, _amount: BigNumberish, _l1Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        finalizeDeposit(_l1Token: string, _l2Token: string, _from: string, _to: string, _amount: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        l1TokenBridge(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        withdraw(_l2Token: string, _amount: BigNumberish, _l1Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        withdrawTo(_l2Token: string, _to: string, _amount: BigNumberish, _l1Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}