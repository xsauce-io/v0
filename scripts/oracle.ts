import { ethers } from "hardhat";

async function main() {



  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy("315728-381");

  await oracle.deployed();

// Set up an ethers contract, representing our deployed Box instance
const signers = await ethers.getSigners();
const me = signers[0];
const sku = await oracle.sku()



  console.log(sku);
  console.log(oracle.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});