// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Contract Imports */
import { L2StandardERC721 } from "../../standards/L2StandardERC721.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
import { IL2StandardERC721Factory } from './IL2StandardERC721Factory.sol';

/**
 * @title L2StandardERC721Factory
 * @dev Factory contract for creating standard L2 ERC721 representations of L1 ERC721s
 * compatible with and working on the NFT bridge.
 */
contract L2StandardERC721Factory is IL2StandardERC721Factory{
    mapping(address => bool) public isStandardERC721;

    mapping(address => address) public standardERC721Mapping;

    /**
     * @inheritdoc IL2StandardERC721Factory
     */
    function createStandardL2ERC721(
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) external {
        require(_l1Token != address(0), "Must provide L1 token address");

        require(
            standardERC721Mapping[_l1Token] == address(0),
            "L2 Standard Token already exists for this L1 Token"
        );

        L2StandardERC721 l2Token = new L2StandardERC721(
            Lib_PredeployAddresses.L2_ERC721_BRIDGE,
            _l1Token,
            _name,
            _symbol
        );

        isStandardERC721[address(l2Token)] = true;
        standardERC721Mapping[_l1Token] = address(l2Token);
        emit StandardL2ERC721Created(_l1Token, address(l2Token));
    }
}
