import React from "react"
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineBookOpen } from 'react-icons/hi'

export const FinancialOverview = ({ title }) => {

    return (
        <div class="flex flex-col h-full w-3/7  space-y-4 text-black">

            <button class='bg-[#DCDEE1] rounded-[10px] p-4 px-8 w-[100%] hover:opacity-40 flex '>
                <HiOutlineBookOpen class='self-center ' />
                <p class="px-4 ">Learn how the Xchange works</p>
                <BsArrowRight class='self-center ' />
            </button>

            <div class='bg-[#DCDEE1] rounded-[10px] p-4 text-left w-[100%] '>
                <h1 class="py-2">FINANCIAL OVERVIEW</h1>
                <grid class="grid grid-cols-3">
                    <div class="grid grid-rows-2">
                        <div class="text-[grey] flex ">
                            <p class="inline-block mr-1">Positions</p>
                            <BsArrowRight class='self-center' />
                        </div>
                        <div>12 positions</div>
                    </div>
                    <div class="grid grid-rows-2">
                        <div class="text-[grey]">Xsauce tokens</div>
                        <div>3,702 $SAUX</div>
                    </div>
                    <div class="grid grid-rows-2 ">
                        <div></div>
                        <div class=' justify-self-center' >
                            <button class="rounded-2xl px-3 bg-[#ACFF00] "> redeem</button>
                        </div>
                    </div>

                </grid>
            </div>

        </div>

    )
};