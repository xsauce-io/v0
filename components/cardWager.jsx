import React from "react";
import { Skeleton } from "@mui/material";
import Link from 'next/link'


export const Card = ({cardObject}) => {
const cardObjectHref = "/live-market/" + cardObject.sku

  return (
    <Link href={cardObjectHref}>
     <a className="mt-10 transition duration-500 bg-black rounded-md shadow-md shadow-black text-black hover:shadow-2xl hover:shadow-black flex flex-col overflow-hidden 
 laptop:h-[420px] w-[280px] items-start text-left">

                      { cardObject === undefined ?
                        <React.Fragment>
                          <Skeleton variant="rectangular" sx={{backgroundColor:'white', height:'300px'}} />
                        </React.Fragment> :
                        <React.Fragment>
      <div className="flex flex-row items-center laptop:flex-col laptop:space-y-2 laptop:justify-center">
                          
        {cardObject.image?.original === '' ?
          <React.Fragment>
            <img className='mobile:h-[30px] px-4' src='/sneakericon1.svg'/>
          </React.Fragment> :
          cardObject.image?.original === 'https://image.goat.com/placeholders/product_templates/original/missing.png' ?
          <React.Fragment>
            <img className='mobile:h-[30px] px-4' src='/sneakericon1.svg'/>
          </React.Fragment> :
          <React.Fragment>
            <div className="w-full h-[125px] bg-white flex flex-col justify-center items-center">
        <img className='object-cover mobile:h-[70px] px-4 laptop:w-[50%] laptop:h-[75%]' src={cardObject.image?.original}></img>
        </div>
        
          <h1 className="text-[20px] font-bold text-white h-[22%] w-[280px] line-clamp-2 px-4 ">{cardObject.name}</h1>
          <h2 className=" text-[12px] text-left w-full border-b-[1px] border-[#30403F] text-white px-4 pb-4 ">Retail Price: ${cardObject.retailPrice}</h2>
    
        {/* Information in this div will be fed by the contract. Can grab it on load in the main index and pass it as another object */}
      
        
       
       
     
      
        
        </React.Fragment>
        }
          <div className="flex flex-col w-full px-4 space-y-3">
        <h1 className="text-[12px] text-white ">Will the price be over $300?
       </h1>
         
        <div className='flex flex-row items-center border-[#30403F] border-[1px] rounded-[40px]  w-[80%] h-[40%] py-2 px-3 space-x-2 items-center'>
          
        
          <p className=" bg-[#ACFF00] text-black  rounded-[40px]  flex flex-row justify-center laptop:text-[10px] py-1 border-[1px] border-[#30403F] h-full w-full">No - 60%</p>

        <p className="text-black rounded-[40px] flex flex-row justify-center laptop:text-[10px] border-[1px] py-1 border-[#30403F] h-full w-full">Yes - 40%</p>
        </div>
        <div className='flex flex-row items-center text-white text-[12px]  border-[#30403F] border-[1px] rounded-[40px]  w-[80%] h-[40%] py-2 px-3 items-center'> Place a wager on this sneaker</div>
          
     
       
        
        <div className=" px-4 pb-14 w-[60%]">
     
        <h2 className=" text-[12px] text-[#748282] ">Expires 09.10.2022</h2>
        </div> 
        
      
      </div>
      </div>
      </React.Fragment>
}
    </a>
    </Link>

  )
}