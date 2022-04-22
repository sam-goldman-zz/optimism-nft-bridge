// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title L1ERC721
 * @dev A simple ERC721 contract for the tutorial
 */
contract L1ERC721 is ERC721URIStorage {
  uint private _tokenId;
  string private baseTokenURI;

  constructor() ERC721("L1ERC721", "ERC") {}

  function mint() external {
    _tokenId += 1;
    _safeMint(msg.sender, _tokenId);
  }

  function _baseURI() internal view override returns (string memory) {
      return baseTokenURI;
  }

  function setBaseURI(string memory _baseTokenURI) public {
    baseTokenURI = _baseTokenURI;
  }
}
