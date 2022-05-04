# Consolidating NFTs from a Standard ERC721 contract into a Custom ERC721 contract

This tutorial will show you how to consolidate NFTs that already exist in an [L2 Standard ERC721](https://github.com/sam-goldman/optimism-nft-bridge/blob/main/contracts/standards/L2StandardERC721.sol) into an [L2 Custom ERC721](https://github.com/sam-goldman/optimism-nft-bridge/blob/main/contracts/tutorials/l2-custom-erc721/L2CustomERC721.sol). Consolidation works without any changes to the current bridge design, and it occurs entirely on L2 (so users don't need to pay any L1 gas fees). It works in the following way:

1. The owner of an NFT in the L2 Standard ERC721 contract uses `safeTransferFrom` to escrow the NFT in the L2 Custom ERC721 contract.
1. The Custom ERC721 contract automatically mints a new NFT with the same token ID and sends it to the owner (via its `onERC721Received` function).
1. If the NFT is ever withdrawn to L1, the L2 NFT is totally erased (both the NFT that was sent from the Standard Contract to the Custom contract as well as the new NFT minted to the owner).

You can view the Custom ERC721 contract that was used for the tutorial on [Etherscan](https://kovan-optimistic.etherscan.io/address/0x90258483694092823dCf1179932D6E8C01B783b2#writeContract). For a high-level overview of the NFT bridge itself, check out [these slides](https://docs.google.com/presentation/d/1oIk3lbnxoFy-eGg04vGntAMYIAErmI-_CtWsKUMTcW8/edit#slide=id.g11ad45bf27e_0_0). If you have any questions, feel free to reach out at [sam@quixotic.io](mailto:sam@fanbaselabs.com).

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

1. Copy `.env.example` to `.env`. Then, in `.env`, set `PRIVATE_KEY` to point to an account that has ETH on Kovan and Optimistic Kovan. You can use a [faucet](https://community.optimism.io/docs/useful-tools/faucets/#paradigm-multifaucet) to get testnet ETH.


## Tutorial

Run the code in [example.js](https://github.com/sam-goldman/optimism-nft-bridge/blob/main/tutorials/l2-custom-erc721/example.js):
```
yarn hardhat run --no-compile tutorials/l2-custom-erc721/example.js
```

The script should output the following:
```
Minting an L1 NFT...
Depositing NFT into the L2 Standard ERC721 contract. This takes about a minute.
Deposit successful. Balance of owner on L2 Standard ERC721: 1
Transferring NFT from the Standard ERC721 contract to the Custom ERC721 contract...
Transfer successful. The Custom contract automatically minted an NFT and sent it to the owner:
Balance of owner on L2 Custom ERC721: 1
Balance of owner on L2 Standard ERC721: 0
Withdrawing the NFT to L1...
Withdraw to L1 successfully initiated!
```
