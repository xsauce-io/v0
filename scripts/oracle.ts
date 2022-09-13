import { ethers } from "hardhat";

async function main() {

// Set up an ethers contract, representing our deployed Box instance
const address = '0xa1D1bDca11D74686ea6D140aC473B59915092403';
const MF = await ethers.getContractFactory('Oracle');
const factory = await MF.attach(address);


const skuChange = await factory.sku();


  console.log(skuChange);
}
