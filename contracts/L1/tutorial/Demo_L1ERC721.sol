// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title L1ERC721
 * @dev A simple ERC721 contract
 */
contract L1ERC721 is ERC721 {
  uint private _tokenId;

  constructor() ERC721("L1ERC721", "ERC") {}

  function mint() external {
    _tokenId += 1;
    _safeMint(msg.sender, _tokenId);
  }
}
