import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IL1ChugSplashDeployer, IL1ChugSplashDeployerInterface } from "../IL1ChugSplashDeployer";
export declare class IL1ChugSplashDeployer__factory {
    static readonly abi: {
        inputs: any[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IL1ChugSplashDeployerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IL1ChugSplashDeployer;
}
