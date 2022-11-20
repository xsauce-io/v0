import {ethers} from "hardhat"
import BookFactoryAbi from "../abi/bookFactory.json"
import {OrderBookFactory1155, $tableAddress, Market1, Market2, Market3, Market4 } from "../constants/constants"


async function main() {

  const BookFactory = await ethers.getContractAt(BookFactoryAbi, OrderBookFactory1155);


  const Book1 = await BookFactory.getBook(Market1, 1,$tableAddress, 100)
  const Book2 = await BookFactory.getBook(Market2, 1, $tableAddress, 100)
  const Book3 = await BookFactory.getBook(Market3, 1,$tableAddress, 100)
  const Book4 = await BookFactory.getBook(Market4, 1,$tableAddress, 100)


console.log(Book1.toString());
console.log(Book2.toString());
console.log(Book3.toString());
console.log(Book4.toString());

  }







main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
