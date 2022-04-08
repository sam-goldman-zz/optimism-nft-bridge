# ERC721 Bridge Tutorial

This is a tutorial to demonstrate how to use the ERC721 Bridge. We will go through the process of depositing an L1 NFT into L2 and withdrawing it back to L1. The code for the tutorial, including documentation, can be found in [example.js](https://github.com/sam-goldman/optimism-nft-bridge/blob/main/tutorial/example.js). For a high-level overview of the bridge, see [these slides](https://docs.google.com/presentation/d/1oIk3lbnxoFy-eGg04vGntAMYIAErmI-_CtWsKUMTcW8/edit#slide=id.g11ad45bf27e_0_0).

If you have any questions, feel free to reach out at [sam@fanbaselabs.com](mailto:sam@fanbaselabs.com).

## Setup

### Local dev environment

First, setup a local development environment. Follow the instructions [here](https://github.com/ethereum-optimism/community-hub/blob/5e4b1ce78f8dfc9b0ca583471532070614f82b87/src/docs/developers/build/dev-node.md) until you have completed the section ["Starting the environment"](https://github.com/ethereum-optimism/community-hub/blob/5e4b1ce78f8dfc9b0ca583471532070614f82b87/src/docs/developers/build/dev-node.md#starting-the-environment).

Next, follow the instructions [here](https://github.com/ethereum-optimism/optimism/tree/develop/packages/message-relayer) to turn on the message relayer, which automatically finalizes messages sent from L2 to L1.

### Install files

Clone this repo:
```
git clone https://github.com/sam-goldman/optimism-nft-bridge.git
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

The script should output something like the following:
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
