/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "PausableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableUpgradeable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IL1ChugSplashDeployer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IL1ChugSplashDeployer__factory>;
    getContractFactory(
      name: "L1ChugSplashProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L1ChugSplashProxy__factory>;
    getContractFactory(
      name: "AddressDictator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AddressDictator__factory>;
    getContractFactory(
      name: "ChugSplashDictator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ChugSplashDictator__factory>;
    getContractFactory(
      name: "IL1CrossDomainMessenger",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IL1CrossDomainMessenger__factory>;
    getContractFactory(
      name: "IL1ERC20Bridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IL1ERC20Bridge__factory>;
    getContractFactory(
      name: "IL1ERC721Bridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IL1ERC721Bridge__factory>;
    getContractFactory(
      name: "IL1StandardBridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IL1StandardBridge__factory>;
    getContractFactory(
      name: "L1CrossDomainMessenger",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L1CrossDomainMessenger__factory>;
    getContractFactory(
      name: "L1ERC721Bridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L1ERC721Bridge__factory>;
    getContractFactory(
      name: "L1StandardBridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L1StandardBridge__factory>;
    getContractFactory(
      name: "CanonicalTransactionChain",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CanonicalTransactionChain__factory>;
    getContractFactory(
      name: "ChainStorageContainer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ChainStorageContainer__factory>;
    getContractFactory(
      name: "ICanonicalTransactionChain",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICanonicalTransactionChain__factory>;
    getContractFactory(
      name: "IChainStorageContainer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IChainStorageContainer__factory>;
    getContractFactory(
      name: "IStateCommitmentChain",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStateCommitmentChain__factory>;
    getContractFactory(
      name: "StateCommitmentChain",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StateCommitmentChain__factory>;
    getContractFactory(
      name: "TeleportrDeposit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TeleportrDeposit__factory>;
    getContractFactory(
      name: "BondManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BondManager__factory>;
    getContractFactory(
      name: "IBondManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBondManager__factory>;
    getContractFactory(
      name: "IL2CrossDomainMessenger",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IL2CrossDomainMessenger__factory>;
    getContractFactory(
      name: "IL2ERC20Bridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IL2ERC20Bridge__factory>;
    getContractFactory(
      name: "IL2ERC721Bridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IL2ERC721Bridge__factory>;
    getContractFactory(
      name: "L2CrossDomainMessenger",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L2CrossDomainMessenger__factory>;
    getContractFactory(
      name: "L2ERC721Bridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L2ERC721Bridge__factory>;
    getContractFactory(
      name: "L2StandardBridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L2StandardBridge__factory>;
    getContractFactory(
      name: "L2StandardTokenFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L2StandardTokenFactory__factory>;
    getContractFactory(
      name: "IOVML1BlockNumber",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOVML1BlockNumber__factory>;
    getContractFactory(
      name: "IOVML2ToL1MessagePasser",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOVML2ToL1MessagePasser__factory>;
    getContractFactory(
      name: "OVMDeployerWhitelist",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OVMDeployerWhitelist__factory>;
    getContractFactory(
      name: "OVMETH",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OVMETH__factory>;
    getContractFactory(
      name: "OVMGasPriceOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OVMGasPriceOracle__factory>;
    getContractFactory(
      name: "OVML2ToL1MessagePasser",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OVML2ToL1MessagePasser__factory>;
    getContractFactory(
      name: "OVMSequencerFeeVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OVMSequencerFeeVault__factory>;
    getContractFactory(
      name: "WETH9",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WETH9__factory>;
    getContractFactory(
      name: "TeleportrDisburser",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TeleportrDisburser__factory>;
    getContractFactory(
      name: "CrossDomainEnabled",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CrossDomainEnabled__factory>;
    getContractFactory(
      name: "ICrossDomainMessenger",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICrossDomainMessenger__factory>;
    getContractFactory(
      name: "LibAddressManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LibAddressManager__factory>;
    getContractFactory(
      name: "LibAddressResolver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LibAddressResolver__factory>;
    getContractFactory(
      name: "LibResolvedDelegateProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LibResolvedDelegateProxy__factory>;
    getContractFactory(
      name: "IL2StandardERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IL2StandardERC20__factory>;
    getContractFactory(
      name: "IL2StandardERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IL2StandardERC721__factory>;
    getContractFactory(
      name: "L2StandardERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L2StandardERC20__factory>;
    getContractFactory(
      name: "L2StandardERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.L2StandardERC721__factory>;
    getContractFactory(
      name: "FailingReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FailingReceiver__factory>;
    getContractFactory(
      name: "HelperSimpleProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HelperSimpleProxy__factory>;
    getContractFactory(
      name: "TestERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestERC20__factory>;
    getContractFactory(
      name: "TestLibCrossDomainUtils",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestLibCrossDomainUtils__factory>;
    getContractFactory(
      name: "TestLibOVMCodec",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestLibOVMCodec__factory>;
    getContractFactory(
      name: "TestLibRLPReader",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestLibRLPReader__factory>;
    getContractFactory(
      name: "TestLibRLPWriter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestLibRLPWriter__factory>;
    getContractFactory(
      name: "TestLibAddressAliasHelper",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestLibAddressAliasHelper__factory>;
    getContractFactory(
      name: "TestLibMerkleTrie",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestLibMerkleTrie__factory>;
    getContractFactory(
      name: "TestLibSecureMerkleTrie",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestLibSecureMerkleTrie__factory>;
    getContractFactory(
      name: "TestLibBuffer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestLibBuffer__factory>;
    getContractFactory(
      name: "TestLibBytes32Utils",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestLibBytes32Utils__factory>;
    getContractFactory(
      name: "TestLibBytesUtils",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestLibBytesUtils__factory>;
    getContractFactory(
      name: "TestLibMerkleTree",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestLibMerkleTree__factory>;

    getContractAt(
      name: "OwnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "PausableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PausableUpgradeable>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IL1ChugSplashDeployer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IL1ChugSplashDeployer>;
    getContractAt(
      name: "L1ChugSplashProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L1ChugSplashProxy>;
    getContractAt(
      name: "AddressDictator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AddressDictator>;
    getContractAt(
      name: "ChugSplashDictator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ChugSplashDictator>;
    getContractAt(
      name: "IL1CrossDomainMessenger",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IL1CrossDomainMessenger>;
    getContractAt(
      name: "IL1ERC20Bridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IL1ERC20Bridge>;
    getContractAt(
      name: "IL1ERC721Bridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IL1ERC721Bridge>;
    getContractAt(
      name: "IL1StandardBridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IL1StandardBridge>;
    getContractAt(
      name: "L1CrossDomainMessenger",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L1CrossDomainMessenger>;
    getContractAt(
      name: "L1ERC721Bridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L1ERC721Bridge>;
    getContractAt(
      name: "L1StandardBridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L1StandardBridge>;
    getContractAt(
      name: "CanonicalTransactionChain",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CanonicalTransactionChain>;
    getContractAt(
      name: "ChainStorageContainer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ChainStorageContainer>;
    getContractAt(
      name: "ICanonicalTransactionChain",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICanonicalTransactionChain>;
    getContractAt(
      name: "IChainStorageContainer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IChainStorageContainer>;
    getContractAt(
      name: "IStateCommitmentChain",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStateCommitmentChain>;
    getContractAt(
      name: "StateCommitmentChain",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StateCommitmentChain>;
    getContractAt(
      name: "TeleportrDeposit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TeleportrDeposit>;
    getContractAt(
      name: "BondManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BondManager>;
    getContractAt(
      name: "IBondManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBondManager>;
    getContractAt(
      name: "IL2CrossDomainMessenger",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IL2CrossDomainMessenger>;
    getContractAt(
      name: "IL2ERC20Bridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IL2ERC20Bridge>;
    getContractAt(
      name: "IL2ERC721Bridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IL2ERC721Bridge>;
    getContractAt(
      name: "L2CrossDomainMessenger",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L2CrossDomainMessenger>;
    getContractAt(
      name: "L2ERC721Bridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L2ERC721Bridge>;
    getContractAt(
      name: "L2StandardBridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L2StandardBridge>;
    getContractAt(
      name: "L2StandardTokenFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L2StandardTokenFactory>;
    getContractAt(
      name: "IOVML1BlockNumber",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOVML1BlockNumber>;
    getContractAt(
      name: "IOVML2ToL1MessagePasser",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOVML2ToL1MessagePasser>;
    getContractAt(
      name: "OVMDeployerWhitelist",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OVMDeployerWhitelist>;
    getContractAt(
      name: "OVMETH",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OVMETH>;
    getContractAt(
      name: "OVMGasPriceOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OVMGasPriceOracle>;
    getContractAt(
      name: "OVML2ToL1MessagePasser",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OVML2ToL1MessagePasser>;
    getContractAt(
      name: "OVMSequencerFeeVault",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OVMSequencerFeeVault>;
    getContractAt(
      name: "WETH9",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WETH9>;
    getContractAt(
      name: "TeleportrDisburser",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TeleportrDisburser>;
    getContractAt(
      name: "CrossDomainEnabled",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CrossDomainEnabled>;
    getContractAt(
      name: "ICrossDomainMessenger",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICrossDomainMessenger>;
    getContractAt(
      name: "LibAddressManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LibAddressManager>;
    getContractAt(
      name: "LibAddressResolver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LibAddressResolver>;
    getContractAt(
      name: "LibResolvedDelegateProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LibResolvedDelegateProxy>;
    getContractAt(
      name: "IL2StandardERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IL2StandardERC20>;
    getContractAt(
      name: "IL2StandardERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IL2StandardERC721>;
    getContractAt(
      name: "L2StandardERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L2StandardERC20>;
    getContractAt(
      name: "L2StandardERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.L2StandardERC721>;
    getContractAt(
      name: "FailingReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FailingReceiver>;
    getContractAt(
      name: "HelperSimpleProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HelperSimpleProxy>;
    getContractAt(
      name: "TestERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestERC20>;
    getContractAt(
      name: "TestLibCrossDomainUtils",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestLibCrossDomainUtils>;
    getContractAt(
      name: "TestLibOVMCodec",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestLibOVMCodec>;
    getContractAt(
      name: "TestLibRLPReader",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestLibRLPReader>;
    getContractAt(
      name: "TestLibRLPWriter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestLibRLPWriter>;
    getContractAt(
      name: "TestLibAddressAliasHelper",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestLibAddressAliasHelper>;
    getContractAt(
      name: "TestLibMerkleTrie",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestLibMerkleTrie>;
    getContractAt(
      name: "TestLibSecureMerkleTrie",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestLibSecureMerkleTrie>;
    getContractAt(
      name: "TestLibBuffer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestLibBuffer>;
    getContractAt(
      name: "TestLibBytes32Utils",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestLibBytes32Utils>;
    getContractAt(
      name: "TestLibBytesUtils",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestLibBytesUtils>;
    getContractAt(
      name: "TestLibMerkleTree",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestLibMerkleTree>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
