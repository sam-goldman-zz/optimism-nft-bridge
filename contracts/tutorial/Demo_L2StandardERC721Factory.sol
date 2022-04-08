// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Contract Imports */
import { L2StandardERC721 } from "../standards/L2StandardERC721.sol";

/**
 * @title Demo L2StandardERC721Factory
 * @dev Demo L2StandardERC721FactoryFactory for the ERC721 Bridge tutorial.
 * This contract is the exact same as L2StandardERC721Factory with one difference:
 * here, we pass the L2ERC721Bridge address into the constructor, instead of using 
 * Lib_PredeployAddresses.L2_ERC721_BRIDGE. This allows us to run the tutorial locally.
 */
contract Demo_L2StandardERC721Factory  {
    event StandardL2ERC721Created(address indexed _l1Token, address indexed _l2Token);

    // Maps an L2 ERC721 token address to a boolean that returns true if the token was created
    // with the L2StandardERC721Factory.
    mapping(address => bool) public isStandardERC721;

    // Declare the L2ERC721Bridge address
    address l2Bridge;

    // We pass in the L2ERC721Bridge address here instead of using Lib_PredeployAddresses.L2_ERC721_BRIDGE.
    constructor(address _l2Bridge) {
        l2Bridge = _l2Bridge;
    }

    /**
     * @dev Creates an instance of the standard ERC721 token on L2.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC721 name.
     * @param _symbol ERC721 symbol.
     */
    function createStandardL2ERC721(
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) external {
        require(_l1Token != address(0), "Must provide L1 token address");

        L2StandardERC721 l2Token = new L2StandardERC721(
            l2Bridge, // In the L2StandardERC721Factory contract, this line is Lib_PredeployAddresses.L2_ERC721_BRIDGE
            _l1Token,
            _name,
            _symbol
        );

        isStandardERC721[address(l2Token)] = true;
        emit StandardL2ERC721Created(_l1Token, address(l2Token));
    }
}
