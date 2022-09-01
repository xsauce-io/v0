import React from "react";
import { Skeleton } from "@mui/material";
import Link from 'next/link'


export const CardPreMarket = ({cardObject}) => {
const cardObjectHref = "/pre-market/" + cardObject.sku

const number = "40%"

  return (
    <Link href={cardObjectHref}>
     <a class="transition duration-500 bg-[#F1F1F1] rounded-md shadow-md shadow-black text-black hover:shadow-2xl hover:shadow-black flex flex-col overflow-hidden 
 laptop:h-[420px] w-[390px] items-center text-center p-4">

                      { cardObject === undefined ?
                        <React.Fragment>
                          <Skeleton variant="rectangular" sx={{backgroundColor:'white', height:'300px'}} />
                        </React.Fragment> :
                        <React.Fragment>
      <div class="flex flex-row items-center laptop:flex-col laptop:space-y-5 laptop:justify-center">
                          
        {cardObject.image?.original === '' ?
          <React.Fragment>
            <img class='mobile:h-[30px] px-4' src='/sneakericon1.svg'/>
          </React.Fragment> :
          cardObject.image?.original === 'https://image.goat.com/placeholders/product_templates/original/missing.png' ?
          <React.Fragment>
            <img class='mobile:h-[30px] px-4' src='/sneakericon1.svg'/>
          </React.Fragment> :
          <React.Fragment>
           
          <h1 class="text-[25px] font-bold  h-[22%] w-[370px] line-clamp-2 px-3">{cardObject.name}</h1>
        {/* Information in this div will be fed by the contract. Can grab it on load in the main index and pass it as another object */}
      
         <div className="w-full flex flex-col items-center">
        <img class='object-cover mobile:h-[70px] px-4 laptop:w-[230px] laptop:h-[120px] ' src={cardObject.image?.original}></img>
        </div>
        
       
       
     
      
        
        {/* </div> */}
        
        </React.Fragment>
        }
          <div className="flex flex-col w-full rounded-md space-y-3">
        <h1 class="text-[20px] pt-2 ">Will the price be over $300?
       </h1>
         
        <div class='flex flex-row items-left  w-full h-[50px] py-2 px-3 items-center'>
          
        
          <p class="text-[10px] bg-[#CD0C0C] text-white   flex flex-col justify-center laptop:text-[14px]   border-black h-full   w-[40%]">🧊 No - 40%</p>

        <p class="text-[10px] bg-[#099309] text-white flex flex-col justify-center laptop:text-[14px]   border-black h-full w-[60%]">🔥 Yes - 60%</p>
        </div>
        
     
       
        
        <div className=" px-2 pb-2 w-full rounded-bl-md rounded-br-md  ">
        <h2 className=" text-[16px] ">Projected Retail Price: ${cardObject.retailPrice}</h2>
        <h2 className=" text-[12px] underline  ">Expires 09.10.2022</h2>
        </div> 
        
      
      </div>
      </div>
      </React.Fragment>
}
    </a>
    </Link>

  )
}