
import axios from "axios";
import { ethers } from "hardhat";
import {$tableAddress} from "../constants/constants";


async function main() {


  const Market = await ethers.getContractFactory("Market");

  const MarketCalls = await Market.deploy("1", $tableAddress);

 await MarketCalls.deployed();



  // await MarketCalls.mint(1, );


  //  const price = (await OracleFunct.price()).toString();
  //  console.log(price)

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
