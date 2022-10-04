
import React from "react"
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js'
import {useGetMarketBySku } from '../services/useRequests';



export const Dashboard = ({ positions }) => {

	const { data: s1, error: e1 } = useGetMarketBySku(positions.sku);
console.log(s1)
  const screens = {
    mobile: "300",
    tablet: "640",
    laptop: "1200",
    desktop: "1400"
  }

  const explorer = 'https://goerli.etherscan.io/address/' + s1?.address;

  let truncateContract = (s1?.address).substring(0, 4) + '...' + (s1?.address).slice(-4);

  const { width } = useWindowDimensions();
  return (



    <a>
      {width >= screens.desktop ?
        <div className="flex flex-row  text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]">
          <span className="flex flex-row  w-[30%] font-SG text-sm">
            {s1?.name}
          </span>
          <span className="flex flex-row  w-[22%] text-xs font-Inter justify-center pl-4">
            {positions?.yes} Yes Sir
          </span>

          <span className="flex flex-row w-[38%] text-xs justify-center pr-3">
            <span className="bg-[#ACFF00] text-black rounded-[40px] py-1 px-2 flex ">
              <p className="text-xs font-Inter"> .50 cents{}</p>
            </span>
          </span>
        
          <a href={explorer} className='flex flex-row w-[10%] text-xs font-Inter underline'>
           {truncateContract} ↗
          </a>
        </div>
        : width >= screens.tablet ? <div className="flex flex-row  text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]">
          <span className="flex flex-row  w-[35%] font-SG text-sm ">
            {s1?.name}
          </span>
          <span className="flex flex-row  w-[25%] text-xs font-Inter justify-center">
            {positions?.yes} 105 Yes / 20 No
          </span>

          <span className="flex flex-row w-[25%] text-xs justify-center">
            <span className="bg-[#ACFF00] text-black rounded-[40px] py-1 px-2 flex ">
              <p className="text-xs font-Inter"> {}105 Yes / 20 No</p>
            </span>
          </span>
          <a href={explorer} className='flex flex-row w-[25%] text-xs font-Inter underline justify-center'>
          {truncateContract} ↗
          </a>
        </div> : <a href={explorer} className="flex flex-row  text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]">
          <span className="flex flex-row  w-[40%] font-SG text-xs text-ellipsis overflow-hidden ">
            {s1?.name}
          </span>
          <span className="flex flex-row  w-[50%] text-xs font-Inter justify-center bg-[#ACFF00] text-black rounded-[40px] py-1 px-2">
            {positions?.yes} 105 Yes / 20 No
          </span>
        
        </a>}
    </a>

  )
}