/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface L1ERC721BridgeInterface extends ethers.utils.Interface {
  functions: {
    "depositERC721(address,address,uint256,uint32,bytes)": FunctionFragment;
    "depositERC721To(address,address,address,uint256,uint32,bytes)": FunctionFragment;
    "deposits(address,address,uint256)": FunctionFragment;
    "finalizeERC721Withdrawal(address,address,address,address,uint256,bytes)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "l2ERC721Bridge()": FunctionFragment;
    "messenger()": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "depositERC721",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "depositERC721To",
    values: [string, string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deposits",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "finalizeERC721Withdrawal",
    values: [string, string, string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "l2ERC721Bridge",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "messenger", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "depositERC721",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositERC721To",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposits", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "finalizeERC721Withdrawal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "l2ERC721Bridge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "messenger", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;

  events: {
    "ERC721DepositInitiated(address,address,address,address,uint256,bytes)": EventFragment;
    "ERC721WithdrawalFinalized(address,address,address,address,uint256,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ERC721DepositInitiated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ERC721WithdrawalFinalized"): EventFragment;
}

export type ERC721DepositInitiatedEvent = TypedEvent<
  [string, string, string, string, BigNumber, string],
  {
    _l1Token: string;
    _l2Token: string;
    _from: string;
    _to: string;
    _tokenId: BigNumber;
    _data: string;
  }
>;

export type ERC721DepositInitiatedEventFilter =
  TypedEventFilter<ERC721DepositInitiatedEvent>;

export type ERC721WithdrawalFinalizedEvent = TypedEvent<
  [string, string, string, string, BigNumber, string],
  {
    _l1Token: string;
    _l2Token: string;
    _from: string;
    _to: string;
    _tokenId: BigNumber;
    _data: string;
  }
>;

export type ERC721WithdrawalFinalizedEventFilter =
  TypedEventFilter<ERC721WithdrawalFinalizedEvent>;

export interface L1ERC721Bridge extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: L1ERC721BridgeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    depositERC721(
      _l1Token: string,
      _l2Token: string,
      _tokenId: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositERC721To(
      _l1Token: string,
      _l2Token: string,
      _to: string,
      _tokenId: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposits(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    finalizeERC721Withdrawal(
      _l1Token: string,
      _l2Token: string,
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      _l1messenger: string,
      _l2ERC721Bridge: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    l2ERC721Bridge(overrides?: CallOverrides): Promise<[string]>;

    messenger(overrides?: CallOverrides): Promise<[string]>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  depositERC721(
    _l1Token: string,
    _l2Token: string,
    _tokenId: BigNumberish,
    _l2Gas: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositERC721To(
    _l1Token: string,
    _l2Token: string,
    _to: string,
    _tokenId: BigNumberish,
    _l2Gas: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposits(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  finalizeERC721Withdrawal(
    _l1Token: string,
    _l2Token: string,
    _from: string,
    _to: string,
    _tokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    _l1messenger: string,
    _l2ERC721Bridge: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  l2ERC721Bridge(overrides?: CallOverrides): Promise<string>;

  messenger(overrides?: CallOverrides): Promise<string>;

  onERC721Received(
    operator: string,
    from: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    depositERC721(
      _l1Token: string,
      _l2Token: string,
      _tokenId: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    depositERC721To(
      _l1Token: string,
      _l2Token: string,
      _to: string,
      _tokenId: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    deposits(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    finalizeERC721Withdrawal(
      _l1Token: string,
      _l2Token: string,
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(
      _l1messenger: string,
      _l2ERC721Bridge: string,
      overrides?: CallOverrides
    ): Promise<void>;

    l2ERC721Bridge(overrides?: CallOverrides): Promise<string>;

    messenger(overrides?: CallOverrides): Promise<string>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "ERC721DepositInitiated(address,address,address,address,uint256,bytes)"(
      _l1Token?: string | null,
      _l2Token?: string | null,
      _from?: string | null,
      _to?: null,
      _tokenId?: null,
      _data?: null
    ): ERC721DepositInitiatedEventFilter;
    ERC721DepositInitiated(
      _l1Token?: string | null,
      _l2Token?: string | null,
      _from?: string | null,
      _to?: null,
      _tokenId?: null,
      _data?: null
    ): ERC721DepositInitiatedEventFilter;

    "ERC721WithdrawalFinalized(address,address,address,address,uint256,bytes)"(
      _l1Token?: string | null,
      _l2Token?: string | null,
      _from?: string | null,
      _to?: null,
      _tokenId?: null,
      _data?: null
    ): ERC721WithdrawalFinalizedEventFilter;
    ERC721WithdrawalFinalized(
      _l1Token?: string | null,
      _l2Token?: string | null,
      _from?: string | null,
      _to?: null,
      _tokenId?: null,
      _data?: null
    ): ERC721WithdrawalFinalizedEventFilter;
  };

  estimateGas: {
    depositERC721(
      _l1Token: string,
      _l2Token: string,
      _tokenId: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositERC721To(
      _l1Token: string,
      _l2Token: string,
      _to: string,
      _tokenId: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposits(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    finalizeERC721Withdrawal(
      _l1Token: string,
      _l2Token: string,
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      _l1messenger: string,
      _l2ERC721Bridge: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    l2ERC721Bridge(overrides?: CallOverrides): Promise<BigNumber>;

    messenger(overrides?: CallOverrides): Promise<BigNumber>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    depositERC721(
      _l1Token: string,
      _l2Token: string,
      _tokenId: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositERC721To(
      _l1Token: string,
      _l2Token: string,
      _to: string,
      _tokenId: BigNumberish,
      _l2Gas: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposits(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    finalizeERC721Withdrawal(
      _l1Token: string,
      _l2Token: string,
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      _l1messenger: string,
      _l2ERC721Bridge: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    l2ERC721Bridge(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    messenger(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC721Received(
      operator: string,
      from: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
