// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title Lib_Strings
 * @dev This library implements a function to convert an address to a human-readable string.
 * It uses the implementation written by tkeber:
 * https://ethereum.stackexchange.com/questions/8346/convert-address-to-string/8447#8447
 */
library Lib_Strings {
    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}
