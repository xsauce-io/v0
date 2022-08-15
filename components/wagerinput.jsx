import React from "react"
import { BigNumber, ethers } from 'ethers'
import erc1155abi from '../abi/erc1155.json'
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded"
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded"
import { ButtonGroup } from "../components/marketCondTggle"
import { useState, useEffect } from "react"
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';



export const Wagerinput = () => {


const address = "0xb16a791282B604120E28e703C56D9Cb6E3C776b1"

const [alignment, setAlignment] = React.useState();

const handleChange = (event, newAlignment) => {
  setAlignment(newAlignment);
};



const [isYes, setIsYes] = useState('Yes');
const [clickedId, setClickedId] = useState(-1);


const handleClick = (e) => {
  e.preventDefault();
  console.log(alignment)
  }

// const printButtonLabel = (event) => {
//   console.log(event.target.value);
//   if (event.target.value === "1") {
//     setIsLong(true);
//   } else if (event.target.value === "2") {
//     setIsLong(false);
//   }
// };


  //use effect sets 1st button to clicked
  useEffect(() => {
    setClickedId(0);
  }, []);


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


      <form onSubmit={handleTransfer} className="flex flex-col space-y-5">

<div className="flex flex-row justify-center items-center">
<ToggleButtonGroup
  color="primary"
  value={alignment}
  exclusive
  onChange={handleChange}
  onClick={handleClick}
>
  <ToggleButton  value="1">Yes</ToggleButton>
  <ToggleButton  value="2">No</ToggleButton>
</ToggleButtonGroup>


         
      </div>
   {/* <div class="relative">
    <input class="hidden" type="radio" name="prediction" value="1" id="yes"  onClick={handleClick} />

    <label class="block bg-[#D8E9BC] p-4 text-sm font-medium transition-colors shadow-md rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 " for="yes">
    <ArrowCircleUpRoundedIcon sx={{fontSize:'30px' ,color:'#203700', outlineColor:'black'}}/>
    Yes 
     </label>
 

    <svg class="absolute w-5 h-5 text-blue-600 opacity-0 top-4 right-4 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
  </div>

  <div class="relative">
    <input class="hidden" type="radio" name="prediction" value="2" id="no"  onClick={handleClick}/>

    <label class="block bg-[#D8E9BC] p-4 text-sm font-medium transition-colors shadow-md rounded-lg shadow-sm cursor-pointer  hover:bg-gray-50" for="no">
    No
    <ArrowCircleDownRoundedIcon sx={{fontSize:'30px' ,color:'red', paddingLeft:'5px'}}/>
  </label>

    <svg class="absolute w-5 h-5 text-blue-600 opacity-0 top-4 right-4 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
  </div> 
   */}



    <div class="relative">
      <label class="sr-only" for="amount"> Amount Desired</label>

      <input
        class="mobile:w-full py-4 pl-3 pr-55 text-[12px] shadow-md rounded-lg appearance-none focus:ring focus:outline-none focus:ring-black"
        name="contractNumber"
        type="number"
        placeholder="# of Contracts"
      />

      <button id='mint' class="absolute py-2 px-5 text-black -translate-y-1/2 bg-[#D8E9BC] rounded-lg top-1/2 right-3" type="submit">
        Buy
      </button>
    </div>
    </form>
  </React.Fragment>
    



  )

  }

