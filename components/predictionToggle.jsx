import React from "react"
import { BigNumber, ethers } from 'ethers'
import erc1155abi from '../abi/erc1155.json'
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded"
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const PredictToggle = () => {


const address = "0xb16a791282B604120E28e703C56D9Cb6E3C776b1"


  const handleTransfer = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const erc1155 = new ethers.Contract(address, erc1155abi, signer);
    await erc1155.mint(BigNumber.from(data.get("prediction")), BigNumber.from(data.get("contractNumber")), {
      value: ethers.utils.parseEther((0.05 * BigNumber.from(data.get("contractNumber"))).toString())
    });
  }

  //await erc1155.mint(BigNumber.from(data.get("prediction")), BigNumber.from(data.get("contractNumber")), BigNumber.from(data.get("condition")), BigNumber.from(data.get("order")){
    //  value: ethers.utils.parseEther((0.05 * BigNumber.from(data.get("contractNumber"))).toString()) });


    const [orderType, setOrderType] = React.useState('');
    const [conditionType, setConditionType] = React.useState('');
  
    const handleChange1 = (event) => {
      setOrderType(event.target.value);
    };

    const handleChange2 = (event) => {
      setConditionType(event.target.value);
      console.log(conditionType)
    };

    

  return (

    <React.Fragment>
      <form onSubmit={handleTransfer} className="flex flex-col pt-5">
   

      <FormControl sx={{ m: 1, }}>
        <InputLabel id="demo-simple-select-helper-label">Order Type</InputLabel>
        <Select
          sx={{backgroundColor: orderType === '' ? 'white' : orderType === 1 ? '#D8E9BC': '#FFB4AB'}}
          required
          labelId="orderType"
          name="order"
          value={orderType}
          label="Order Type"
          onChange={handleChange1}
        >
          <MenuItem value={1}>Buy</MenuItem>
          <MenuItem value={2}>Sell</MenuItem>
        </Select>
        <FormHelperText>Buying or Selling Your Position?</FormHelperText>
      </FormControl>

      <FormControl sx={{ m: 1, }}>
        <InputLabel id="demo-simple-select-helper-label">Condition Type</InputLabel>
        <Select
          sx={{backgroundColor: orderType === '' ? 'white' : orderType === 1 ? '#D8E9BC': '#FFB4AB'}}
          labelId="conditionType"
          name="condition"
          value={conditionType}
          label="Condition Type"
          onChange={handleChange2}
          required
        >
          <MenuItem value={1}>Yes</MenuItem>
          <MenuItem value={2}>No</MenuItem>
        </Select>
        <FormHelperText>Yes or No Prediction?</FormHelperText>
      </FormControl>
    
     

      <div className="space-y-4">
      <div class="relative">
      <label class="sr-only" for="amount"> Amount Desired</label>

      <input
        class="mobile:w-full py-4 pl-3 pr-55 text-[12px] border-2 border-gray-200 rounded-lg appearance-none focus:ring focus:outline-none focus:ring-black"
        name="contractNumber"
        type="number"
        placeholder="Limit Price"
        required
      />
    </div>
    <div class="relative">
      <label class="sr-only" for="amount"> Amount Desired</label>

      <input
        class="mobile:w-full py-4 pl-3 pr-55 text-[12px] border-2 border-gray-200 rounded-lg appearance-none focus:ring focus:outline-none focus:ring-black"
        name="contractNumber"
        type="number"
        placeholder="# of Contracts"
        required
      />
    </div>
    </div>
    <button id='mint' class={orderType === '' ? 'bg-white mobile:py-3 mx-20 my-5 outline outline-gray-400 text-black rounded-lg': orderType === 1 ? 'bg-[#D8E9BC] mobile:py-3 mx-20 my-5 outline outline-gray-400 text-black rounded-lg': 'bg-[#FFB4AB] mobile:py-3 mx-20 my-5 outline outline-gray-400 text-black rounded-lg'} type="submit">
       {orderType === '' ? 'Confirm': orderType === 1 ? 'Buy' : 'Sell'}
      </button>
      
    </form>

  </React.Fragment>
    



  )
}


