// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title IL2StandardERC721Factory
 */
interface IL2StandardERC721Factory {
    event StandardL2ERC721Created(address indexed _l1Token, address indexed _l2Token);

    /**
     * @dev Maps an L2 ERC721 token address to a boolean that returns true if the token was created
     * with the L2StandardERC721Factory.
     */
    function isStandardERC721(address _account) external view returns (bool);

    /**
     * @dev Maps an L1 ERC721 token address to an L2 Standard ERC721 token address. This mapping can
     * only be updated once per L1 ERC721 token.
     */
    function standardERC721Mapping(address _account) external view returns (address);

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
    ) external;
}
