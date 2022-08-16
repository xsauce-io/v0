import React from "react"
import { BigNumber, ethers } from 'ethers'
import erc1155abi from '../abi/erc1155.json'
import { useState, useEffect } from "react"
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { createTheme, ThemeProvider } from '@mui/material/styles'




export const PredictToggle = () => {


const address = "0xb16a791282B604120E28e703C56D9Cb6E3C776b1"

const [alignment, setAlignment] = useState();
const [isYes, setIsYes] = useState();
const [order, setOrder] = useState();
const [isBuy, setIsBuy] = useState();

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



const handleClick = (e) => {
  e.preventDefault();
  console.log(alignment)
  
  }



  const handleTransfer = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get("contractNumber"));
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const erc1155 = new ethers.Contract(address, erc1155abi, signer);
    await erc1155.mint(BigNumber.from(alignment), BigNumber.from(data.get("contractNumber")), {
      value: ethers.utils.parseEther((0.05 * BigNumber.from(data.get("contractNumber"))).toString())
    });
  }
   



  return (

    <React.Fragment>


      <form onSubmit={handleTransfer} className="flex flex-col space-y-4 justify-center items-center mobile:w-full laptop:w-1/3">


    
  <ThemeProvider theme={theme}>
<ToggleButtonGroup
  
 color= { isBuy === true ? "primary" : 'secondary' }
  sx={{backgroundColor:'white', '@media screen and (min-width: 300px)': { width:'100%'}}}
  value={order}
  exclusive
  
  
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
      />
      <input
        class="w-full mobile:py-4 pl-3 pr-55 text-[12px] shadow-md rounded-lg appearance-none focus:ring focus:outline-none focus:ring-black"
        name="contractNumber"
        type="number"
        placeholder="# of Contracts"
      />

      <button id='mint' class={isBuy == undefined ? "mt-5 w-3/4 h-[3rem] text-[13px] py-2 px-5 text-black bg-white opacity-60 rounded shadow-md mobile:w-full": isBuy == true ? "mt-5 w-3/4 h-[3rem]  text-[13px] py-2 px-5 text-black bg-[#416900] opacity-60 rounded shadow-md mobile:w-full":"mt-5 w-3/4 h-[3rem] text-[13px] py-2 px-5 text-black bg-[#BA1A1A] opacity-60 rounded shadow-md mobile:w-full"} type="submit">
      {isBuy == undefined ? 'Select Order Type' : isBuy === true ? 'Place Buy Order': 'Place Sell Order'}
      </button>
   
    </form>
  </React.Fragment>
  )

}