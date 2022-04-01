// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title Lib_PredeployAddresses
 */
library Lib_PredeployAddresses {
    address internal constant L2_TO_L1_MESSAGE_PASSER = 0x4200000000000000000000000000000000000000;
    address internal constant L1_MESSAGE_SENDER = 0x4200000000000000000000000000000000000001;
    address internal constant DEPLOYER_WHITELIST = 0x4200000000000000000000000000000000000002;
    address payable internal constant OVM_ETH = payable(0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000);
    address internal constant L2_CROSS_DOMAIN_MESSENGER =
        0x4200000000000000000000000000000000000007;
    address internal constant LIB_ADDRESS_MANAGER = 0x4200000000000000000000000000000000000008;
    address internal constant PROXY_EOA = 0x4200000000000000000000000000000000000009;
    address internal constant L2_STANDARD_BRIDGE = 0x4200000000000000000000000000000000000010;
    address internal constant SEQUENCER_FEE_WALLET = 0x4200000000000000000000000000000000000011;
    address internal constant L2_STANDARD_TOKEN_FACTORY =
        0x4200000000000000000000000000000000000012;
    address internal constant L1_BLOCK_NUMBER = 0x4200000000000000000000000000000000000013;
    
    // Placeholders (these addresses are just for demonstration purposes):
    address internal constant L2_ERC721_BRIDGE = 0x4200000000000000000000000000000000000043;
    // This is the address of the first account returned by ethers.getSigners on the local network
    address internal constant TOKENURI_ADMIN = 0x17ec8597ff92C3F44523bDc65BF0f1bE632917ff;
}
