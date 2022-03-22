import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IL2ERC721Bridge, IL2ERC721BridgeInterface } from "../IL2ERC721Bridge";
export declare class IL2ERC721Bridge__factory {
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
        outputs: any[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    } | {
        inputs: any[];
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
    static createInterface(): IL2ERC721BridgeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IL2ERC721Bridge;
}
