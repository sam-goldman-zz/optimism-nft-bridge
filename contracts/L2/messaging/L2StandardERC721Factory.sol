// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Contract Imports */
import { L2StandardERC721 } from "../../standards/L2StandardERC721.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/**
 * @title L2StandardERC721Factory
 * @dev Factory contract for creating standard L2 ERC721 representations of L1 ERC721s
 * compatible with and working on the NFT bridge.
 */
contract L2StandardERC721Factory {
    event StandardL2ERC721Created(address indexed _l1Token, address indexed _l2Token);

    // Maps an L2 token address to a boolean representing whether or not the token was
    // created by the L2StandardERC721Factory. If the boolean value is true, then we 
    // can be sure that the L2 token is an instance of L2StandardERC721, and does not
    // contain any other methods.
    mapping(address => bool) public isStandardERC721;

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
            Lib_PredeployAddresses.L2_ERC721_BRIDGE,
            _l1Token,
            _name,
            _symbol
        );

        isStandardERC721[address(l2Token)] = true;
        emit StandardL2ERC721Created(_l1Token, address(l2Token));
    }
}
