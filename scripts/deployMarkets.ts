import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import {OrderBookFactory1155, $tableAddress, goerliOracle} from "../constants/constants"


async function main() {

  const MarketFactory = await ethers.getContractFactory("MarketFactory");
  const MF = await MarketFactory.deploy();

 await MF.deployed();


await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 300 , goerliOracle , 1665158400, $tableAddress,"DH7138-006","Air Jordan 4 'Black Canvas'")
await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 330 , goerliOracle , 1665763200, $tableAddress,"DR8869-200", "Jordan 3 Retro 'Winterized'")
await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 230 , goerliOracle ,1665590400, $tableAddress, "DR0501-101", "Air Jordan 1 Mid Split (W)")
const batch4 = await MF.createNewMarket('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json', 260 , goerliOracle ,1666281600 , $tableAddress, "DX2836-001", "Air Jordan 6 'Black Chrome'")

await batch4.wait(1)

 const market1Add = await MF.allMarkets(0);
 const market2Add = await MF.allMarkets(1);
 const market3Add = await MF.allMarkets(2);
 const market4Add = await MF.allMarkets(3);


  console.log("MarketFactory address is: ", MF.address)

  console.log("Market1 address: ", market1Add)
  console.log("Market2 address: ", market2Add)
  console.log("Market3 address: ", market3Add)
  console.log("Market4 address: ", market4Add)




}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
