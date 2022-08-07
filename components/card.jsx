import React from "react";
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import { Skeleton } from "@mui/material";


export const Card = ({cardObject}) => {

  return (
    <a href="/wager" class="flex flex-row overflow-hidden rounded-2xl bg-black ">

                      { cardObject === undefined ?
                        <React.Fragment>
                            <Skeleton variant="rectangular" sx={{backgroundColor:'white', height:'30px'}} />
                        </React.Fragment> :
                        <React.Fragment>
      <div class="p-4 flex flex-row items-center">
        <img class='h-[25px] px-4' src="/sneakericon1.svg"/>
        <div class='flex flex-col align-middle justify-center'>
        <h5 class="text-[15px] text-[#F5DEB3]">{cardObject.name}</h5>
        <div class='flex flex-row w-full align-middle justify-center items-center p-2'>
          <div class="text-[#F5DEB3]">
            <p class="text-xs">True</p>
            <ArrowCircleUpRoundedIcon sx={{ fontSize: '30px', color: '#ACFF00', py:'4px' }} />
            <p class="text-xs">+100</p>
          </div>

          <p class="text-[10px] text-white px-4">Price {">"} $300</p>


          <div class="text-[#F5DEB3]">
            <p class="text-xs">False</p>
            <ArrowCircleDownRoundedIcon sx={{ color: 'red', fontSize: '30px' , py:'4px' }} />
            <p class="text-xs">-100</p>
          </div>
        </div>


        <p class="mt-2 text-[9px] text-[#F5DEB3]">Market closes on 08/15/2022 @ 12:00PM EST</p>
        </div>
      </div>
      </React.Fragment>
}
    </a>

  )
}