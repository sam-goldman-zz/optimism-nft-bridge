import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IOVML2ToL1MessagePasser, IOVML2ToL1MessagePasserInterface } from "../IOVML2ToL1MessagePasser";
export declare class IOVML2ToL1MessagePasser__factory {
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
    })[];
    static createInterface(): IOVML2ToL1MessagePasserInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IOVML2ToL1MessagePasser;
}
