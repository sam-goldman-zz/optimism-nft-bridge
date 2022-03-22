import { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface OVMSequencerFeeVaultInterface extends utils.Interface {
    functions: {
        "MIN_WITHDRAWAL_AMOUNT()": FunctionFragment;
        "l1FeeWallet()": FunctionFragment;
        "withdraw()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "MIN_WITHDRAWAL_AMOUNT", values?: undefined): string;
    encodeFunctionData(functionFragment: "l1FeeWallet", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
    decodeFunctionResult(functionFragment: "MIN_WITHDRAWAL_AMOUNT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "l1FeeWallet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    events: {};
}
export interface OVMSequencerFeeVault extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: OVMSequencerFeeVaultInterface;
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
        MIN_WITHDRAWAL_AMOUNT(overrides?: CallOverrides): Promise<[BigNumber]>;
        l1FeeWallet(overrides?: CallOverrides): Promise<[string]>;
        withdraw(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    MIN_WITHDRAWAL_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;
    l1FeeWallet(overrides?: CallOverrides): Promise<string>;
    withdraw(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        MIN_WITHDRAWAL_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;
        l1FeeWallet(overrides?: CallOverrides): Promise<string>;
        withdraw(overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        MIN_WITHDRAWAL_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;
        l1FeeWallet(overrides?: CallOverrides): Promise<BigNumber>;
        withdraw(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        MIN_WITHDRAWAL_AMOUNT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        l1FeeWallet(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        withdraw(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}