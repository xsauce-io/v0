import {ethers} from "ethers"
import axios from "axios";


async function main() {

const OrderBookGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/OrderBookFactory20.json'
const OrderBookAddressGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/deployments.json'

let OrderBookAddress:any;
let OrderBookAbi:any;
let Book1;
let Book2;
let Book3;
let Book4;
let orderBookFactory:any;
const goerli:any = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
const tokenAddress = "0x9B2BC1c778051870767bE3d8b8d6b714Fc0E4967";
const market1Add = "0x44A5cE34F2997091De32F1eC7f552c3FC175869d";
const market2Add = "0xc1Aa2632054ab8aa38Df8C9922cf745D17C53c5C";
const market3Add =  "0xEc48934ce43df67c69202e82b846F8dca821EAa6";
const market4Add = "0x560Ac3D6E79a658E16f248b5C976D596D9392d58";

const requestOrderBookAbi = axios.get(OrderBookGit);
const requestOrderBookAddress = axios.get(OrderBookAddressGit);

const creationOfBooks = async () => {
  Book1 = await orderBookFactory.createBook(tokenAddress, market1Add, 100)
  Book2 = await orderBookFactory.createBook(tokenAddress, market2Add, 100)
  Book3 = await orderBookFactory.createBook(tokenAddress, market3Add, 100)
  Book4 = await orderBookFactory.createBook(tokenAddress, market4Add, 100)

  await Book4.wait(1)

console.log(Book1);
console.log(Book2);
console.log(Book3);
console.log(Book4);

  }


axios.all([requestOrderBookAbi, requestOrderBookAddress]).then(axios.spread((...responses) => {
    

  OrderBookAbi = responses[0].data;
  OrderBookAddress = responses[1].data[4].OrderBookFactory20.address;

 console.log(OrderBookAddress)


const provider = new ethers.providers.JsonRpcProvider(goerli)
const signer = provider.getSigner();
orderBookFactory = new ethers.Contract(OrderBookAddress, OrderBookAbi, signer);



creationOfBooks()


 })).catch(errors => {
  console.log(errors)
})


}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

