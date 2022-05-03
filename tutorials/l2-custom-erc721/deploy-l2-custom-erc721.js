async function main () {
  const Factory__L2CustomERC721 = await ethers.getContractFactory('L2CustomERC721');

  console.log('Deploying L2CustomERC721...');

  const L2CustomERC721 = await Factory__L2CustomERC721.deploy(
    '0xA779A0cA89556A9dffD47527F0aad1c2e0d66e46', // L1ERC721 address
    'MusicFund', // name
    'MSF' // symbol
  );
  await L2CustomERC721.deployed();

  console.log('L2CustomERC721 deployed to:', L2CustomERC721.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });