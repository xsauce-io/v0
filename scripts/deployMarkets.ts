import { BigNumber } from "ethers";
import { ethers } from "hardhat";


async function main() {

  const Usdc = await ethers.getContractFactory("Token20");
  const usdc = await Usdc.deploy(
    "USD Coin Mock",
    "USDCM",
    6
  )

  await usdc.deployed();  

  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy("384664-023");

  await oracle.deployed();

 
  const MarketFactory = await ethers.getContractFactory("MarketFactory");
  const MF = await MarketFactory.deploy();

 await MF.deployed();


await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 200 , oracle.address , 1663347600, usdc.address, "384664-023")
await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 300 , oracle.address ,1663520400, usdc.address, "BQ4422-400")
await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 250 , oracle.address , 1663693200, usdc.address, "CT8012-011")
const batch3 = await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 150 , oracle.address ,1663866000 , usdc.address, "DV2122-400")
  
await batch3.wait(1)

 const market1Add = await MF.allMarkets(0);
 const market2Add = await MF.allMarkets(1);
 const market3Add = await MF.allMarkets(2);
 const market4Add = await MF.allMarkets(3);




  console.log("Token address: ", usdc.address)
  console.log("MarketFactory address is: ", MF.address)
  console.log("Oracle address: ", oracle.address)
  console.log("Market1 address: ", market1Add)
  console.log("Market2 address: ", market2Add)
  console.log("Market3 address: ", market3Add)
  console.log("Market4 address: ", market4Add)


      

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

