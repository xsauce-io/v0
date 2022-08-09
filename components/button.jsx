import React from "react"
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';

export const Wagerbtn = () => {

  return (
<div className="flex flex-row w-full justify-center">
<div class="inline-flex items-center overflow-hidden rounded outline">
  <button class=" px-10 py-2 bg-[#D8E9BC] outline focus:outline-none focus:text-black focus:bg-white active:bg-gray text-black" type="button">
    <span class="sr-only"> True </span>

    <ArrowCircleUpRoundedIcon sx={{fontSize:'30px' ,color:'#203700', paddingRight:'5px', outlineColor:'black'}}/>
    Yes 60¢  </button>


  <span class="w-px h-4"></span>

  <button class=" px-10 py-2 bg-[#D8E9BC] focus:outline-none focus:text-black focus:bg-white active:bg-white text-black" type="button">
    <span class="sr-only"> False </span>

    
    No 40¢
    <ArrowCircleDownRoundedIcon sx={{fontSize:'30px' ,color:'red', paddingLeft:'5px'}}/>
  </button>
</div>

</div>

  )

}