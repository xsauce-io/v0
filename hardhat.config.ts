import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';


dotenv.config();


const config: HardhatUserConfig = {
  solidity: "0.8.16",
  networks: {
    goerli: {
      url: 'https://ethereum-goerli-rpc.allthatnode.com',
      accounts: process.env.GOERLI_KEY !== undefined ? [process.env.GOERLI_KEY] : [],
    }
  },
  paths: {
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  }
};

export default config;
