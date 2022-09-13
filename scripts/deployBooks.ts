import { ethers } from "hardhat";
import axios from "axios";


async function main() {



const OrderBookGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/OrderBookFactory20.json'
const OrderBookAddressGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/deployments.json'

const requestOrderBook = axios.get(OrderBookGit);
const requestOrderBookAddress = axios.get(OrderBookAddressGit);

let orderBookAddress: string
let orderBookAbi: []





axios.all([requestOrderBook, requestOrderBookAddress]).then(axios.spread(async (...responses) => {
    

  orderBookAbi = await responses[1].data
   orderBookAddress = await responses[2].data[4].OrderBookFactory20



    const provider = new ethers.providers.JsonRpcProvider()
    const signer = provider.getSigner();
    const orderBookFactory = new ethers.Contract(orderBookAddress, orderBookAbi, signer);
    orderBookFactory.connect(signer);

    const Book1 = await orderBookFactory.createBook(usdc.address, market1Add, 100)
    const Book2 = await orderBookFactory.createBook(usdc.address, market2Add, 100)
    const Book3 = await orderBookFactory.createBook(usdc.address, market3Add, 100)
    const Book4 = await orderBookFactory.createBook(usdc.address, market4Add, 100)


await Book4.wait(1)






main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
