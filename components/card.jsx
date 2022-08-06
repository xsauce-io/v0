import React from "react";
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';


export const Card = () => {

  return (
<a href="/wager" class="flex flex-col pb-8 overflow-hidden rounded-2xl">
 

  <div class="p-4 bg-gray-900 rounded-b-2xl">
    <h5 class="text-xl text-[#F5DEB3]">Adidas Yeezy Boost 350</h5>
    <div class='flex flex-row w-full align-middle justify-center p-4'>
    <div class="text-[#F5DEB3]">
    <p class="text-xs">True</p>
    <ArrowCircleUpRoundedIcon sx={{fontSize:'50px' ,color:'#ACFF00'}}/>
    <p class="text-xs">+100</p>
    </div>

    <p class="text-sm text-white px-4 py-8">Price {">"} $300</p>


    <div class="text-[#F5DEB3]">
    <p class="text-xs">False</p>
    <ArrowCircleDownRoundedIcon sx={{color:'red', fontSize:'50px'}}/>
    <p class="text-xs">- 100</p>
    </div>
    </div>
    

    <p class="mt-2 text-xs text-[#F5DEB3]">Market closes on 08/15/2022 @ 12:00PM EST</p>
  </div>
</a>

  )
}