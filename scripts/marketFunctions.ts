
import axios from "axios";
import { ethers } from "hardhat"


async function main() {


  const Market = await ethers.getContractFactory("Market");
  // const Oracle = await ethers.getContractFactory("Oracle");


  const oracle = "0x3a6558eE48e96001c68E41F11109F16585eFf14f"
  const market1 = "0x21b137B94B52C03bE372270644dd38E7C881FCB2"



  const MarketFunct = Market.attach(market1);
  //  const OracleFunct = Oracle.attach(oracle);


  await MarketFunct.initialize(4000, oracle, 1664125200, "315728-381", "0x0");

  await MarketFunct.getData();


  //  const price = (await OracleFunct.price()).toString();
  //  console.log(price)

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

