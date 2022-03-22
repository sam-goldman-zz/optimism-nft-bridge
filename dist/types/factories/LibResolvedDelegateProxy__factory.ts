/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  LibResolvedDelegateProxy,
  LibResolvedDelegateProxyInterface,
} from "../LibResolvedDelegateProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_libAddressManager",
        type: "address",
      },
      {
        internalType: "string",
        name: "_implementationName",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516105b53803806105b583398101604081905261002f91610125565b30600090815260016020908152604080832080546001600160a01b0319166001600160a01b038716179055828252909120825161006e92840190610076565b505050610252565b82805461008290610217565b90600052602060002090601f0160209004810192826100a457600085556100ea565b82601f106100bd57805160ff19168380011785556100ea565b828001600101855582156100ea579182015b828111156100ea5782518255916020019190600101906100cf565b506100f69291506100fa565b5090565b5b808211156100f657600081556001016100fb565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561013857600080fd5b82516001600160a01b038116811461014f57600080fd5b602084810151919350906001600160401b038082111561016e57600080fd5b818601915086601f83011261018257600080fd5b8151818111156101945761019461010f565b604051601f8201601f19908116603f011681019083821181831017156101bc576101bc61010f565b8160405282815289868487010111156101d457600080fd5b600093505b828410156101f657848401860151818501870152928501926101d9565b828411156102075760008684830101525b8096505050505050509250929050565b600181811c9082168061022b57607f821691505b6020821081141561024c57634e487b7160e01b600052602260045260246000fd5b50919050565b610354806102616000396000f3fe608060408181523060009081526001602090815282822054908290529181207fbf40fac1000000000000000000000000000000000000000000000000000000009093529173ffffffffffffffffffffffffffffffffffffffff9091169063bf40fac19061006d9060846101f2565b60206040518083038186803b15801561008557600080fd5b505afa158015610099573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100bd91906102d1565b905073ffffffffffffffffffffffffffffffffffffffff8116610166576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5461726765742061646472657373206d75737420626520696e697469616c697a60448201527f65642e0000000000000000000000000000000000000000000000000000000000606482015260840160405180910390fd5b6000808273ffffffffffffffffffffffffffffffffffffffff1660003660405161019192919061030e565b600060405180830381855af49150503d80600081146101cc576040519150601f19603f3d011682016040523d82523d6000602084013e6101d1565b606091505b509092509050600182151514156101ea57805160208201f35b805160208201fd5b600060208083526000845481600182811c91508083168061021457607f831692505b85831081141561024b577f4e487b710000000000000000000000000000000000000000000000000000000085526022600452602485fd5b8786018381526020018180156102685760018114610297576102c2565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008616825287820196506102c2565b60008b81526020902060005b868110156102bc578154848201529085019089016102a3565b83019750505b50949998505050505050505050565b6000602082840312156102e357600080fd5b815173ffffffffffffffffffffffffffffffffffffffff8116811461030757600080fd5b9392505050565b818382376000910190815291905056fea2646970667358221220d66a7dad92a7f7528f41181719174e1d244423b8bb730d2884645c76cfa0944064736f6c63430008090033";

type LibResolvedDelegateProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LibResolvedDelegateProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LibResolvedDelegateProxy__factory extends ContractFactory {
  constructor(...args: LibResolvedDelegateProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _libAddressManager: string,
    _implementationName: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LibResolvedDelegateProxy> {
    return super.deploy(
      _libAddressManager,
      _implementationName,
      overrides || {}
    ) as Promise<LibResolvedDelegateProxy>;
  }
  getDeployTransaction(
    _libAddressManager: string,
    _implementationName: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _libAddressManager,
      _implementationName,
      overrides || {}
    );
  }
  attach(address: string): LibResolvedDelegateProxy {
    return super.attach(address) as LibResolvedDelegateProxy;
  }
  connect(signer: Signer): LibResolvedDelegateProxy__factory {
    return super.connect(signer) as LibResolvedDelegateProxy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LibResolvedDelegateProxyInterface {
    return new utils.Interface(_abi) as LibResolvedDelegateProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibResolvedDelegateProxy {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as LibResolvedDelegateProxy;
  }
}