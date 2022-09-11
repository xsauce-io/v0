
import React from "react"
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js'

export const Dashboard = ({ positions }) => {
  const screens = {
    mobile: "300",
    tablet: "640",
    laptop: "1200",
    desktop: "1400"
  }

  const { width } = useWindowDimensions();
  return (



    <a>
      {width >= screens.laptop ?
        <div className="flex flex-row  text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]">
          <span className="flex flex-row  w-[30%] font-SG text-sm">
            {positions?.name}
          </span>
          <span className="flex flex-row  w-[18.5%] text-xs">
            15,000 YES
          </span>

          <span className="flex flex-row w-[20%] text-xs">
            <span className="bg-[#ACFF00] text-black rounded-[40px] py-1 px-2 flex space-x-2">
              <img className="w-[8px]" src="/upfull.svg" />
              <p> $ 15,000.00</p>
            </span>
          </span>
          <span className='flex flex-row w-[10%] text-xs'>
            0x75EE1fe...D61Cb&nbsp;&nbsp;↗
          </span>
        </div>
        : width >= screens.tablet ? <div className="flex flex-row  text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]">
          <span className="flex flex-row  w-[30%] font-SG text-sm">
            {positions?.name}
          </span>
          <span className="flex flex-row  w-[18.5%] text-xs">
            15,000 YES
          </span>

          <span className="flex flex-row w-[20%] text-xs">
            <span className="bg-[#ACFF00] text-black rounded-[40px] py-1 px-2 flex space-x-2">
              <img className="w-[8px]" src="/upfull.svg" />
              <p> $ 15,000.00</p>
            </span>
          </span>
          <span className='flex flex-row w-[18%] text-xs'>
            0x75EE1fe...D61Cb&nbsp;&nbsp;↗
          </span>
        </div> : <div className="flex flex-row  text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]">
          <span className="flex flex-row  w-[40%] font-SG text-xs text-ellipsis overflow-hidden ">
            {positions?.name}
          </span>
          <span className="flex flex-row  w-[28.5%] text-xs">
            15,000 YES
          </span>

          <span className="flex flex-row w-[32%] text-xs ">
            <span className="bg-[#ACFF00] text-black rounded-[40px] py-1 px-2 flex space-x-2">
              <p className="text-xs">$15,000.00</p>
            </span>
          </span>

        </div>}
    </a >

  )
}