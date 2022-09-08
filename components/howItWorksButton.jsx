import React from "react"


export const HowItWorksButton = ({ title }) => {

    return (
        <div className="flex flex-col h-full w-3/7  rounded-[10px] text-black">

            <button className='bg-white rounded-t-[10px] py-5 pr-10  pl-5 w-[100%] border-b-[1px] border-[#0C1615] hover:opacity-40 flex  items-center'>
                <img className="" src="/openbook.svg" />

                <p className="px-4 text-sm ">Learn how the Xchange works</p>

                <img className="" src="/slimRightArrow.svg" />
            </button>

            <div className='bg-[#DCDEE1] rounded-b-[10px] p-4 text-left w-[100%] space-y-2 '>
                <div className="py-2 flex space-x-2 text-sm">
                    <h1 className=" text-sm">FINANCIAL OVERVIEW </h1>
                    <button className="rounded-2xl px-3 bg-[#ACFF00] text-xs ">Redeem</button>

                </div>
                <grid className="grid grid-cols-2">
                    <div className="grid grid-rows-2">
                        <div className=" flex ">
                            <p className="inline-block mr-1 text-xs">Positions</p>

                        </div>
                        <div className=" text-sm">12 positions</div>
                    </div>
                    <div className="grid grid-rows-2">
                        <div className=" text-xs">Xsauce tokens</div>
                        <div className=" text-sm">3,702 $SAUX</div>
                    </div>
                </grid>
                <grid className="grid grid-cols-2">
                    <div className="grid grid-rows-2">
                        <div className=" flex ">
                            <p className="inline-block mr-1 text-xs">Positions</p>
                        </div>
                        <div className=" text-sm">12 positions</div>
                    </div>
                    <div className="grid grid-rows-2">
                        <div className=" text-xs">Xsauce tokens</div>
                        <div className=" text-sm"> 3,702 $SAUX</div>
                    </div>
                </grid>
            </div>

        </div>

    )
};