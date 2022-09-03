import React from "react"
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';

export const Wagerbtn = () => {

  return (
<div className="flex flex-row w-full justify-center">
<div className="flex flex-row items-center space-x-5">
  <button className=" px-10 py-2 bg-[#D8E9BC] rounded outline outline-1 outline-black focus:outline-none  focus:bg-white  text-black" type="radio" value="1">
    <span className="sr-only"> True </span>

    <ArrowCircleUpRoundedIcon sx={{fontSize:'30px' ,color:'#203700', outlineColor:'black'}}/>
    Yes  </button>




  <button className=" px-10 py-2 bg-[#D8E9BC] rounded outline outline-1 outline-black focus:outline-none focus:bg-white text-black" type="radio" value="2">
    <span className="sr-only"> False </span>

    
    No
    <ArrowCircleDownRoundedIcon sx={{fontSize:'30px' ,color:'red', paddingLeft:'5px'}}/>
  </button>
</div>

</div>

  )

}