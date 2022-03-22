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

export interface TestLibMerkleTrieInterface extends ethers.utils.Interface {
  functions: {
    "get(bytes,bytes,bytes32)": FunctionFragment;
    "getSingleNodeRootHash(bytes,bytes)": FunctionFragment;
    "update(bytes,bytes,bytes,bytes32)": FunctionFragment;
    "verifyInclusionProof(bytes,bytes,bytes,bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "get",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getSingleNodeRootHash",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "update",
    values: [BytesLike, BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyInclusionProof",
    values: [BytesLike, BytesLike, BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSingleNodeRootHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "update", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifyInclusionProof",
    data: BytesLike
  ): Result;

  events: {};
}

export interface TestLibMerkleTrie extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestLibMerkleTrieInterface;

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
    get(
      _key: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean, string]>;

    getSingleNodeRootHash(
      _key: BytesLike,
      _value: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    update(
      _key: BytesLike,
      _value: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    verifyInclusionProof(
      _key: BytesLike,
      _value: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  get(
    _key: BytesLike,
    _proof: BytesLike,
    _root: BytesLike,
    overrides?: CallOverrides
  ): Promise<[boolean, string]>;

  getSingleNodeRootHash(
    _key: BytesLike,
    _value: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  update(
    _key: BytesLike,
    _value: BytesLike,
    _proof: BytesLike,
    _root: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  verifyInclusionProof(
    _key: BytesLike,
    _value: BytesLike,
    _proof: BytesLike,
    _root: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    get(
      _key: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean, string]>;

    getSingleNodeRootHash(
      _key: BytesLike,
      _value: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    update(
      _key: BytesLike,
      _value: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    verifyInclusionProof(
      _key: BytesLike,
      _value: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    get(
      _key: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSingleNodeRootHash(
      _key: BytesLike,
      _value: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    update(
      _key: BytesLike,
      _value: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    verifyInclusionProof(
      _key: BytesLike,
      _value: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    get(
      _key: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSingleNodeRootHash(
      _key: BytesLike,
      _value: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    update(
      _key: BytesLike,
      _value: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    verifyInclusionProof(
      _key: BytesLike,
      _value: BytesLike,
      _proof: BytesLike,
      _root: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
