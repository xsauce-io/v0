import { expect } from "chai";
import { ethers } from "hardhat";
import mocha from "hardhat";
import { BigNumber } from "ethers";


describe("Market Tests", function() {

  it("Should mint 1 of both YES and NO prediction", async function () {

  const Market = await ethers.getContractFactory("Market");

  const market = await Market.deploy('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', "0xF6D7924aa1fC05C629924b1b7b07A8668eD454fD");

  await market.deployed();
   
    expect(await market.totalSupply(1)).to.equal(await market.totalSupply(2));
  });



  it("Should mint 10 YES tokens with a price .50", async function () {
  //     const Usdc = await ethers.getContractFactory("Token20");
  // const usdc = await Usdc.deploy(
  //   "USD Coin Mock",
  //   "USDCM",
  //   18
  // )

  // await usdc.deployed(); 

  const Market = await ethers.getContractFactory("Market");

  const market = await Market.deploy('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', "0x347eEd3935DCF42eF7eF64967113Ff558898b87C");

  await market.deployed();

  // const start = await market.initialize(100, "0xF6D7924aa1fC05C629924b1b7b07A8668eD454fD", "0xF6D7924aa1fC05C629924b1b7b07A8668eD454fD", 100)

  // await start.wait(1)


  // const amountDue = await market.priceOfYes();



  // console.log('amount due:', (amountDue).mul(5))
    
  //  const mint = await market.mint(1,5)

  //  await mint.wait(1)

//   const totalSupply = await market.totalSupply(1)
//   // const totalSupply2 = (await market.totalSupply(2)).toNumber()
// console.log(totalSupply)
// console.log(totalSupply2)
//     expect(totalSupply).to.equal(11);
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

  console.log(await market.totalSupply(1))
  console.log(await market.totalSupply(2))
  await market.mint(1,300)


  console.log(await market.totalSupply(1))
console.log(await market.totalSupply(2))
  // console.log(await market.balanceOf(alice.address, 1))
  // console.log(await market.balanceOf(alice.address, 2))


  // console.log(ethers.utils.formatEther(await market.priceOfYes()))
  // console.log(ethers.utils.formatEther(await market.priceOfNo()))

  usdc.approve(market.address, ethers.constants.MaxUint256)

  await market.xchange(1,70)
  console.log(await market.totalSupply(1))
  console.log(await market.totalSupply(2))


  // await market.mint(2,10)

  console.log(await market.totalSupply(1))
  console.log(await market.totalSupply(2))


  // await market.mint(1,1)

  await market.xchange(2,30)


  console.log(await market.totalSupply(1))
  console.log(await market.totalSupply(2))

  // await market.mint(1,1)

  // console.log(await market.balanceOf(alice.address, 2))

  

  // await market.xchange(1,7)

 

  // .div(1e33)) % 100).mul(1e16)

  // .div(1e33)).div(100);






  // await market.xchange(2,7)
 


  // expect(balance).to.equal("2.5")
  // expect(await market.balanceOf(owner,1)).to.equal(5)


 

  // const total = await usdc.balanceOf("0x347eEd3935DCF42eF7eF64967113Ff558898b87C")

  // console.log(total)






//     const YesPrice = ((await market.totalSupply(2)).toNumber())/((await market.totalSupply(2)).toNumber() + (await market.totalSupply(1)).toNumber())
// console.log(await market.totalSupply(2))
// expect(YesPrice).to.equal(1/12);
  })

  


});