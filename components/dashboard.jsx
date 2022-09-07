
import React from "react"

export const Dashboard = ({ positions }) => {
  return (

    <a>
      <div className="flex flex-row text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]">
        <span className="flex flex-row  w-[30%] font-SG text-sm">
          {positions.name}
        </span>
        <span className="flex flex-row  w-[18.5%] text-xs">
          15,000 YES
        </span>
        <span className="flex flex-row w-[21.5%] text-xs">
          $ 7,500.00
        </span>
        <span className="flex flex-row w-[20%] text-xs">
          <span className="bg-[#ACFF00] text-black rounded-[40px] py-1 px-2 flex space-x-2">
            <img src="/filledArrowUp.svg" />
            <p> $ 15,000.00</p>
          </span>
        </span>
        <span className='flex flex-row w-[10%] text-xs'>
          0x75EE1fe...D61Cb&nbsp;&nbsp;↗
        </span>
      </div>
    </a>

  )
}