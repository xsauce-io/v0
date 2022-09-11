import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import marketsabi from "../abi/markets.json"


async function main() {

  const Usdc = await ethers.getContractFactory("Token20");
  const usdc = await Usdc.deploy(
    "USD Coin Mock",
    "USDCM",
    6
  )

  await usdc.deployed();


  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy("BQ4422-400");

  await oracle.deployed();

 

  const MarketFactory = await ethers.getContractFactory("MarketFactory");
  const MF = await MarketFactory.deploy();

 await MF.deployed();




  await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 200 , oracle.address , 1663261200, usdc.address)
  await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 300 , oracle.address ,1663520400, usdc.address)
  const tx3_receipt = await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 250 , oracle.address , 1663693200, usdc.address)
  
  await tx3_receipt.wait(1);



  const Market1 = await MF.getAllMarkets();

  console.log("All markets addresses: ", Market1)
  console.log("MarketFactory address is: ", MF.address)



}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


