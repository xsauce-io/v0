import React from "react"


export const ContractsCard = ({ title }) => {

    return (
        <div className=" border-[1px]  border-[#0C1615] rounded-[10px] text-black flex flex-col" >
            <div className='bg-[#ACFF00] rounded-t-[10px] border-b-[1px] p-2  w-[100%] hover:opacity-40  border-[#0C1615] ' />

            <div className='bg-white  px-4 text-left w-[100%] border-b-[1px] border-[#0C1615] flex-1'>
                <h1 className="py-2 pb-4  text-sm font-Inter">CONTRACTS</h1>
                <grid className="grid grid-cols-2 pb-2">
                    <div className="grid grid-rows-2">

                        <p className="inline-block mr-1 text-xs font-Inter">Positions</p>

                        <div className="text-sm font-Inter">12</div>
                    </div>
                    <div className="grid grid-rows-2 font-Inter">
                        <div className="text-xs items-center font-Inter">Avg won</div>
                        <div className=" text-sm font-Inter">12 positions</div>
                    </div>

                </grid>
            </div>

            <div className='bg-[#DCDEE1] rounded-b-[10px] text-left w-[100%] space-y-2  flex-1'>
                <div className='bg-[#DCDEE1] rounded-b-[10px]  text-left w-[100%] '>
                    <grid className="grid grid-cols-2 border-b-[1px] border-[#0C1615] px-4 p-2 w-full">
                        <div className="grid grid-rows-2">
                            <div className=" flex items-center ">
                                <p className="inline-block mr-1 text-xs font-Inter">Yes</p>
                                <img className="w-[8px]" src="/upfull.svg" />


                            </div>
                            <div className="text-sm font-Inter">8 shares </div>
                        </div>
                        <div className="grid grid-rows-2 ">
                            <div className=" text-xs flex items-center">
                                <p className="inline-block mr-1 text-xs font-Inter">No</p>
                                <img className="w-[8px]" src="/filledArrowDown.svg" />
                            </div>
                            <div className="text-sm font-Inter">4 shares</div>
                        </div>
                    </grid>
                    <grid className="grid grid-cols-2 border-[#0C1615] p-2 px-4 ">
                        <div className="grid grid-rows-2">
                            <div className="flex">
                                <p className="inline-block mr-1 text-xs font-Inter">Avg Price</p>

                            </div>
                            <div className="text-sm">$ 0,50</div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className="text-xs font-Inter">Average Winning</div>
                            <div className="text-sm font-Inter">78%</div>
                        </div>
                    </grid>
                </div>
            </div>

        </div>

    )
};