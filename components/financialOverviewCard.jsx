import React from "react"
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen } from 'react-icons/hi'

export const FinancialOverviewCard = ({ title }) => {

    return (
        <div className="flex flex-col  border-[1px]  border-[#0C1615] rounded-[10px] text-black">
            <div className='bg-[#ACFF00]  rounded-t-[10px] border-b-[1px] p-2  w-[100%] hover:opacity-40 border-[#0C1615] ' />

            <div className='bg-white px-4 text-left w-[100%] border-b-[1px] border-[#0C1615]'>
                <h1 className="py-2 pb-4 text-sm">FINANCIAL OVERVIEW</h1>
                <grid className="grid grid-cols-3 pb-2">
                    <div className="grid grid-rows-2 ">
                        <div className="flex">
                            <p className="inline-block mr-1 text-xs">Shares</p>
                        </div>
                        <div className=" text-sm">12 positions</div>
                    </div>
                    <div className="grid grid-rows-2">
                        <div className=" text-xs">Market Value</div>
                        <div className=" text-sm">3,702 00$</div>

                    </div>
                    <div className="grid grid-rows-2">
                        <div className=" text-xs">Avg Investement</div>
                        <div className=" text-sm"> 3,702.00$</div>
                    </div>


                </grid>
            </div>

            <div className='flex-1 items-center bg-[#DCDEE1] rounded-b-[10px] p-4  border-[1px] text-left w-[100%]  space-y-2'>
                <div className='bg-white items-center p-2  px-4 text-left w-[100%] border-[1px] rounded-3xl border-[#0C1615] w-full flex' >
                    <p className="text-left text-xs flex-2">
                        Today's return
                    </p>
                    <p className="text-right text-xs flex-1">
                        + $ 3,612.50 (+ 2.35%)
                    </p>
                </div>
                <div className='bg-white p-2  px-4 text-left w-[100%] border-[1px]  rounded-3xl border-[#0C1615] w-full flex' >
                    <p className="text-left text-xs flex-2">
                        Today's return
                    </p>
                    <p className="text-right text-xs flex-1">
                        + $ 3,612.50 (+ 2.35%)
                    </p>
                </div>
            </div>

        </div>

    )
};