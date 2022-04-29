// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title L1ERC721
 * @dev A simple ERC721 contract for the tutorial
 */
contract L1ERC721 is ERC721 {
  uint private tokenId;
  string private baseTokenURI;

  constructor() ERC721("L1ERC721", "ERC") {}

  function mint() external {
    _safeMint(msg.sender, tokenId);
    tokenId += 1;
  }

  function _baseURI() internal view override returns (string memory) {
      return baseTokenURI;
  }

  function setBaseURI(string memory _baseTokenURI) public {
    require(bytes(baseTokenURI).length == 0, "Base URI has already been set");
    baseTokenURI = _baseTokenURI;
  }
}
