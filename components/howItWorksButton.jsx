import React from "react"


export const HowItWorksButton = ({ title }) => {

    return (
        <div className="flex flex-col h-full w-3/7  rounded-[10px] text-black">

            <button className='bg-white rounded-t-[10px] py-5 pr-10  pl-5 w-[100%] border-b-[1px] border-[#0C1615] hover:opacity-40 flex  items-center'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19.31H4.81C3.68 19.31 2.75 18.38 2.75 17.25V6.96997C2.75 5.83997 3.68 4.90997 4.81 4.90997H5.72" stroke="#0C1615" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 4.91999V19.31C11.69 18.81 10.77 17.48 8.98999 16.75C8.17999 16.42 7.41 16.31 6.81 16.28C6.26 16.26 5.84 15.8 5.84 15.26V3.87C5.84 3.29 6.31001 2.82003 6.89001 2.84003C7.46001 2.86003 8.14 2.94999 8.87 3.16999C10.4 3.61999 11.45 4.42999 12 4.91999Z" stroke="#0C1615" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M21.25 6.96997V17.25C21.25 18.38 20.32 19.31 19.19 19.31H12V4.91998H19.19C20.32 4.91998 21.25 5.83997 21.25 6.96997Z" stroke="#0C1615" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.07 7.96997H18.18" stroke="#0C1615" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.07 12.11H18.18" stroke="#0C1615" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.07 16.26H18.18" stroke="#0C1615" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <p className="px-4 text-sm ">Learn how the Xchange works</p>

                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4H10.9799" stroke="#0C1615" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11 4L7.71014 0.5" stroke="#0C1615" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11 4L7.71014 7.5" stroke="#0C1615" stroke-linecap="round" stroke-linejoin="round" />
                </svg>


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