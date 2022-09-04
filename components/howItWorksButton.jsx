import React from "react"
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen } from 'react-icons/hi'

export const HowItWorksButton = ({ title }) => {

    return (
        <div className="flex flex-col h-full w-3/7  rounded-[10px] text-black">

            <button className='bg-white rounded-t-[10px] py-5 px-10 w-[100%] border-b-[1px] border-[#0C1615] hover:opacity-40 flex '>
                <HiOutlineBookOpen className='self-center' />

                <p className="px-4 ">Learn how the Xchange works</p>
                <BsArrowRight className='self-center' />
            </button>

            <div className='bg-[#DCDEE1] rounded-b-[10px] p-4 text-left w-[100%] space-y-2 '>
                <div className="py-2 flex space-x-2 text-sm">
                    <h1>FINANCIAL OVERVIEW </h1>
                    <button className="rounded-2xl px-3 bg-[#ACFF00] text-sm ">Redeem</button>

                </div>
                <grid className="grid grid-cols-2">
                    <div className="grid grid-rows-2">
                        <div className=" flex ">
                            <p className="inline-block mr-1 text-sm">Positions</p>
                            <BsArrowRight className='self-center' />
                        </div>
                        <div>12 positions</div>
                    </div>
                    <div className="grid grid-rows-2">
                        <div className=" text-sm">Xsauce tokens</div>
                        <div>3,702 $SAUX</div>
                    </div>
                </grid>
                <grid className="grid grid-cols-2">
                    <div className="grid grid-rows-2">
                        <div className=" flex ">
                            <p className="inline-block mr-1 text-sm">Positions</p>
                            <BsArrowRight className='self-center' />
                        </div>
                        <div>12 positions</div>
                    </div>
                    <div className="grid grid-rows-2">
                        <div className=" text-sm">Xsauce tokens</div>
                        <div>3,702 $SAUX</div>
                    </div>
                </grid>
            </div>

        </div>

    )
};