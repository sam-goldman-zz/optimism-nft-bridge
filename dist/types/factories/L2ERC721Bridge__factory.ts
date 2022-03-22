/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  L2ERC721Bridge,
  L2ERC721BridgeInterface,
} from "../L2ERC721Bridge";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_l2CrossDomainMessenger",
        type: "address",
      },
      {
        internalType: "address",
        name: "_l1ERC721Bridge",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "DepositFailed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "DepositFinalized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "WithdrawalInitiated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "finalizeDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "l1ERC721Bridge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "messenger",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_l1Gas",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_l1Gas",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "withdrawTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161106e38038061106e83398101604081905261002f9161007c565b600080546001600160a01b039384166001600160a01b031991821617909155600180549290931691161790556100af565b80516001600160a01b038116811461007757600080fd5b919050565b6000806040838503121561008f57600080fd5b61009883610060565b91506100a660208401610060565b90509250929050565b610fb0806100be6000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c8063662a633a11610050578063662a633a146100ca578063a3a79548146100dd578063c4e8ddfa146100f057600080fd5b806332b7006d1461006c5780633cb747bf14610081575b600080fd5b61007f61007a366004610c04565b610110565b005b6000546100a19073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b61007f6100d8366004610c75565b610126565b61007f6100eb366004610d0d565b6106c1565b6001546100a19073ffffffffffffffffffffffffffffffffffffffff1681565b61011f853333878787876106d8565b5050505050565b60015473ffffffffffffffffffffffffffffffffffffffff1661015e60005473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461021d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4f564d5f58434841494e3a206d657373656e67657220636f6e7472616374207560448201527f6e61757468656e7469636174656400000000000000000000000000000000000060648201526084015b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661025360005473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff16636e296e456040518163ffffffff1660e01b815260040160206040518083038186803b15801561029857600080fd5b505afa1580156102ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d09190610d90565b73ffffffffffffffffffffffffffffffffffffffff1614610373576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603060248201527f4f564d5f58434841494e3a2077726f6e672073656e646572206f662063726f7360448201527f732d646f6d61696e206d657373616765000000000000000000000000000000006064820152608401610214565b61039d877f1d1d8b6300000000000000000000000000000000000000000000000000000000610927565b801561045357508673ffffffffffffffffffffffffffffffffffffffff1663c01e1bd66040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156103ec57600080fd5b505af1158015610400573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104249190610d90565b73ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff16145b15610567576040517f40c10f1900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8681166004830152602482018690528816906340c10f1990604401600060405180830381600087803b1580156104c857600080fd5b505af11580156104dc573d6000803e3d6000fd5b505050508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff167fb0444523268717a02698be47d0803aa7468c00acbed2f8bd93a0459cde61dd898888888860405161055a9493929190610dfd565b60405180910390a46106b7565b6000638f45e47760e01b8989888a89898960405160240161058e9796959493929190610e33565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526001549091506106339073ffffffffffffffffffffffffffffffffffffffff1660008361094c565b8673ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff167f7ea89a4591614515571c2b51f5ea06494056f261c10ab1ed8c03c7590d87bce0898989896040516106ad9493929190610dfd565b60405180910390a4505b5050505050505050565b6106d0863387878787876106d8565b505050505050565b6040517f9dc29fac0000000000000000000000000000000000000000000000000000000081523360048201526024810185905273ffffffffffffffffffffffffffffffffffffffff881690639dc29fac90604401600060405180830381600087803b15801561074657600080fd5b505af115801561075a573d6000803e3d6000fd5b5050505060008773ffffffffffffffffffffffffffffffffffffffff1663c01e1bd66040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156107a857600080fd5b505af11580156107bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e09190610d90565b90506000638f45e47760e01b828a8a8a8a89896040516024016108099796959493929190610e33565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526001549091506108ad9073ffffffffffffffffffffffffffffffffffffffff16868361094c565b3373ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f73d170910aba9e6d50b102db522b1dbcd796216f5128b445aa2135272886497e8a8a89896040516106ad9493929190610dfd565b6000610932836109dd565b801561094357506109438383610a41565b90505b92915050565b6000546040517f3dbb202b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690633dbb202b906109a690869085908790600401610ec0565b600060405180830381600087803b1580156109c057600080fd5b505af11580156109d4573d6000803e3d6000fd5b50505050505050565b6000610a09827f01ffc9a700000000000000000000000000000000000000000000000000000000610a41565b80156109465750610a3a827fffffffff00000000000000000000000000000000000000000000000000000000610a41565b1592915050565b604080517fffffffff00000000000000000000000000000000000000000000000000000000831660248083019190915282518083039091018152604490910182526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f01ffc9a7000000000000000000000000000000000000000000000000000000001790529051600091908290819073ffffffffffffffffffffffffffffffffffffffff87169061753090610afb908690610f3c565b6000604051808303818686fa925050503d8060008114610b37576040519150601f19603f3d011682016040523d82523d6000602084013e610b3c565b606091505b5091509150602081511015610b575760009350505050610946565b818015610b73575080806020019051810190610b739190610f58565b9695505050505050565b73ffffffffffffffffffffffffffffffffffffffff81168114610b9f57600080fd5b50565b803563ffffffff81168114610bb657600080fd5b919050565b60008083601f840112610bcd57600080fd5b50813567ffffffffffffffff811115610be557600080fd5b602083019150836020828501011115610bfd57600080fd5b9250929050565b600080600080600060808688031215610c1c57600080fd5b8535610c2781610b7d565b945060208601359350610c3c60408701610ba2565b9250606086013567ffffffffffffffff811115610c5857600080fd5b610c6488828901610bbb565b969995985093965092949392505050565b600080600080600080600060c0888a031215610c9057600080fd5b8735610c9b81610b7d565b96506020880135610cab81610b7d565b95506040880135610cbb81610b7d565b94506060880135610ccb81610b7d565b93506080880135925060a088013567ffffffffffffffff811115610cee57600080fd5b610cfa8a828b01610bbb565b989b979a50959850939692959293505050565b60008060008060008060a08789031215610d2657600080fd5b8635610d3181610b7d565b95506020870135610d4181610b7d565b945060408701359350610d5660608801610ba2565b9250608087013567ffffffffffffffff811115610d7257600080fd5b610d7e89828a01610bbb565b979a9699509497509295939492505050565b600060208284031215610da257600080fd5b8151610dad81610b7d565b9392505050565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b73ffffffffffffffffffffffffffffffffffffffff85168152836020820152606060408201526000610b73606083018486610db4565b600073ffffffffffffffffffffffffffffffffffffffff808a1683528089166020840152808816604084015280871660608401525084608083015260c060a0830152610e8360c083018486610db4565b9998505050505050505050565b60005b83811015610eab578181015183820152602001610e93565b83811115610eba576000848401525b50505050565b73ffffffffffffffffffffffffffffffffffffffff841681526060602082015260008351806060840152610efb816080850160208801610e90565b63ffffffff93909316604083015250601f919091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0160160800192915050565b60008251610f4e818460208701610e90565b9190910192915050565b600060208284031215610f6a57600080fd5b81518015158114610dad57600080fdfea264697066735822122083d0df2567bdc9f881da8819521443a3c9afc48aa6667f73ff5d0c45a6d7637f64736f6c63430008090033";

type L2ERC721BridgeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: L2ERC721BridgeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class L2ERC721Bridge__factory extends ContractFactory {
  constructor(...args: L2ERC721BridgeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _l2CrossDomainMessenger: string,
    _l1ERC721Bridge: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<L2ERC721Bridge> {
    return super.deploy(
      _l2CrossDomainMessenger,
      _l1ERC721Bridge,
      overrides || {}
    ) as Promise<L2ERC721Bridge>;
  }
  getDeployTransaction(
    _l2CrossDomainMessenger: string,
    _l1ERC721Bridge: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _l2CrossDomainMessenger,
      _l1ERC721Bridge,
      overrides || {}
    );
  }
  attach(address: string): L2ERC721Bridge {
    return super.attach(address) as L2ERC721Bridge;
  }
  connect(signer: Signer): L2ERC721Bridge__factory {
    return super.connect(signer) as L2ERC721Bridge__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): L2ERC721BridgeInterface {
    return new utils.Interface(_abi) as L2ERC721BridgeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): L2ERC721Bridge {
    return new Contract(address, _abi, signerOrProvider) as L2ERC721Bridge;
  }
}
