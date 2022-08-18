import React from "react";
import { Skeleton } from "@mui/material";
import Link from 'next/link'


export const CardPreMarket = ({cardObject}) => {
const cardObjectHref = "/pre-market/" + cardObject.sku

  return (
    <Link href={cardObjectHref}>
    <a class="transition duration-500 hover:scale-105 flex flex-row overflow-hidden rounded-2xl bg-gray-500 bg-opacity-50
 justify-center laptop:h-[400px]">

                      { cardObject === undefined ?
                        <React.Fragment>
                          <Skeleton variant="rectangular" sx={{backgroundColor:'white', height:'300px'}} />
                        </React.Fragment> :
                        <React.Fragment>
      <div class="p-4 flex flex-row items-center laptop:flex-col">

        {cardObject.image?.original === '' ?
          <React.Fragment>
            <img class='mobile:h-[30px] px-4' src='/sneakericon1.svg'/>
          </React.Fragment> :
          cardObject.image?.original === 'https://image.goat.com/placeholders/product_templates/original/missing.png' ?
          <React.Fragment>
            <img class='mobile:h-[30px] px-4' src='/sneakericon1.svg'/>
          </React.Fragment> :
        <img class='mobile:h-[70px] px-4 laptop:h-[200px]' src={cardObject.image?.original}/> 
        }
        

 
        <div class='flex flex-col align-middle justify-center'>
        <h5 class="text-[15px] text-[#F5DEB3]">{cardObject.name}</h5>
        <div class='flex flex-row w-full align-middle justify-center items-center p-2'>
          

          <p class="text-[16px] text-white px-4 laptop:text-[20px]">Prediction: Price {">"} $300</p>


         
        </div>


        <p class="mt-2 text-[12px] text-[#F5DEB3] laptop:text-[16px]">Market closes on 08/15/2022 @ 12:00PM EST</p>
        </div>
      </div>
      </React.Fragment>
}
    </a>
    </Link>

  )
}