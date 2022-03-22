import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IL1ERC20Bridge, IL1ERC20BridgeInterface } from "../IL1ERC20Bridge";
export declare class IL1ERC20Bridge__factory {
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
    static createInterface(): IL1ERC20BridgeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IL1ERC20Bridge;
}
