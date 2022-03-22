import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IL1ERC721BridgeInterface extends utils.Interface {
    functions: {
        "depositERC721(address,address,uint256,uint32,bytes)": FunctionFragment;
        "depositERC721To(address,address,address,uint256,uint32,bytes)": FunctionFragment;
        "finalizeERC721Withdrawal(address,address,address,address,uint256,bytes)": FunctionFragment;
        "l2ERC721Bridge()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "depositERC721", values: [string, string, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "depositERC721To", values: [string, string, string, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "finalizeERC721Withdrawal", values: [string, string, string, string, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "l2ERC721Bridge", values?: undefined): string;
    decodeFunctionResult(functionFragment: "depositERC721", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositERC721To", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalizeERC721Withdrawal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "l2ERC721Bridge", data: BytesLike): Result;
    events: {
        "ERC721DepositInitiated(address,address,address,address,uint256,bytes)": EventFragment;
        "ERC721WithdrawalFinalized(address,address,address,address,uint256,bytes)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ERC721DepositInitiated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ERC721WithdrawalFinalized"): EventFragment;
}
export declare type ERC721DepositInitiatedEvent = TypedEvent<[
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
    _tokenId: BigNumber;
    _data: string;
}>;
export declare type ERC721DepositInitiatedEventFilter = TypedEventFilter<ERC721DepositInitiatedEvent>;
export declare type ERC721WithdrawalFinalizedEvent = TypedEvent<[
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
    _tokenId: BigNumber;
    _data: string;
}>;
export declare type ERC721WithdrawalFinalizedEventFilter = TypedEventFilter<ERC721WithdrawalFinalizedEvent>;
export interface IL1ERC721Bridge extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IL1ERC721BridgeInterface;
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
        depositERC721(_l1Token: string, _l2Token: string, _tokenId: BigNumberish, _l2Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        depositERC721To(_l1Token: string, _l2Token: string, _to: string, _tokenId: BigNumberish, _l2Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        finalizeERC721Withdrawal(_l1Token: string, _l2Token: string, _from: string, _to: string, _tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        l2ERC721Bridge(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    depositERC721(_l1Token: string, _l2Token: string, _tokenId: BigNumberish, _l2Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    depositERC721To(_l1Token: string, _l2Token: string, _to: string, _tokenId: BigNumberish, _l2Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    finalizeERC721Withdrawal(_l1Token: string, _l2Token: string, _from: string, _to: string, _tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    l2ERC721Bridge(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        depositERC721(_l1Token: string, _l2Token: string, _tokenId: BigNumberish, _l2Gas: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<void>;
        depositERC721To(_l1Token: string, _l2Token: string, _to: string, _tokenId: BigNumberish, _l2Gas: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<void>;
        finalizeERC721Withdrawal(_l1Token: string, _l2Token: string, _from: string, _to: string, _tokenId: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<void>;
        l2ERC721Bridge(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "ERC721DepositInitiated(address,address,address,address,uint256,bytes)"(_l1Token?: string | null, _l2Token?: string | null, _from?: string | null, _to?: null, _tokenId?: null, _data?: null): ERC721DepositInitiatedEventFilter;
        ERC721DepositInitiated(_l1Token?: string | null, _l2Token?: string | null, _from?: string | null, _to?: null, _tokenId?: null, _data?: null): ERC721DepositInitiatedEventFilter;
        "ERC721WithdrawalFinalized(address,address,address,address,uint256,bytes)"(_l1Token?: string | null, _l2Token?: string | null, _from?: string | null, _to?: null, _tokenId?: null, _data?: null): ERC721WithdrawalFinalizedEventFilter;
        ERC721WithdrawalFinalized(_l1Token?: string | null, _l2Token?: string | null, _from?: string | null, _to?: null, _tokenId?: null, _data?: null): ERC721WithdrawalFinalizedEventFilter;
    };
    estimateGas: {
        depositERC721(_l1Token: string, _l2Token: string, _tokenId: BigNumberish, _l2Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        depositERC721To(_l1Token: string, _l2Token: string, _to: string, _tokenId: BigNumberish, _l2Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        finalizeERC721Withdrawal(_l1Token: string, _l2Token: string, _from: string, _to: string, _tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        l2ERC721Bridge(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        depositERC721(_l1Token: string, _l2Token: string, _tokenId: BigNumberish, _l2Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        depositERC721To(_l1Token: string, _l2Token: string, _to: string, _tokenId: BigNumberish, _l2Gas: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        finalizeERC721Withdrawal(_l1Token: string, _l2Token: string, _from: string, _to: string, _tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        l2ERC721Bridge(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
