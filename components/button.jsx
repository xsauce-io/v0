import React from "react"
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';

export const Wagerbtn = () => {

  return (
<div className="flex flex-row w-full justify-center">
<div class="inline-flex items-center overflow-hidden rounded">
  <button class="px-14 py-2 bg-black focus:outline-none focus:text-black focus:bg-white active:bg-gray text-white" type="button">
    <span class="sr-only"> True </span>

    <ArrowCircleUpRoundedIcon sx={{fontSize:'30px' ,color:'#ACFF00', paddingRight:'5px'}}/>
    True
  </button>


  <span class="w-px h-4 bg-white/25"></span>

  <button class="px-14 py-2 bg-black focus:outline-none focus:text-black focus:bg-white active:bg-white text-white" type="button">
    <span class="sr-only"> False </span>

    
    False
    <ArrowCircleDownRoundedIcon sx={{fontSize:'30px' ,color:'red', paddingLeft:'5px'}}/>
  </button>
</div>

</div>

  )

}