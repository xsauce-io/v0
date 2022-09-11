import { expect } from "chai";
import { ethers } from "hardhat";
import mocha from "hardhat";


describe("MarketFactory", function() {
  it("Should push new market address inside of allMarkets array", async function () {
    
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
  const Market = await ethers.getContractFactory("Market");
  const MF = await MarketFactory.deploy();

  await MF.deployed();

 
  const markets = await MarketFactory.deploy();

  await markets.deployed();


  const tx1_receipt = await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 200 , oracle.address , 1662814800, usdc.address)
  const market_address = await MF.allMarkets(0);

  // const market1 = await MF.attach(market_address);

  console.log("MarketFactory address at: ", tx1_receipt.to)
  console.log("Market1 address is: ", market_address)

  });
});