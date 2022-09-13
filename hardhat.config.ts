import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';


dotenv.config();


const config: HardhatUserConfig = {
  solidity:{ 
    version:"0.8.16",
    settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
}
  },
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
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
