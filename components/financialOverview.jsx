import React from "react"
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen } from 'react-icons/hi'

export const FinancialOverview = ({ title }) => {

    return (
        <div className="flex flex-col h-full w-3/7  rounded-[10px] text-black">

            <button className='bg-[#DCDEE1] rounded-t-[10px] p-4 px-8 w-[100%] hover:opacity-40 flex '>
                <HiOutlineBookOpen className='self-center' />
                <p className="px-4 ">Learn how the Xchange works</p>
                <BsArrowRight className='self-center' />
            </button>

            <div className='bg-[#DCDEE1] rounded-b-[10px] p-4 text-left w-[100%] '>
                <h1 className="py-2">FINANCIAL OVERVIEW</h1>
                <grid className="grid grid-cols-3">
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
                    <div className="grid grid-rows-2 ">
                        <div></div>
                        <div className=' justify-self-center' >
                            <button className="rounded-2xl px-3 bg-[#ACFF00] "> redeem</button>
                        </div>
                    </div>

                </grid>
            </div>

        </div>

    )
};