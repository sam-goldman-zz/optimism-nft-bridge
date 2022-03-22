import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface TestLibMerkleTreeInterface extends utils.Interface {
    functions: {
        "getMerkleRoot(bytes32[])": FunctionFragment;
        "verify(bytes32,bytes32,uint256,bytes32[],uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getMerkleRoot", values: [BytesLike[]]): string;
    encodeFunctionData(functionFragment: "verify", values: [BytesLike, BytesLike, BigNumberish, BytesLike[], BigNumberish]): string;
    decodeFunctionResult(functionFragment: "getMerkleRoot", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    events: {};
}
export interface TestLibMerkleTree extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TestLibMerkleTreeInterface;
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
        getMerkleRoot(_elements: BytesLike[], overrides?: CallOverrides): Promise<[string]>;
        verify(_root: BytesLike, _leaf: BytesLike, _index: BigNumberish, _siblings: BytesLike[], _totalLeaves: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;
    };
    getMerkleRoot(_elements: BytesLike[], overrides?: CallOverrides): Promise<string>;
    verify(_root: BytesLike, _leaf: BytesLike, _index: BigNumberish, _siblings: BytesLike[], _totalLeaves: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        getMerkleRoot(_elements: BytesLike[], overrides?: CallOverrides): Promise<string>;
        verify(_root: BytesLike, _leaf: BytesLike, _index: BigNumberish, _siblings: BytesLike[], _totalLeaves: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {};
    estimateGas: {
        getMerkleRoot(_elements: BytesLike[], overrides?: CallOverrides): Promise<BigNumber>;
        verify(_root: BytesLike, _leaf: BytesLike, _index: BigNumberish, _siblings: BytesLike[], _totalLeaves: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getMerkleRoot(_elements: BytesLike[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verify(_root: BytesLike, _leaf: BytesLike, _index: BigNumberish, _siblings: BytesLike[], _totalLeaves: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}