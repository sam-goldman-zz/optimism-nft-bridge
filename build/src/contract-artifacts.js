"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractArtifact = void 0;
let iL1ChugSplashDeployer;
try {
    iL1ChugSplashDeployer = require('../artifacts/contracts/chugsplash/interfaces/iL1ChugSplashDeployer.sol/iL1ChugSplashDeployer.json');
}
catch (_a) { }
let L1ChugSplashProxy;
try {
    L1ChugSplashProxy = require('../artifacts/contracts/chugsplash/L1ChugSplashProxy.sol/L1ChugSplashProxy.json');
}
catch (_b) { }
let AddressDictator;
try {
    AddressDictator = require('../artifacts/contracts/L1/deployment/AddressDictator.sol/AddressDictator.json');
}
catch (_c) { }
let ChugSplashDictator;
try {
    ChugSplashDictator = require('../artifacts/contracts/L1/deployment/ChugSplashDictator.sol/ChugSplashDictator.json');
}
catch (_d) { }
let IL1CrossDomainMessenger;
try {
    IL1CrossDomainMessenger = require('../artifacts/contracts/L1/messaging/IL1CrossDomainMessenger.sol/IL1CrossDomainMessenger.json');
}
catch (_e) { }
let IL1ERC20Bridge;
try {
    IL1ERC20Bridge = require('../artifacts/contracts/L1/messaging/IL1ERC20Bridge.sol/IL1ERC20Bridge.json');
}
catch (_f) { }
let IL1ERC721Bridge;
try {
    IL1ERC721Bridge = require('../artifacts/contracts/L1/messaging/IL1ERC721Bridge.sol/IL1ERC721Bridge.json');
}
catch (_g) { }
let IL1StandardBridge;
try {
    IL1StandardBridge = require('../artifacts/contracts/L1/messaging/IL1StandardBridge.sol/IL1StandardBridge.json');
}
catch (_h) { }
let L1CrossDomainMessenger;
try {
    L1CrossDomainMessenger = require('../artifacts/contracts/L1/messaging/L1CrossDomainMessenger.sol/L1CrossDomainMessenger.json');
}
catch (_j) { }
let L1ERC721Bridge;
try {
    L1ERC721Bridge = require('../artifacts/contracts/L1/messaging/L1ERC721Bridge.sol/L1ERC721Bridge.json');
}
catch (_k) { }
let L1StandardBridge;
try {
    L1StandardBridge = require('../artifacts/contracts/L1/messaging/L1StandardBridge.sol/L1StandardBridge.json');
}
catch (_l) { }
let CanonicalTransactionChain;
try {
    CanonicalTransactionChain = require('../artifacts/contracts/L1/rollup/CanonicalTransactionChain.sol/CanonicalTransactionChain.json');
}
catch (_m) { }
let ChainStorageContainer;
try {
    ChainStorageContainer = require('../artifacts/contracts/L1/rollup/ChainStorageContainer.sol/ChainStorageContainer.json');
}
catch (_o) { }
let ICanonicalTransactionChain;
try {
    ICanonicalTransactionChain = require('../artifacts/contracts/L1/rollup/ICanonicalTransactionChain.sol/ICanonicalTransactionChain.json');
}
catch (_p) { }
let IChainStorageContainer;
try {
    IChainStorageContainer = require('../artifacts/contracts/L1/rollup/IChainStorageContainer.sol/IChainStorageContainer.json');
}
catch (_q) { }
let IStateCommitmentChain;
try {
    IStateCommitmentChain = require('../artifacts/contracts/L1/rollup/IStateCommitmentChain.sol/IStateCommitmentChain.json');
}
catch (_r) { }
let StateCommitmentChain;
try {
    StateCommitmentChain = require('../artifacts/contracts/L1/rollup/StateCommitmentChain.sol/StateCommitmentChain.json');
}
catch (_s) { }
let TeleportrDeposit;
try {
    TeleportrDeposit = require('../artifacts/contracts/L1/teleportr/TeleportrDeposit.sol/TeleportrDeposit.json');
}
catch (_t) { }
let BondManager;
try {
    BondManager = require('../artifacts/contracts/L1/verification/BondManager.sol/BondManager.json');
}
catch (_u) { }
let IBondManager;
try {
    IBondManager = require('../artifacts/contracts/L1/verification/IBondManager.sol/IBondManager.json');
}
catch (_v) { }
let IL2CrossDomainMessenger;
try {
    IL2CrossDomainMessenger = require('../artifacts/contracts/L2/messaging/IL2CrossDomainMessenger.sol/IL2CrossDomainMessenger.json');
}
catch (_w) { }
let IL2ERC20Bridge;
try {
    IL2ERC20Bridge = require('../artifacts/contracts/L2/messaging/IL2ERC20Bridge.sol/IL2ERC20Bridge.json');
}
catch (_x) { }
let IL2ERC721Bridge;
try {
    IL2ERC721Bridge = require('../artifacts/contracts/L2/messaging/IL2ERC721Bridge.sol/IL2ERC721Bridge.json');
}
catch (_y) { }
let L2CrossDomainMessenger;
try {
    L2CrossDomainMessenger = require('../artifacts/contracts/L2/messaging/L2CrossDomainMessenger.sol/L2CrossDomainMessenger.json');
}
catch (_z) { }
let L2ERC721Bridge;
try {
    L2ERC721Bridge = require('../artifacts/contracts/L2/messaging/L2ERC721Bridge.sol/L2ERC721Bridge.json');
}
catch (_0) { }
let L2StandardBridge;
try {
    L2StandardBridge = require('../artifacts/contracts/L2/messaging/L2StandardBridge.sol/L2StandardBridge.json');
}
catch (_1) { }
let L2StandardTokenFactory;
try {
    L2StandardTokenFactory = require('../artifacts/contracts/L2/messaging/L2StandardTokenFactory.sol/L2StandardTokenFactory.json');
}
catch (_2) { }
let iOVM_L1BlockNumber;
try {
    iOVM_L1BlockNumber = require('../artifacts/contracts/L2/predeploys/iOVM_L1BlockNumber.sol/iOVM_L1BlockNumber.json');
}
catch (_3) { }
let iOVM_L2ToL1MessagePasser;
try {
    iOVM_L2ToL1MessagePasser = require('../artifacts/contracts/L2/predeploys/iOVM_L2ToL1MessagePasser.sol/iOVM_L2ToL1MessagePasser.json');
}
catch (_4) { }
let OVM_DeployerWhitelist;
try {
    OVM_DeployerWhitelist = require('../artifacts/contracts/L2/predeploys/OVM_DeployerWhitelist.sol/OVM_DeployerWhitelist.json');
}
catch (_5) { }
let OVM_ETH;
try {
    OVM_ETH = require('../artifacts/contracts/L2/predeploys/OVM_ETH.sol/OVM_ETH.json');
}
catch (_6) { }
let OVM_GasPriceOracle;
try {
    OVM_GasPriceOracle = require('../artifacts/contracts/L2/predeploys/OVM_GasPriceOracle.sol/OVM_GasPriceOracle.json');
}
catch (_7) { }
let OVM_L2ToL1MessagePasser;
try {
    OVM_L2ToL1MessagePasser = require('../artifacts/contracts/L2/predeploys/OVM_L2ToL1MessagePasser.sol/OVM_L2ToL1MessagePasser.json');
}
catch (_8) { }
let OVM_SequencerFeeVault;
try {
    OVM_SequencerFeeVault = require('../artifacts/contracts/L2/predeploys/OVM_SequencerFeeVault.sol/OVM_SequencerFeeVault.json');
}
catch (_9) { }
let WETH9;
try {
    WETH9 = require('../artifacts/contracts/L2/predeploys/WETH9.sol/WETH9.json');
}
catch (_10) { }
let TeleportrDisburser;
try {
    TeleportrDisburser = require('../artifacts/contracts/L2/teleportr/TeleportrDisburser.sol/TeleportrDisburser.json');
}
catch (_11) { }
let CrossDomainEnabled;
try {
    CrossDomainEnabled = require('../artifacts/contracts/libraries/bridge/CrossDomainEnabled.sol/CrossDomainEnabled.json');
}
catch (_12) { }
let ICrossDomainMessenger;
try {
    ICrossDomainMessenger = require('../artifacts/contracts/libraries/bridge/ICrossDomainMessenger.sol/ICrossDomainMessenger.json');
}
catch (_13) { }
let Lib_CrossDomainUtils;
try {
    Lib_CrossDomainUtils = require('../artifacts/contracts/libraries/bridge/Lib_CrossDomainUtils.sol/Lib_CrossDomainUtils.json');
}
catch (_14) { }
let Lib_OVMCodec;
try {
    Lib_OVMCodec = require('../artifacts/contracts/libraries/codec/Lib_OVMCodec.sol/Lib_OVMCodec.json');
}
catch (_15) { }
let Lib_DefaultValues;
try {
    Lib_DefaultValues = require('../artifacts/contracts/libraries/constants/Lib_DefaultValues.sol/Lib_DefaultValues.json');
}
catch (_16) { }
let Lib_PredeployAddresses;
try {
    Lib_PredeployAddresses = require('../artifacts/contracts/libraries/constants/Lib_PredeployAddresses.sol/Lib_PredeployAddresses.json');
}
catch (_17) { }
let Lib_AddressManager;
try {
    Lib_AddressManager = require('../artifacts/contracts/libraries/resolver/Lib_AddressManager.sol/Lib_AddressManager.json');
}
catch (_18) { }
let Lib_AddressResolver;
try {
    Lib_AddressResolver = require('../artifacts/contracts/libraries/resolver/Lib_AddressResolver.sol/Lib_AddressResolver.json');
}
catch (_19) { }
let Lib_ResolvedDelegateProxy;
try {
    Lib_ResolvedDelegateProxy = require('../artifacts/contracts/libraries/resolver/Lib_ResolvedDelegateProxy.sol/Lib_ResolvedDelegateProxy.json');
}
catch (_20) { }
let Lib_RLPReader;
try {
    Lib_RLPReader = require('../artifacts/contracts/libraries/rlp/Lib_RLPReader.sol/Lib_RLPReader.json');
}
catch (_21) { }
let Lib_RLPWriter;
try {
    Lib_RLPWriter = require('../artifacts/contracts/libraries/rlp/Lib_RLPWriter.sol/Lib_RLPWriter.json');
}
catch (_22) { }
let Lib_MerkleTrie;
try {
    Lib_MerkleTrie = require('../artifacts/contracts/libraries/trie/Lib_MerkleTrie.sol/Lib_MerkleTrie.json');
}
catch (_23) { }
let Lib_SecureMerkleTrie;
try {
    Lib_SecureMerkleTrie = require('../artifacts/contracts/libraries/trie/Lib_SecureMerkleTrie.sol/Lib_SecureMerkleTrie.json');
}
catch (_24) { }
let Lib_Buffer;
try {
    Lib_Buffer = require('../artifacts/contracts/libraries/utils/Lib_Buffer.sol/Lib_Buffer.json');
}
catch (_25) { }
let Lib_Bytes32Utils;
try {
    Lib_Bytes32Utils = require('../artifacts/contracts/libraries/utils/Lib_Bytes32Utils.sol/Lib_Bytes32Utils.json');
}
catch (_26) { }
let Lib_BytesUtils;
try {
    Lib_BytesUtils = require('../artifacts/contracts/libraries/utils/Lib_BytesUtils.sol/Lib_BytesUtils.json');
}
catch (_27) { }
let Lib_MerkleTree;
try {
    Lib_MerkleTree = require('../artifacts/contracts/libraries/utils/Lib_MerkleTree.sol/Lib_MerkleTree.json');
}
catch (_28) { }
let AddressAliasHelper;
try {
    AddressAliasHelper = require('../artifacts/contracts/standards/AddressAliasHelper.sol/AddressAliasHelper.json');
}
catch (_29) { }
let IL2StandardERC20;
try {
    IL2StandardERC20 = require('../artifacts/contracts/standards/IL2StandardERC20.sol/IL2StandardERC20.json');
}
catch (_30) { }
let IL2StandardERC721;
try {
    IL2StandardERC721 = require('../artifacts/contracts/standards/IL2StandardERC721.sol/IL2StandardERC721.json');
}
catch (_31) { }
let L2StandardERC20;
try {
    L2StandardERC20 = require('../artifacts/contracts/standards/L2StandardERC20.sol/L2StandardERC20.json');
}
catch (_32) { }
let L2StandardERC721;
try {
    L2StandardERC721 = require('../artifacts/contracts/standards/L2StandardERC721.sol/L2StandardERC721.json');
}
catch (_33) { }
let FailingReceiver;
try {
    FailingReceiver = require('../artifacts/contracts/test-helpers/FailingReceiver.sol/FailingReceiver.json');
}
catch (_34) { }
let Helper_SimpleProxy;
try {
    Helper_SimpleProxy = require('../artifacts/contracts/test-helpers/Helper_SimpleProxy.sol/Helper_SimpleProxy.json');
}
catch (_35) { }
let TestERC20;
try {
    TestERC20 = require('../artifacts/contracts/test-helpers/TestERC20.sol/TestERC20.json');
}
catch (_36) { }
let TestLib_CrossDomainUtils;
try {
    TestLib_CrossDomainUtils = require('../artifacts/contracts/test-libraries/bridge/TestLib_CrossDomainUtils.sol/TestLib_CrossDomainUtils.json');
}
catch (_37) { }
let TestLib_OVMCodec;
try {
    TestLib_OVMCodec = require('../artifacts/contracts/test-libraries/codec/TestLib_OVMCodec.sol/TestLib_OVMCodec.json');
}
catch (_38) { }
let TestLib_RLPReader;
try {
    TestLib_RLPReader = require('../artifacts/contracts/test-libraries/rlp/TestLib_RLPReader.sol/TestLib_RLPReader.json');
}
catch (_39) { }
let TestLib_RLPWriter;
try {
    TestLib_RLPWriter = require('../artifacts/contracts/test-libraries/rlp/TestLib_RLPWriter.sol/TestLib_RLPWriter.json');
}
catch (_40) { }
let TestLib_AddressAliasHelper;
try {
    TestLib_AddressAliasHelper = require('../artifacts/contracts/test-libraries/standards/TestLib_AddressAliasHelper.sol/TestLib_AddressAliasHelper.json');
}
catch (_41) { }
let TestLib_MerkleTrie;
try {
    TestLib_MerkleTrie = require('../artifacts/contracts/test-libraries/trie/TestLib_MerkleTrie.sol/TestLib_MerkleTrie.json');
}
catch (_42) { }
let TestLib_SecureMerkleTrie;
try {
    TestLib_SecureMerkleTrie = require('../artifacts/contracts/test-libraries/trie/TestLib_SecureMerkleTrie.sol/TestLib_SecureMerkleTrie.json');
}
catch (_43) { }
let TestLib_Buffer;
try {
    TestLib_Buffer = require('../artifacts/contracts/test-libraries/utils/TestLib_Buffer.sol/TestLib_Buffer.json');
}
catch (_44) { }
let TestLib_Bytes32Utils;
try {
    TestLib_Bytes32Utils = require('../artifacts/contracts/test-libraries/utils/TestLib_Bytes32Utils.sol/TestLib_Bytes32Utils.json');
}
catch (_45) { }
let TestLib_BytesUtils;
try {
    TestLib_BytesUtils = require('../artifacts/contracts/test-libraries/utils/TestLib_BytesUtils.sol/TestLib_BytesUtils.json');
}
catch (_46) { }
let TestLib_MerkleTree;
try {
    TestLib_MerkleTree = require('../artifacts/contracts/test-libraries/utils/TestLib_MerkleTree.sol/TestLib_MerkleTree.json');
}
catch (_47) { }
const getContractArtifact = (name) => {
    return {
        iL1ChugSplashDeployer,
        L1ChugSplashProxy,
        AddressDictator,
        ChugSplashDictator,
        IL1CrossDomainMessenger,
        IL1ERC20Bridge,
        IL1ERC721Bridge,
        IL1StandardBridge,
        L1CrossDomainMessenger,
        L1ERC721Bridge,
        L1StandardBridge,
        CanonicalTransactionChain,
        ChainStorageContainer,
        ICanonicalTransactionChain,
        IChainStorageContainer,
        IStateCommitmentChain,
        StateCommitmentChain,
        TeleportrDeposit,
        BondManager,
        IBondManager,
        IL2CrossDomainMessenger,
        IL2ERC20Bridge,
        IL2ERC721Bridge,
        L2CrossDomainMessenger,
        L2ERC721Bridge,
        L2StandardBridge,
        L2StandardTokenFactory,
        iOVM_L1BlockNumber,
        iOVM_L2ToL1MessagePasser,
        OVM_DeployerWhitelist,
        OVM_ETH,
        OVM_GasPriceOracle,
        OVM_L2ToL1MessagePasser,
        OVM_SequencerFeeVault,
        WETH9,
        TeleportrDisburser,
        CrossDomainEnabled,
        ICrossDomainMessenger,
        Lib_CrossDomainUtils,
        Lib_OVMCodec,
        Lib_DefaultValues,
        Lib_PredeployAddresses,
        Lib_AddressManager,
        Lib_AddressResolver,
        Lib_ResolvedDelegateProxy,
        Lib_RLPReader,
        Lib_RLPWriter,
        Lib_MerkleTrie,
        Lib_SecureMerkleTrie,
        Lib_Buffer,
        Lib_Bytes32Utils,
        Lib_BytesUtils,
        Lib_MerkleTree,
        AddressAliasHelper,
        IL2StandardERC20,
        IL2StandardERC721,
        L2StandardERC20,
        L2StandardERC721,
        FailingReceiver,
        Helper_SimpleProxy,
        TestERC20,
        TestLib_CrossDomainUtils,
        TestLib_OVMCodec,
        TestLib_RLPReader,
        TestLib_RLPWriter,
        TestLib_AddressAliasHelper,
        TestLib_MerkleTrie,
        TestLib_SecureMerkleTrie,
        TestLib_Buffer,
        TestLib_Bytes32Utils,
        TestLib_BytesUtils,
        TestLib_MerkleTree
    }[name];
};
exports.getContractArtifact = getContractArtifact;
//# sourceMappingURL=contract-artifacts.js.map