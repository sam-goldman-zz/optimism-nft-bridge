/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IL1ERC721Bridge,
  IL1ERC721BridgeInterface,
} from "../IL1ERC721Bridge";

const _abi = [
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
    name: "ERC721DepositInitiated",
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
    name: "ERC721WithdrawalFinalized",
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
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_l2Gas",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "depositERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
        name: "_l2Gas",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "depositERC721To",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
    name: "finalizeERC721Withdrawal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "l2ERC721Bridge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IL1ERC721Bridge__factory {
  static readonly abi = _abi;
  static createInterface(): IL1ERC721BridgeInterface {
    return new utils.Interface(_abi) as IL1ERC721BridgeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IL1ERC721Bridge {
    return new Contract(address, _abi, signerOrProvider) as IL1ERC721Bridge;
  }
}
