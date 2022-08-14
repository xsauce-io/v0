import React from "react"
import { BigNumber, ethers } from 'ethers'
import erc1155abi from '../abi/erc1155.json'
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded"
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded"
import { ButtonGroup } from "../components/marketCondTggle"
import { useState, useEffect } from "react"

export const Wagerinput = () => {


const address = "0xb16a791282B604120E28e703C56D9Cb6E3C776b1"


const [isYes, setIsYes] = useState(true);
const [clickedId, setClickedId] = useState(-1);


const handleClick = (event, id) => {
  event.preventDefault();
  setClickedId(id);
  if (event.target.value === "1") {
    setIsYes(true);
  } else if (event.target.value === "2") {
    setIsYes(false);
  }
};


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
    await erc1155.mint(BigNumber.from(data.get({prediction})), BigNumber.from(data.get("contractNumber")), {
      value: ethers.utils.parseEther((0.05 * BigNumber.from(data.get("contractNumber"))).toString())
    });
  }
    let buttonObject = [{ name: "Yes" }, { value: 2, name: "No" }]



  return (

    <React.Fragment>


      <form onSubmit={handleTransfer} className="flex flex-col space-y-5">

<div className="flex flex-row justify-center items-center h-14 bg-[gray] rounded-xl">

      {buttonObject.map((buttonObject, i) => (

     
       <input
          key={i}
          type='button'
          name='predicition'
          value={buttonObject.name}
          onClick={(event) => handleClick(event, i)}
          className={i === clickedId ? "bg-[#B6F563] w-1/2 h-14 rounded-xl" : "bg-[gray] w-1/2 h-14 rounded-xl"}
           />
      
        
      ))}
        
      </div>
  {/* <div class="relative">
    <input class="hidden" type="radio" name="prediction" value="1" id="yes"   />

    <label class="block bg-[#D8E9BC] p-4 text-sm font-medium transition-colors shadow-md rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 " for="yes">
    <ArrowCircleUpRoundedIcon sx={{fontSize:'30px' ,color:'#203700', outlineColor:'black'}}/>
    Yes 
     </label>
 

    <svg class="absolute w-5 h-5 text-blue-600 opacity-0 top-4 right-4 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
  </div>

  <div class="relative">
    <input class="hidden" type="radio" name="prediction" value="2" id="no" />

    <label class="block bg-[#D8E9BC] p-4 text-sm font-medium transition-colors shadow-md rounded-lg shadow-sm cursor-pointer  hover:bg-gray-50" for="no">
    No
    <ArrowCircleDownRoundedIcon sx={{fontSize:'30px' ,color:'red', paddingLeft:'5px'}}/>
  </label>

    <svg class="absolute w-5 h-5 text-blue-600 opacity-0 top-4 right-4 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
  </div> */}
  



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


