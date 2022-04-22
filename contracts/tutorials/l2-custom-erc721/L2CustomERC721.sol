// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
import { Lib_Strings } from "../../libraries/utils/Lib_Strings.sol";
import { IERC721Receiver } from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../../standards/IL2StandardERC721.sol";
import "../../L2/messaging/IL2StandardERC721Factory.sol";

contract L2CustomERC721 is IERC721Receiver, IL2StandardERC721, ERC721 {
    address public l1Token;
    address public l2Bridge;
    address public l2StandardERC721Factory;
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
        address _l2StandardERC721Factory,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
        l2StandardERC721Factory = _l2StandardERC721Factory;

        // Creates a base URI in the format specified by EIP-681:
        // https://eips.ethereum.org/EIPS/eip-681
        baseTokenURI = string(abi.encodePacked(
            "ethereum:0x",
            Lib_Strings.toAsciiString(_l1Token),
            "@42/tokenURI?uint256="
        ));
    }

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }

    function supportsInterface(bytes4 _interfaceId)
        public
        view
        override(ERC721, IERC165)
        returns (bool)
    {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC721.l1Token.selector ^
            IL2StandardERC721.mint.selector ^
            IL2StandardERC721.burn.selector;
        return
            _interfaceId == firstSupportedInterface ||
            _interfaceId == secondSupportedInterface ||
            super.supportsInterface(_interfaceId);
    }

    function mint(address _to, uint256 _tokenId) public virtual onlyL2Bridge {
        _safeMint(_to, _tokenId);

        emit Mint(_to, _tokenId);
    }

    function burn(address _from, uint256 _tokenId) public virtual onlyL2Bridge {
        _burn(_tokenId);

        emit Burn(_from, _tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /**
     * @inheritdoc IERC721Receiver
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        require(
            IL2StandardERC721Factory(l2StandardERC721Factory).isStandardERC721(msg.sender),
            "Transfer not sent from a Standard L2 ERC721 contract"
        );

        require(
            msg.sender == IL2StandardERC721Factory(l2StandardERC721Factory).standardERC721Mapping(l1Token),
            "Transfer sent from a Standard L2 ERC721 contract that does not map to the correct L1 ERC721"
        );

        // Mints token ID to the previous owner of the NFT
        _safeMint(from, tokenId);

        return IERC721Receiver.onERC721Received.selector;
    }
}
