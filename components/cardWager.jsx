import React from "react";
import { Skeleton } from "@mui/material";
import Link from 'next/link'


export const Card = ({cardObject}) => {
const cardObjectHref = "/wager/" + cardObject.sku

  return (
    <Link href={cardObjectHref}>
     <a class="transition duration-500 hover:shadow-2xl hover:scale-105 hover:shadow-[#ACFF00] rounded-md flex flex-row overflow-hidden bg-black backdrop-blur-sm shadow-lg
 justify-center laptop:h-[400px] relative">

                      { cardObject === undefined ?
                        <React.Fragment>
                          <Skeleton variant="rectangular" sx={{backgroundColor:'white', height:'300px'}} />
                        </React.Fragment> :
                        <React.Fragment>
      <div class="flex flex-row items-center laptop:flex-col">
                          
        {cardObject.image?.original === '' ?
          <React.Fragment>
            <img class='mobile:h-[30px] px-4' src='/sneakericon1.svg'/>
          </React.Fragment> :
          cardObject.image?.original === 'https://image.goat.com/placeholders/product_templates/original/missing.png' ?
          <React.Fragment>
            <img class='mobile:h-[30px] px-4' src='/sneakericon1.svg'/>
          </React.Fragment> :
          <React.Fragment>
            <div className='bg-[#E3E3DB] w-[423px] h-[10%] flex flex-row justify-center items-center p-8'>
          <h5 class="text-[15px]  text-black">{cardObject.name}</h5>
          </div>
        <img class='mobile:h-[70px] px-4 laptop:h-[200px]' src={cardObject.image?.original}/> 
        </React.Fragment>
        }
        

 
        <div class='flex flex-col align-middle justify-center bg-[#E3E3DB] w-[423px] h-1/3 absolute bottom-0'>
        
          <p class="text-[16px] text-black px-4 laptop:text-[20px]">Prediction: Price {">"} $300</p>

        <p class="mt-2 text-[12px] text-black laptop:text-[16px]">Market closes on 08/15/2022 @ 12:00PM EST</p>
        </div>
      </div>
      </React.Fragment>
}
    </a>
    </Link>

  )
}