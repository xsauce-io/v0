import React from "react"
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen } from 'react-icons/hi'

export const ContractsCard = ({ title }) => {

    return (
        <div className="h-full  border-[1px]  border-[#0C1615] rounded-[10px] text-black">
            <div className='bg-[#ACFF00] rounded-t-[10px] border-b-[1px] p-2  w-[100%] hover:opacity-40  border-[#0C1615] ' />

            <div className='bg-white  px-4 text-left w-[100%] border-b-[1px] border-[#0C1615] '>
                <h1 className="py-2 pb-4  text-sm">CONTRACTS</h1>
                <grid className="grid grid-cols-2 pb-2">
                    <div className="grid grid-rows-2">

                        <p className="inline-block mr-1 text-xs">Positions</p>

                        <div className=" text-sm">12</div>
                    </div>
                    <div className="grid grid-rows-2">
                        <div className="text-xs items-center">Avg won</div>
                        <div className=" text-sm">12 positions</div>
                    </div>

                </grid>
            </div>

            <div className='bg-[#DCDEE1] rounded-b-[10px] text-left w-[100%]  space-y-2'>
                <div className='bg-[#DCDEE1] rounded-b-[10px]  text-left w-[100%] '>
                    <grid className="grid grid-cols-2 border-b-[1px] border-[#0C1615] px-4 p-2 w-full">
                        <div className="grid grid-rows-2">
                            <div className=" flex ">
                                <p className="inline-block mr-1 text-xs">Yes</p>
                                <RiArrowUpSFill />
                            </div>
                            <div className=" text-sm">8 shares </div>
                        </div>
                        <div className="grid grid-rows-2 ">
                            <div className=" text-xs flex"> <p className="inline-block mr-1 text-xs">No</p>  <RiArrowDownSFill /></div>
                            <div className=" text-sm">4 shares</div>
                        </div>
                    </grid>
                    <grid className="grid grid-cols-2 border-[#0C1615] p-2 px-4 w-full">
                        <div className="grid grid-rows-2">
                            <div className=" flex ">
                                <p className="inline-block mr-1 text-xs">Avg Price</p>
                                <RiArrowDownSFill />
                            </div>
                            <div className=" text-sm">$ 0,50</div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className=" text-xs">Average Winning</div>
                            <div className=" text-sm">78%</div>
                        </div>
                    </grid>
                </div>
            </div>

        </div>

    )
};