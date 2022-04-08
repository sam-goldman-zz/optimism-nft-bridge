# Optimism NFT Bridge

A tutorial for this bridge is [here](https://github.com/sam-goldman/optimism-nft-bridge/tree/main/tutorial).

This repository is a clone of [Optimism’s Smart Contracts](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts), with the addition of a few files for the NFT bridge. This bridge allows users to transfer ERC721 tokens between L1 and Optimism in the same manner that they can transfer ERC20s using the [Standard Token Bridge](https://community.optimism.io/docs/developers/bridge/standard-bridge/#). The contracts have been tested locally.

## Setup

Clone the repo:
```shell
git clone https://github.com/sam-goldman/optimism-nft-bridge.git
cd optimism-nft-bridge
```

Install packages:
```shell
yarn install
```

Run the primary build script:
```shell
yarn build
```

## File structure

The relevant smart contracts and tests:

* [contracts/](./contracts)
  * [L1/](./contracts/L1)
    * [messaging/](./contracts/L1/messaging)
      * [IL1ERC721Bridge.sol](./contracts/L1/messaging/IL1ERC721Bridge.sol)
      * [L1ERC721Bridge.sol](./contracts/L1/messaging/L1ERC721Bridge.sol)
  * [L2/](./contracts/L2)
    * [messaging/](./contracts/L2/messaging)
      * [IL2ERC721Bridge.sol](./contracts/L2/messaging/IL2ERC721Bridge.sol)
      * [L2ERC721Bridge.sol](./contracts/L2/messaging/L2ERC721Bridge.sol)
      * [L2StandardERC721Factory.sol](./contracts/L2/messaging/L2StandardERC721Factory.sol)
  * [standards/](./contracts/standards)
    * [IL2StandardERC721.sol](./contracts/standards/IL2StandardERC721.sol)
    * [L2StandardERC721.sol](./contracts/standards/L2StandardERC721.sol)

* [test/](./test)
  * [contracts/](./test/contracts)
    * [L1/](./test/contracts/L1)
      * [messaging/](./test/contracts/L1/messaging)
        * [L1ERC721Bridge.spec.ts](./test/contracts/L1/messaging/L1ERC721Bridge.spec.ts)
    * [L2/](./test/contracts/L2)
      * [messaging/](./test/contracts/L2/messaging)
        * [L2ERC721Bridge.spec.ts](./test/contracts/L2/messaging/L2ERC721Bridge.spec.ts)
        * [L2StandardERC721Factory.spec.ts](./test/contracts/L2/messaging/L2StandardERC721Factory.spec.ts)
    * [standards/](./test/contracts/standards)
      * [L2StandardERC721.spec.ts](./test/contracts/standards/L2StandardERC721.spec.ts)
      


## Testing

Run the tests for L1ERC721Bridge:
```shell
yarn test --no-compile ./test/contracts/L1/messaging/L1ERC721Bridge.spec.ts
```

L2ERC721Bridge:
```shell
yarn test --no-compile ./test/contracts/L2/messaging/L2ERC721Bridge.spec.ts
```

L2StandardERC721Factory:
```shell
yarn test --no-compile ./test/contracts/L2/messaging/L2StandardERC721Factory.spec.ts
```

L2StandardERC721:
```shell
yarn test --no-compile ./test/contracts/standards/L2StandardERC721.spec.ts
```
