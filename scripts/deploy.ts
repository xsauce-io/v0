import { ethers } from "hardhat";


async function main() {

  const Usdc = await ethers.getContractFactory("Token20");
  const usdc = await Usdc.deploy(
    "USD Coin Mock",
    "USDCM",
    6
  )

  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy('FV5666');

  await oracle.deployed();

  console.log(`Oracle deployed to ${oracle.address}`);

  const MarketFactory = await ethers.getContractFactory("MarketFactory");
  const marketFactory = await MarketFactory.deploy();

  await marketFactory.deployed();

  console.log(`Market deployed to ${marketFactory.address}`);

  MarketFactory.createNewMarket(string memory uri, 250 , oracle.address , 1662814800, IERC20 _usdc)

  

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
