import { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface OVMDeployerWhitelistInterface extends utils.Interface {
    functions: {
        "enableArbitraryContractDeployment()": FunctionFragment;
        "isDeployerAllowed(address)": FunctionFragment;
        "owner()": FunctionFragment;
        "setOwner(address)": FunctionFragment;
        "setWhitelistedDeployer(address,bool)": FunctionFragment;
        "whitelist(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "enableArbitraryContractDeployment", values?: undefined): string;
    encodeFunctionData(functionFragment: "isDeployerAllowed", values: [string]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
    encodeFunctionData(functionFragment: "setWhitelistedDeployer", values: [string, boolean]): string;
    encodeFunctionData(functionFragment: "whitelist", values: [string]): string;
    decodeFunctionResult(functionFragment: "enableArbitraryContractDeployment", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isDeployerAllowed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWhitelistedDeployer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "whitelist", data: BytesLike): Result;
    events: {
        "OwnerChanged(address,address)": EventFragment;
        "WhitelistDisabled(address)": EventFragment;
        "WhitelistStatusChanged(address,bool)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "OwnerChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistDisabled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WhitelistStatusChanged"): EventFragment;
}
export declare type OwnerChangedEvent = TypedEvent<[
    string,
    string
], {
    oldOwner: string;
    newOwner: string;
}>;
export declare type OwnerChangedEventFilter = TypedEventFilter<OwnerChangedEvent>;
export declare type WhitelistDisabledEvent = TypedEvent<[string], {
    oldOwner: string;
}>;
export declare type WhitelistDisabledEventFilter = TypedEventFilter<WhitelistDisabledEvent>;
export declare type WhitelistStatusChangedEvent = TypedEvent<[
    string,
    boolean
], {
    deployer: string;
    whitelisted: boolean;
}>;
export declare type WhitelistStatusChangedEventFilter = TypedEventFilter<WhitelistStatusChangedEvent>;
export interface OVMDeployerWhitelist extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: OVMDeployerWhitelistInterface;
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
        enableArbitraryContractDeployment(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        isDeployerAllowed(_deployer: string, overrides?: CallOverrides): Promise<[boolean]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        setOwner(_owner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setWhitelistedDeployer(_deployer: string, _isWhitelisted: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        whitelist(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;
    };
    enableArbitraryContractDeployment(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    isDeployerAllowed(_deployer: string, overrides?: CallOverrides): Promise<boolean>;
    owner(overrides?: CallOverrides): Promise<string>;
    setOwner(_owner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setWhitelistedDeployer(_deployer: string, _isWhitelisted: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    whitelist(arg0: string, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        enableArbitraryContractDeployment(overrides?: CallOverrides): Promise<void>;
        isDeployerAllowed(_deployer: string, overrides?: CallOverrides): Promise<boolean>;
        owner(overrides?: CallOverrides): Promise<string>;
        setOwner(_owner: string, overrides?: CallOverrides): Promise<void>;
        setWhitelistedDeployer(_deployer: string, _isWhitelisted: boolean, overrides?: CallOverrides): Promise<void>;
        whitelist(arg0: string, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "OwnerChanged(address,address)"(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
        OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
        "WhitelistDisabled(address)"(oldOwner?: null): WhitelistDisabledEventFilter;
        WhitelistDisabled(oldOwner?: null): WhitelistDisabledEventFilter;
        "WhitelistStatusChanged(address,bool)"(deployer?: null, whitelisted?: null): WhitelistStatusChangedEventFilter;
        WhitelistStatusChanged(deployer?: null, whitelisted?: null): WhitelistStatusChangedEventFilter;
    };
    estimateGas: {
        enableArbitraryContractDeployment(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        isDeployerAllowed(_deployer: string, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        setOwner(_owner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setWhitelistedDeployer(_deployer: string, _isWhitelisted: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        whitelist(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        enableArbitraryContractDeployment(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        isDeployerAllowed(_deployer: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setOwner(_owner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setWhitelistedDeployer(_deployer: string, _isWhitelisted: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        whitelist(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}