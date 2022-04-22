// /* External Imports */
// import { ethers } from 'hardhat'
// import { Signer, Contract } from 'ethers'
// import { smock, FakeContract, MockContract } from '@defi-wonderland/smock'
// import { NON_NULL_BYTES32 } from '../../../helpers'

// /* Internal Imports */
// import { expect } from '../../../setup'

// const TOKEN_ID = 10
// const DUMMY_OPERATOR_ADDRESS = ethers.utils.getAddress('0x' + 'abba'.repeat(10))
// const DUMMY_L1ERC721_ADDRESS = ethers.utils.getAddress(
//   '0x' + 'acdc'.repeat(10)
// )
// const DUMMY_L2_BRIDGE_ADDRESS = ethers.utils.getAddress(
//   '0x' + 'bcdc'.repeat(10)
// )
// const ERC721RECEIVER_INTERFACE_IDENTIFIER = '0x150b7a02'
// const BASE_URI: string = ''.concat('ethereum:', DUMMY_L1ERC721_ADDRESS, '@42/tokenURI?uint256=')

// describe('L2CustomERC721', () => {
//   let l2BridgeImpersonator: Signer
//   let alice: Signer
//   let L2StandardERC721: Contract
//   let L2CustomERC721: Contract
//   let l1ERC721Impersonator: Signer
//   let aliceAddress: string
//   let l1ERC721ImpersonatorAddress: string
//   let Mock__L2StandardERC721Factory: MockContract<Contract>
//   let Fake__L1ERC721: FakeContract
//   let Fake__L2ERC721Bridge: FakeContract

//   before(async () => {
//     ;[alice, l1ERC721Impersonator, l2BridgeImpersonator] = await ethers.getSigners()
    
//     aliceAddress = await alice.getAddress()
//     l1ERC721ImpersonatorAddress = await l1ERC721Impersonator.getAddress()

//     Mock__L2StandardERC721Factory = await (
//       await smock.mock('L2StandardERC721Factory')
//     ).deploy()

//     L2CustomERC721 = await (
//       await ethers.getContractFactory('L2CustomERC721')
//     ).deploy(
//       DUMMY_L2_BRIDGE_ADDRESS,
//       DUMMY_L1ERC721_ADDRESS,
//       Mock__L2StandardERC721Factory.address,
//       'L2ERC721',
//       'ERC'
//     )

//     L2StandardERC721 = await (
//       await ethers.getContractFactory('L2StandardERC721'),
//     ).deploy(
//       DUMMY_L2_BRIDGE_ADDRESS,
//       DUMMY_L1ERC721_ADDRESS,
//       'L2ERC721',
//       'ERC'
//     )

//     Fake__L1ERC721 = await smock.fake<Contract>(
//       await ethers.getContractFactory('L1ERC721'),
//       // This allows us to use an ethers override {from: Fake__L2ERC721Bridge.address} to mock calls
//       { address: l1ERC721ImpersonatorAddress }
//     )

//     // Get a new fake L2 bridge
//     Fake__L2ERC721Bridge = await smock.fake<Contract>(
//       await ethers.getContractFactory('L2ERC721Bridge'),
//       // This allows us to use an ethers override {from: Fake__L2ERC721Bridge.address} to mock calls
//       { address: await l2BridgeImpersonator.getAddress() }
//     )

//     // mint an nft to alice
//     await L2StandardERC721.connect(l2BridgeImpersonator).mint(
//       aliceAddress,
//       TOKEN_ID,
//       {
//         from: Fake__L2ERC721Bridge.address,
//       }
//     )
//   })

//   describe('onERC721Received', () => {
//     it('should revert if not called by a standard l2 erc721 contract', async () => {
//       await expect(
//         L2CustomERC721.onERC721Received(
//           DUMMY_OPERATOR_ADDRESS,
//           aliceAddress,
//           TOKEN_ID,
//           NON_NULL_BYTES32
//         )
//       ).to.be.revertedWith("Transfer not sent from a Standard L2 ERC721 contract")
//     })

//     it('should revert if called by a standard erc721 contract that does not map to the correct l1 token', async () => {
//       await Mock__L2StandardERC721Factory.setVariable('isStandardERC721', {
//         [L2StandardERC721]: true,
//       })

//       await expect(
//         L2CustomERC721.connect(l2StandardERC721Impersonator).onERC721Received(
//           DUMMY_OPERATOR_ADDRESS,
//           aliceAddress,
//           TOKEN_ID,
//           NON_NULL_BYTES32
//         )
//       ).to.be.revertedWith(
//         "Function was called by a Standard L2 ERC721 contract that does not map to the correct L1 ERC721"
//       )
//     })

//     it('should return the correct selector and mint a token ID to the correct owner', async () => {
//       await Mock__L2StandardERC721Factory.setVariable('standardERC721Mapping', {
//         [DUMMY_L1ERC721_ADDRESS]: l2StandardERC721ImpersonatorAddress,
//       })

//       await Mock__L2StandardERC721.setVariable('_owners', {
//         [TOKEN_ID]: aliceAddress
//       })
//       await Mock__L2StandardERC721.setVariable('_balances', {
//         [aliceAddress]: 1
//       })

//       // Returns the ERC-165 identifier of IERC721Receiver. This call does not execute a transaction
//       // since we use callStatic.
//       const interfaceIdentifier = await L2CustomERC721.connect(l2StandardERC721Impersonator).callStatic.onERC721Received(
//         DUMMY_OPERATOR_ADDRESS,
//         aliceAddress,
//         TOKEN_ID,
//         NON_NULL_BYTES32
//       )

//       // Returns the expected interface identifier
//       expect(interfaceIdentifier).to.equal(ERC721RECEIVER_INTERFACE_IDENTIFIER)

//       // This call executes the transaction successfully
//       await Mock__L2StandardERC721.connect(alice).safeTransferFrom(
//         aliceAddress,
//         L2CustomERC721.address,
//         TOKEN_ID
//       )

//       // The token ID has been escrowed in the custom erc721 contract
//       expect(await L2StandardERC721.ownerOf(TOKEN_ID)).equals(L2CustomERC721.address)

//       // A new token ID is minted from the custom token contract and sent to alice
//       expect(await L2CustomERC721.ownerOf(TOKEN_ID)).to.equal(aliceAddress)
//     })
//   })
// })
