async function main () {
  const Factory__L1ERC721 = await ethers.getContractFactory('L1ERC721');
  console.log('Deploying L1ERC721...');
  const L1ERC721 = await Factory__L1ERC721.deploy();
  await L1ERC721.deployed();
  const address = L1ERC721.address;
  console.log('L1ERC721 deployed to:', address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });