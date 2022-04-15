// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import { Lib_PredeployAddresses } from "../libraries/constants/Lib_PredeployAddresses.sol";
import "./IL2StandardERC721.sol";

contract L2StandardERC721 is IL2StandardERC721, ERC721 {
    address public l1Token;
    address public l2Bridge;
    string public baseTokenURI;

    /**
     * @param _l2Bridge Address of the L2 standard bridge.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC721 name.
     * @param _symbol ERC721 symbol.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;

        bytes memory l1TokenStr = abi.encodePacked(l1Token);

        // Creates a string for the baseURI according to the URL format specified in
        // EIP-681: https://eips.ethereum.org/EIPS/eip-681.
        baseTokenURI = string(abi.encodePacked(
            "ethereum:",
            l1TokenStr,
            "@42/tokenURI?uint256="
        ));
    }

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }

    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public view override(ERC721, IERC165) returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC721.l1Token.selector ^
            IL2StandardERC721.mint.selector ^
            IL2StandardERC721.burn.selector;
        return
            _interfaceId == firstSupportedInterface ||
            _interfaceId == secondSupportedInterface ||
            super.supportsInterface(_interfaceId);
    }

    // slither-disable-next-line external-function
    function mint(address _to, uint256 _tokenId) public virtual onlyL2Bridge {
        _safeMint(_to, _tokenId);

        emit Mint(_to, _tokenId);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _tokenId) public virtual onlyL2Bridge {
        _burn(_tokenId);

        emit Burn(_from, _tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }
}
