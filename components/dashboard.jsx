
import React from "react"

export const Dashboard = ({positions}) => {
    return (
     
       <a>
        <div className="flex flex-row text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-4 my-[.5rem]">
          <span className="flex flex-row  w-[30%] font-SG">
          {positions.name}
          </span>
          <span className="flex flex-row  w-[18.5%]">
          15,000 YES
          </span>
          <span className="flex flex-row w-[21.5%]">
           $ 7,500.00
          </span>
          <span className="flex flex-row w-[20%]">
          <span className="bg-[#ACFF00] text-black rounded-[40px] py-[2px] px-[5px]">
           $ 15,000.00
          </span>
          </span>
          <span className='flex flex-row w-[10%]'>
          0x75EE1fe...D61Cb&nbsp;&nbsp;↗
          </span>
        </div>
        </a>
        
    )
}