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
    fantom: {
      url: 'https://rpc.testnet.fantom.network/',
      accounts: process.env.fantom !== undefined ? [process.env.fantom] : [],
    }
  },
  paths: {
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  }
};

export default config;
