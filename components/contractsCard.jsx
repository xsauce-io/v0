import React from "react"
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/Ri";

export const ContractsCard = ({ title }) => {

    return (
        <div className="flex flex-col h-full w-3/7 border-[1.5px]  border-[#0C1615] rounded-[10px] text-black">
            <div className='bg-[#ACFF00] rounded-t-[10px] border-b-[1px] p-2  w-[100%] hover:opacity-40 flex border-[#0C1615] ' />

            <div className='bg-white  p-4 text-left w-[100%] border-b-[1px]   border-[#0C1615] '>
                <h1 className="py-2 pb-8">CONTRACTS</h1>
                <grid className="grid grid-cols-2">
                    <div className="grid grid-rows-2">
                        <div className=" flex ">
                            <p className="inline-block mr-1 text-sm">Positions</p>

                        </div>
                        <div>12</div>
                    </div>
                    <div className="grid grid-rows-2">
                        <div className=" text-sm">Avg won</div>
                        <div>12 positions</div>
                    </div>



                </grid>
            </div>

            <div className='bg-[#DCDEE1] rounded-b-[10px] text-left w-[100%]  space-y-2'>
                <div className='bg-[#DCDEE1] rounded-b-[10px]  text-left w-[100%] '>
                    <grid className="grid grid-cols-2 border-b-[1px] border-[#0C1615] px-4 p-2 w-full">
                        <div className="grid grid-rows-2">
                            <div className=" flex ">
                                <p className="inline-block mr-1 text-sm">Yes</p>
                                <RiArrowUpSFill />
                            </div>
                            <div>8 shares </div>
                        </div>
                        <div className="grid grid-rows-2 ">
                            <div className=" text-sm flex"> <p className="inline-block mr-1 text-sm">No</p>  <RiArrowDownSFill /></div>
                            <div>4 shares</div>
                        </div>
                    </grid>
                    <grid className="grid grid-cols-2 border-b-[1px] border-[#0C1615] p-2 px-4 w-full">
                        <div className="grid grid-rows-2">
                            <div className=" flex ">
                                <p className="inline-block mr-1 text-sm">Avg Price</p>
                                <RiArrowDownSFill />
                            </div>
                            <div>$ 0,50</div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className=" text-sm">Average Winning</div>
                            <div>78%</div>
                        </div>
                    </grid>
                </div>
            </div>

        </div>

    )
};