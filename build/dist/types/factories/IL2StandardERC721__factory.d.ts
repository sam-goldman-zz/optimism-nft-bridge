import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IL2StandardERC721, IL2StandardERC721Interface } from "../IL2StandardERC721";
export declare class IL2StandardERC721__factory {
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
    static createInterface(): IL2StandardERC721Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IL2StandardERC721;
}
