/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  OVMSequencerFeeVault,
  OVMSequencerFeeVaultInterface,
} from "../OVMSequencerFeeVault";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1FeeWallet",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "MIN_WITHDRAWAL_AMOUNT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "l1FeeWallet",
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
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516103de3803806103de83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b61034b806100936000396000f3fe6080604052600436106100385760003560e01c80633ccfd60b14610044578063d3e5792b1461005b578063d4ff92181461008a57600080fd5b3661003f57005b600080fd5b34801561005057600080fd5b506100596100dc565b005b34801561006757600080fd5b5061007767d02ab486cedc000081565b6040519081526020015b60405180910390f35b34801561009657600080fd5b506000546100b79073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610081565b67d02ab486cedc000047101561019e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152605760248201527f4f564d5f53657175656e6365724665655661756c743a2077697468647261776160448201527f6c20616d6f756e74206d7573742062652067726561746572207468616e206d6960648201527f6e696d756d207769746864726177616c20616d6f756e74000000000000000000608482015260a40160405180910390fd5b600080546040805160208101825283815290517fa3a795480000000000000000000000000000000000000000000000000000000081527342000000000000000000000000000000000000109363a3a79548936102309373deaddeaddeaddeaddeaddeaddeaddeaddead00009373ffffffffffffffffffffffffffffffffffffffff909216924792909190600401610264565b600060405180830381600087803b15801561024a57600080fd5b505af115801561025e573d6000803e3d6000fd5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff808816835260208188168185015286604085015263ffffffff8616606085015260a06080850152845191508160a085015260005b828110156102cb5785810182015185820160c0015281016102af565b828111156102dd57600060c084870101525b5050601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160c001969550505050505056fea2646970667358221220d949904a2b10be8ee310b558aeaa7f2acc61d1a70cf0916d169be0dbb4a7b72f64736f6c63430008090033";

type OVMSequencerFeeVaultConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OVMSequencerFeeVaultConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OVMSequencerFeeVault__factory extends ContractFactory {
  constructor(...args: OVMSequencerFeeVaultConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _l1FeeWallet: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<OVMSequencerFeeVault> {
    return super.deploy(
      _l1FeeWallet,
      overrides || {}
    ) as Promise<OVMSequencerFeeVault>;
  }
  getDeployTransaction(
    _l1FeeWallet: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_l1FeeWallet, overrides || {});
  }
  attach(address: string): OVMSequencerFeeVault {
    return super.attach(address) as OVMSequencerFeeVault;
  }
  connect(signer: Signer): OVMSequencerFeeVault__factory {
    return super.connect(signer) as OVMSequencerFeeVault__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OVMSequencerFeeVaultInterface {
    return new utils.Interface(_abi) as OVMSequencerFeeVaultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OVMSequencerFeeVault {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OVMSequencerFeeVault;
  }
}
