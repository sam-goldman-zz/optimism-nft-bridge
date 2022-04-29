# NFT Bridging Tutorial

This tutorial teaches you how to use the ERC721 Bridge to transfer NFTs between Layer 1 (Ethereum) and Layer 2 (Optimism).
It covers both deposits (Ethereum to Optimism) and withdrawals (Optimism to Ethereum). The code for the tutorial, including documentation, can be found in [example.js](https://github.com/sam-goldman/optimism-nft-bridge/blob/main/tutorials/bridging/example.js). For a high-level overview of the bridge, see [these slides](https://docs.google.com/presentation/d/1oIk3lbnxoFy-eGg04vGntAMYIAErmI-_CtWsKUMTcW8/edit#slide=id.g11ad45bf27e_0_0).

If you have any questions, feel free to reach out at [sam@quixotic.io](mailto:sam@quixotic.io).

## Setup

If you've already installed the files according to the [README in the main repo](https://github.com/sam-goldman/optimism-nft-bridge/blob/main/README.md), feel free to skip to step 4.

1. Ensure your computer has:
   - [`git`](https://git-scm.com/downloads)
   - [`node`](https://nodejs.org/en/)
   - [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

1. Clone the root repository and enter it.

   ```sh
   git clone https://github.com/sam-goldman/optimism-nft-bridge
   cd optimism-nft-bridge
   ```

1. Install the necessary packages and run the build script.

    ```sh
    yarn
    yarn build
    ```

1. Copy `.env.example` to `.env`. In `.env`, set `PRIVATE_KEY` to point to an account that has ETH on Kovan and Optimistic Kovan. You can use a [faucet](https://community.optimism.io/docs/useful-tools/faucets/#paradigm-multifaucet) to get testnet ETH.


## Tutorial

Run the code in [example.js](https://github.com/sam-goldman/optimism-nft-bridge/blob/main/tutorials/bridging/example.js):
```
yarn hardhat run --no-compile tutorials/bridging/example.js
```

The script should output the following:
```
Balance on L1: 1
Balance on L2: 0
Approving L1 bridge to transfer NFT...
Depositing NFT into L2. This takes about a minute.
Balance on L1: 0
Balance on L2: 1
Withdrawing NFT back to L1...
Waiting until withdrawal is ready to be relayed. This takes a couple minutes on Kovan (and a week on mainnet!).
Waiting for relay to be finalized...
Balance on L1: 1
Balance on L2: 0
```
