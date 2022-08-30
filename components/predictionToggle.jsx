import React from "react"
import { BigNumber, ethers, utils } from 'ethers'
import erc1155abi from '../abi/erc1155.json'
import { useState, useEffect } from "react"
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'


export const PredictToggle = () => {

  const erc20Git = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/ERC20.json'
  const OrderBookGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/OrderBook.json'
  const OrderBookAddressGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/deployments.json'
  const requestERC20 = axios.get(erc20Git);
  const requestOrderBook = axios.get(OrderBookGit);
  const requestOrderBookAddress = axios.get(OrderBookAddressGit);
  const address = "0xb16a791282B604120E28e703C56D9Cb6E3C776b1"
  const addressRink ="0x360b9D17f8546941208085C045871E2a318117Ba"
  const dai = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa"
const [alignment, setAlignment] = useState();
const [isYes, setIsYes] = useState();
const [order, setOrder] = useState();
const [isBuy, setIsBuy] = useState();
const [ERC20Abi, setERC20Abi] = useState(null)
const [orderBookAbi, setOrderBookAbi] = useState(null)
const [orderBookAddress, setOrderBookAddress] = useState(null)
const [signedContract, setSignedContract] = useState(null)


const theme = createTheme({
  palette: {
    primary: {
      main:'#416900',
    
    },
    secondary: {
      main:'#BA1A1A',
   
    },
    action: {
      selectedOpacity: .6
    }

  }
})



const handleChange = (event, newAlignment) => {
  setAlignment(newAlignment);
  if (event.target.value === "1") {
        setIsYes(true);
        
      } else if (event.target.value === "2") {
        setIsYes(false);
        
      }
};

const handleChange1 = (event, newOrder) => {
setOrder(newOrder);
if (event.target.value === "1") {
  setIsBuy(true);
} else if (event.target.value === "2") {
  setIsBuy(false);
}

}

const grabData = async () => {
  axios.all([requestERC20, requestOrderBook, requestOrderBookAddress]).then(axios.spread((...responses) => {
    setERC20Abi(responses[0].data)
    setOrderBookAbi(responses[1].data)
    // TODO fetch object based on chainID now is only Rinkeby
    setOrderBookAddress(responses[2].data[4].OrderBook20Token20A158Token20B159.address)
  })).catch(errors => {
    console.log(errors)
  })
}


useEffect(() => {
  grabData();
 },[]);




  const handleTransfer = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get("contractNumber"));
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(orderBookAddress, orderBookAbi, signer);
    let signedContract = contract.connect(signer);
    setSignedContract(signedContract)
    const order = await signedContract.limitOrder(
      // firstToken address
      "0x820a9Ca5F7D4b40Cdb81DCd373CBE7173106ce1e",
      // firstToken amount
      // BigNumber.from(data.get("contractNumber"))
      '1',
      // secondToken amount
     '800',
      // startPagePtr
      utils.formatBytes32String("0"), 
      // MaxCancels
      '1',
      // makerOnly
      !isBuy,
      // takerOnly
      isBuy,
      )

  }


   



  return (

    <React.Fragment>


      <form onSubmit={handleTransfer} className="flex flex-col space-y-4 justify-center items-center mobile:w-full laptop:w-1/3">

      <h1 className="font-SG text-[20px]">Order Details</h1>
    
  <ThemeProvider theme={theme}>
<ToggleButtonGroup
  
 color= { isBuy === true ? "primary" : 'secondary' }
  sx={{backgroundColor:'white', '@media screen and (min-width: 300px)': { width:'100%'}}}
  value={order}
  exclusive
  required
  onChange={handleChange1}
>
  <ToggleButton  sx={{width:'100%', boxShadow:'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}  value="1">Buy</ToggleButton>
  <ToggleButton sx={{width:'100%', boxShadow:'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}   value="2">Sell</ToggleButton>
</ToggleButtonGroup>
</ThemeProvider>
<p className="text-[gray] text-[12px]">Buying or Selling?</p>
         

  <ThemeProvider theme={theme}>
<ToggleButtonGroup
  
 color= { isYes === true ? "primary" : 'secondary' }
  sx={{backgroundColor:'white', '@media screen and (min-width: 300px)': { width:'100%'}}}
  value={alignment}
  exclusive
  onChange={handleChange}
>
  <ToggleButton sx={{width:'100%', boxShadow:'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}  value="1">Yes</ToggleButton>
  <ToggleButton sx={{width:'100%', boxShadow:'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}   value="2">No</ToggleButton>
</ToggleButtonGroup>
</ThemeProvider>
<p className="text-[gray] text-[12px]">Prediction</p>

   

      <input
        class="w-full  mobile: py-4 pl-3 pr-55 text-[12px] shadow-md rounded-lg appearance-none focus:ring focus:outline-none focus:ring-black"
        name="LimitPrice"
        type="number"
        placeholder="Limit Price"
        required
      />
      <input
        class="w-full mobile:py-4 pl-3 pr-55 text-[12px] shadow-md rounded-lg appearance-none focus:ring focus:outline-none focus:ring-black"
        name="contractNumber"
        type="number"
        placeholder="# of Contracts"
        required
      />

      <button id='mint' class={isBuy == undefined ? "mt-5 w-3/4 h-[3rem] text-[13px] py-2 px-5 text-black bg-white opacity-60 rounded shadow-md mobile:w-full": isBuy == true ? "mt-5 w-3/4 h-[3rem]  text-[13px] py-2 px-5 text-black bg-[#416900] opacity-60 rounded shadow-md mobile:w-full":"mt-5 w-3/4 h-[3rem] text-[13px] py-2 px-5 text-black bg-[#BA1A1A] opacity-60 rounded shadow-md mobile:w-full"} type="submit">
      {isBuy == undefined ? 'Select Order Type' : isBuy === true ? 'Place Buy Order': 'Place Sell Order'}
      </button>
   
    </form>
  </React.Fragment>
  )

}