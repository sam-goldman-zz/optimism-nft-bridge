# Consolidating tokens in an existing L2 Standard ERC721 into a new L2 Custom ERC721

This tutorial is meant for developers who would like to deploy an L2 Custom ERC721 contract that can absorb the tokens which already exist in an L2 Standard ERC721 contract. This situation is likely to arise if a few individuals bridge their L1 NFTs to L2 before the core devs of the project release a fully featured Custom ERC721 on L2. The code in [TODO: L2CustomERC721.sol](_) shows how it is possible to consolidate NFTs such that owners still have full control over . In order to do this, each 

If you have any questions, feel free to reach out at [sam@quixotic.io](mailto:sam@fanbaselabs.com).

## Setup

### Local dev environment

First, setup a local development environment. Follow the instructions [here](https://github.com/ethereum-optimism/community-hub/blob/5e4b1ce78f8dfc9b0ca583471532070614f82b87/src/docs/developers/build/dev-node.md) until you have completed the section ["Starting the environment"](https://github.com/ethereum-optimism/community-hub/blob/5e4b1ce78f8dfc9b0ca583471532070614f82b87/src/docs/developers/build/dev-node.md#starting-the-environment).

Next, follow the instructions [here](https://github.com/ethereum-optimism/optimism/tree/develop/packages/message-relayer) to turn on the message relayer, which automatically finalizes messages sent from L2 to L1.

### Install files

If you've already installed the files according to the [README in the main repo](https://github.com/sam-goldman/optimism-nft-bridge/blob/main/README.md), feel free to skip this step and go to the Config section.

Clone the main repo:
```
git clone https://github.com/sam-goldman/optimism-nft-bridge.git
```

Navigate to the project's root directory:
```
cd optimism-nft-bridge
```

Install packages:
```
yarn install
```

Run the primary build script:
```
yarn build
```

### Config

Copy the example config at [.env.example](https://github.com/sam-goldman/optimism-nft-bridge/blob/main/.env.example) into a `.env` file, and enter your parameters. If you are running your development environment locally, these values will be:
```
L1_RPC_PROVIDER='http://localhost:9545'
L2_RPC_PROVIDER='http://localhost:8545'
```
If you are running your development environment on a cloud provider (like GCP), you will use the external IP address of your VM. For example:
```
L1_RPC_PROVIDER='http://34.115.47.183:9545'
L2_RPC_PROVIDER='http://34.115.47.183:8545'
```

# Tutorial

Run the tutorial:
```
yarn hardhat run --no-compile tutorial/example.js
```

The script should output the following (it's fine if you see different addresses):
```
Deploying L1 ERC721...
L1ERC721 deployed @ 0x172076E0166D1F9Cc711C77Adf8488051744980C
Deploying L2 ERC721...
L2StandardERC721 deployed @ 0x32467b43BFa67273FC7dDda0999Ee9A12F2AaA08
Balance on L1: 1
Balance on L2: 0
Approving L1 bridge to transfer NFT...
Depositing tokens into L2 ...
Balance on L1: 0
Balance on L2: 1
Withdrawing tokens back to L1 ...
Waiting for withdrawal to be relayed to L1...
Balance on L1: 1
Balance on L2: 0
```
