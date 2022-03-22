import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IBondManager, IBondManagerInterface } from "../IBondManager";
export declare class IBondManager__factory {
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
    static createInterface(): IBondManagerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IBondManager;
}
