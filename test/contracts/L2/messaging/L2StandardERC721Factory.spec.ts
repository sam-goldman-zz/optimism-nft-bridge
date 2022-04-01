/* External Imports */
import { ethers } from 'hardhat'
import { Signer, ContractFactory, Contract } from 'ethers'
import {
  smock,
  MockContractFactory,
  MockContract,
} from '@defi-wonderland/smock'

/* Internal Imports */
import { expect } from '../../../setup'
import { predeploys, getContractInterface } from '../../../../src'

describe('L2StandardERC721Factory', () => {
  let signer: Signer
  let Factory__L1ERC721: MockContractFactory<ContractFactory>
  let L1ERC721: MockContract<Contract>
  let L2StandardERC721Factory: Contract
  before(async () => {
    [signer] = await ethers.getSigners();

    // deploy an ERC721 contract on L1
    Factory__L1ERC721 = await smock.mock(
      '@openzeppelin/contracts/token/ERC721/ERC721.sol:ERC721'
    )
    L1ERC721 = await Factory__L1ERC721.deploy('L1ERC721', 'ERC')

    L2StandardERC721Factory = await (
      await ethers.getContractFactory('L2StandardERC721Factory')
    ).deploy()
  })

  describe('Standard ERC721 factory', () => {
    it('should be able to create a standard ERC721 contract', async () => {
      const tx = await L2StandardERC721Factory.createStandardL2ERC721(
        L1ERC721.address,
        'L2ERC721',
        'ERC'
      )
      const receipt = await tx.wait()

      // The first element in the events array is a RoleGranted event emitted by AccessControl,
      // so we query the second element to find the StandardL2ERC721Created event.
      const erc721CreatedEvent = receipt.events[1]

      // Expect there to be an event emmited for the standard token creation
      expect(erc721CreatedEvent.event).to.be.eq('StandardL2ERC721Created')

      // Get the L2 ERC721 address from the emmited event and check it was created correctly
      const l2ERC721Address = erc721CreatedEvent.args._l2Token
      const l2Token = new Contract(
        l2ERC721Address,
        getContractInterface('L2StandardERC721'),
        signer
      )

      expect(await l2Token.l2Bridge()).to.equal(predeploys.L2ERC721Bridge)
      expect(await l2Token.l1Token()).to.equal(L1ERC721.address)
      expect(await l2Token.name()).to.equal('L2ERC721')
      expect(await l2Token.symbol()).to.equal('ERC')

      expect(await L2StandardERC721Factory.isStandardERC721(l2Token.address)).to.equal(true)
    })

    it('should not be able to create a standard token with a 0 address for l1 token', async () => {
      await expect(
        L2StandardERC721Factory.createStandardL2ERC721(
          ethers.constants.AddressZero,
          'L2ERC721',
          'ERC'
        )
      ).to.be.revertedWith('Must provide L1 token address')
    })
  })
})
