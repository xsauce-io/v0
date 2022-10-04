import { expect } from "chai";
import { ethers } from "hardhat";
import mocha from "hardhat";
import { BigNumber } from "ethers";
import {$tableAddress, goerliOracle} from "../services/constants"
import MarketAbi from "../abi/markets.json"


describe("Market Tests", function() {

  it("Should mint 1 of both YES and NO prediction", async function () {

  const MF = await ethers.getContractFactory("MarketFactory");

  const marketDtl = await MF.deploy();

  await marketDtl.deployed();

 const mkt2 = await marketDtl.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 330 , goerliOracle , 1665763200, $tableAddress,"DR8869-200")

  await mkt2.wait(1)

  const marketAdd = (await marketDtl.getAllMarketswSku())
//   const signers = await ethers.getSigners();
//   const alice = signers[0];

//   const contract = await ethers.getContractAt(MarketAbi, marketAdd);

// const response = await contract.connect(alice).getAcctInfo(alice.address)
 

console.log(marketAdd)
  
  
  });


  it("Price of yes should be .50", async function () {
    const Usdc = await ethers.getContractFactory("Token20");
  const usdc = await Usdc.deploy(
    "USD Coin Mock",
    "USDCM",
    18
  )

  await usdc.deployed(); 
  const address = "0x50924f626d1Ae4813e4a81E2c5589EC3882C13ca"
  const Market = await ethers.getContractFactory("Market");

  const market = await Market.deploy('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', usdc.address);

  await market.deployed();

  // const start = await market.initialize(100, "0xF6D7924aa1fC05C629924b1b7b07A8668eD454fD", "0xF6D7924aa1fC05C629924b1b7b07A8668eD454fD", 100)

  // await start.wait(1)

  const owner = await usdc.owner();
  const signers = await ethers.getSigners();
  const alice = signers[0];
  const bob = signers[1];
  const carol = signers[2];


  // const price = ethers.utils.formatEther(((await market.priceOfYes()).toString()))

  // console.log(price)

  // console.log((await market.priceOfYes()).mul(5))
  // await usdc.allowance(owner, owner)

  // await usdc.transfer(address, (await market.priceOfYes()).mul(5))

  // const balance = ethers.utils.formatEther(await usdc.balanceOf(address))

  // console.log(balance)

  await usdc.connect(alice).approve(market.address, ethers.constants.MaxUint256);
  // await usdc.connect(bob).mint(bob.address, 100000000000000)
  // await usdc.connect(bob).approve(market.address, ethers.constants.MaxUint256);

  // console.log(await market.totalSupply(1))
  // console.log(await market.totalSupply(2))
  await market.mint(1,30)
  await market.mint(2,7)
  await market.mint(1,10)

  console.log(await market.history())

  await usdc.connect(bob).approve(market.address, ethers.constants.MaxUint256);
  await usdc.sendSauce(bob.address);

  await market.mint(1,200)
  await market.mint(2,75)

  console.log(await market.history())

//   console.log(await market.totalSupply(1))
// console.log(await market.totalSupply(2))

// console.log(await market.acctInfo(alice.address))

  // console.log(await market.balanceOf(alice.address, 1))
  // console.log(await market.balanceOf(alice.address, 2))


  // console.log(ethers.utils.formatEther(await market.priceOfYes()))
  // console.log(ethers.utils.formatEther(await market.priceOfNo()))

  // usdc.approve(market.address, ethers.constants.MaxUint256)


  // console.log(await market.balanceOf(alice.address, 2))

  


  // console.log(total)






//     const YesPrice = ((await market.totalSupply(2)).toNumber())/((await market.totalSupply(2)).toNumber() + (await market.totalSupply(1)).toNumber())
// console.log(await market.totalSupply(2))
// expect(YesPrice).to.equal(1/12);
  })

  


});