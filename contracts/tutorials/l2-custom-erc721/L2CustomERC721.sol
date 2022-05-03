// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
import { Lib_Strings } from "../../libraries/utils/Lib_Strings.sol";
import { IERC721Receiver } from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../../standards/IL2StandardERC721.sol";
import "../../L2/messaging/IL2ERC721Bridge.sol";
import "../../L2/messaging/IL2StandardERC721Factory.sol";

contract L2CustomERC721 is IERC721Receiver, IL2StandardERC721, ERC721 {
    address public l1Token;
    address public l2StandardERC721;
    string public baseTokenURI;

    /**
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC721 name.
     * @param _symbol ERC721 symbol.
     */
    constructor(
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        l1Token = _l1Token;

        // Address of the L2 Standard ERC721 that corresponds to the L1 ERC721 that was passed into the constructor.
        l2StandardERC721 = IL2StandardERC721Factory(
            Lib_PredeployAddresses.L2_STANDARD_ERC721_FACTORY).standardERC721Mapping(_l1Token);

        // Creates a base URI in the format specified by EIP-681:
        // https://eips.ethereum.org/EIPS/eip-681
        baseTokenURI = string(abi.encodePacked(
            "ethereum:0x",
            Lib_Strings.toAsciiString(_l1Token),
            "@42/tokenURI?uint256="
        ));
    }

    modifier onlyL2Bridge() {
        require(msg.sender == Lib_PredeployAddresses.L2_ERC721_BRIDGE, "Only L2 Bridge can mint and burn");
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
     * @dev Withdraws the token ID to L1. This function should only be used for tokens
     *      that were consolidated from the Standard ERC721 contract. Otherwise,
     *      use L2ERC721Bridge.withdraw or withdrawTo instead.
     * @param _to Account to give the withdrawal to on L1.
     * @param _tokenId Token ID of the token to withdraw.
     */
    function withdrawToL1(address _to, uint _tokenId) external {
        require(
            msg.sender == ownerOf(_tokenId),
            "Only the NFT owner can withdraw to L1"
        );

        // Burn the withdrawer's NFT to prevent further L2 usage
        _burn(_tokenId);

        IL2ERC721Bridge(Lib_PredeployAddresses.L2_ERC721_BRIDGE).withdrawTo(
            l2StandardERC721,
            _to,
            _tokenId,
            0, // no need to forward any gas to l1
            '' // empty bytes string
        );

        emit Burn(msg.sender, _tokenId);
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
            msg.sender == l2StandardERC721,
            "Must be called by the correct L2 Standard ERC721"
        );

        // Mints token ID to the true owner of the NFT
        _safeMint(from, tokenId);

        return IERC721Receiver.onERC721Received.selector;
    }
}
