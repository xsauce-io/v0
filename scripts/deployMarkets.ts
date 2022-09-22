import { BigNumber } from "ethers";
import { ethers } from "hardhat";


async function main() {

  // const Usdc = await ethers.getContractFactory("Token20");
  // const usdc = await Usdc.deploy(
  //   "Stable $auce",
  //   "$",
  //   18
  // )

  // await usdc.deployed();
  


  // const Oracle = await ethers.getContractFactory("Oracle");
  // const oracle = await Oracle.deploy("315728-381");

  // await oracle.deployed();



 
  const MarketFactory = await ethers.getContractFactory("MarketFactory");
  const MF = await MarketFactory.deploy();

 await MF.deployed();
 const Oracle = "0x47e6D43624bE3F764f49486Ce35c5380F092Ead9"
 const SauceTokenAddress = "0x12d9dda76a85E503A9eBc0b265Ef51e4aa90CD7D";
 const OrderBookFactory = "0xC998641b18d6D232B4244B51729d0654f48B6a7c"

 const batch3 = await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 4500 , Oracle , 1664125200, SauceTokenAddress,  OrderBookFactory ,"315728-381" )
// await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 275 , Oracle , 1664557200, SauceTokenAddress,  OrderBookFactory,"555088-108")
// await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 720 , Oracle ,1664643600, SauceTokenAddress ,OrderBookFactory, "AT9915-002")
// await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 200 , Oracle ,1664989200 , SauceTokenAddress, OrderBookFactory, "DN3707-160")
  
await batch3.wait(1)

 const market1Add = await MF.allMarkets(0);
//  const market2Add = await MF.allMarkets(1);
//  const market3Add = await MF.allMarkets(2);
//  const market4Add = await MF.allMarkets(3);



// const Market = await ethers.getContractFactory("Market");

//   const market = await Market.deploy('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', SauceTokenAddress );

//   await market.deployed();


  // console.log("Token address: ", usdc.address)
  // console.log("Market Address", market.address)
  console.log("MarketFactory address is: ", MF.address)
  // console.log("Oracle address: ", oracle.address)
  console.log("Market1 address: ", market1Add)
  // console.log("Market2 address: ", market2Add)
  // console.log("Market3 address: ", market3Add)
  // console.log("Market4 address: ", market4Add)


      

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

