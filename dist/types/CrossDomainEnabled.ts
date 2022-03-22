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

export interface CrossDomainEnabledInterface extends ethers.utils.Interface {
  functions: {
    "messenger()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "messenger", values?: undefined): string;

  decodeFunctionResult(functionFragment: "messenger", data: BytesLike): Result;

  events: {};
}

export interface CrossDomainEnabled extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CrossDomainEnabledInterface;

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
    messenger(overrides?: CallOverrides): Promise<[string]>;
  };

  messenger(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    messenger(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    messenger(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    messenger(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
