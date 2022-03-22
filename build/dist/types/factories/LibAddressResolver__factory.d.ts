import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { LibAddressResolver, LibAddressResolverInterface } from "../LibAddressResolver";
export declare class LibAddressResolver__factory {
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
    static createInterface(): LibAddressResolverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): LibAddressResolver;
}
