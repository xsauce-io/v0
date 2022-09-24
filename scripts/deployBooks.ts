import {ethers} from "ethers"
import axios from "axios";
import {OrderBookFactory1155, $tableAddress,market1Add, market2Add, market3Add, market4Add } from "../services/constants"
import IOrderBook11155 from "../contracts/interfaces/IOrderBook11155.sol"


async function main() {




  const Book1 = await OrderBookFactory1155.createBook(market1Add, 1,$tableAddress, 100)
  const Book2 = await OrderBookFactory1155.createBook(market2Add, 1, $tableAddress, 100)
  const Book3 = await orderBookFactory.createBook(market3Add, 1,$tableAddress, 100)
  const Book4 = await orderBookFactory.createBook(market4Add, 1,$tableAddress, 100)

  await Book4.wait(1)

console.log(Book1);
console.log(Book2);
console.log(Book3);
console.log(Book4);

  }







main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

