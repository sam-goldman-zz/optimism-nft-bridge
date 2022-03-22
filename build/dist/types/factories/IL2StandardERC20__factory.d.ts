import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IL2StandardERC20, IL2StandardERC20Interface } from "../IL2StandardERC20";
export declare class IL2StandardERC20__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): IL2StandardERC20Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IL2StandardERC20;
}
