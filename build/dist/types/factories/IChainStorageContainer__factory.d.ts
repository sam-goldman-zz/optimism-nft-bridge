import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IChainStorageContainer, IChainStorageContainerInterface } from "../IChainStorageContainer";
export declare class IChainStorageContainer__factory {
    static readonly abi: {
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
    }[];
    static createInterface(): IChainStorageContainerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IChainStorageContainer;
}
