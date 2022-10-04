
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
      {width >= screens.desktop ?
        <div className="flex flex-row  text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]">
          <span className="flex flex-row  w-[30%] font-SG text-sm">
            {positions.name}
          </span>
          <span className="flex flex-row  w-[18.5%] text-xs font-Inter">
            {balances?.yes}
          </span>
          <span className="flex flex-row  w-[21.5%] text-xs font-Inter">
            $7,500
          </span>

          <span className="flex flex-row w-[20%] text-xs">
            <span className="bg-[#ACFF00] text-black rounded-[40px] py-1 px-2 flex space-x-2">
              <img className="w-[8px]" src="/upfull.svg" />
              <p className="text-xs font-Inter"> $ 15,000.00</p>
            </span>
          </span>
          <span className='flex flex-row w-[10%] text-xs font-Inter'>
           {positions.address} ↗
          </span>
        </div>
        : width >= screens.tablet ? <div className="flex flex-row  text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]">
          <span className="flex flex-row  w-[30%] font-SG text-sm ">
            {positions?.name}
          </span>
          <span className="flex flex-row  w-[18.5%] text-xs font-Inter">
            {balances?.yes}
          </span>

          <span className="flex flex-row w-[20%] text-xs">
            <span className="bg-[#ACFF00] text-black rounded-[40px] py-1 px-2 flex space-x-2">
              <img className="w-[8px]" src="/upfull.svg" />
              <p className="text-xs font-Inter"> $ 15,000.00</p>
            </span>
          </span>
          <span className='flex flex-row w-[18%] text-xs font-Inter'>
          {positions.name} ↗
          </span>
        </div> : <div className="flex flex-row  text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]">
          <span className="flex flex-row  w-[40%] font-SG text-xs text-ellipsis overflow-hidden ">
            {positions.address}
          </span>
          <span className="flex flex-row  w-[28.5%] text-xs font-Inter">
            {balances?.yes}
          </span>

          <span className="flex flex-row w-[32%]  ">
            <span className="bg-[#ACFF00] text-black rounded-[40px] py-1 px-2 flex space-x-2">
              <p className="text-xs font-Inter">$15,000.00</p>
            </span>
          </span>

        </div>}
    </a>

  )
}