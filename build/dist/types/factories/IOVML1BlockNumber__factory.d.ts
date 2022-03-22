import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IOVML1BlockNumber, IOVML1BlockNumberInterface } from "../IOVML1BlockNumber";
export declare class IOVML1BlockNumber__factory {
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
    static createInterface(): IOVML1BlockNumberInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IOVML1BlockNumber;
}
