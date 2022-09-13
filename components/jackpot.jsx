import React from "react"


export const Jackpot = () => {

    return (
        <div className="flex flex-col justify-start border-[1px] border-[#0C1615]  rounded-[10px] text-black mb-4">
             <div className='bg-[#ACFF00]  rounded-t-[10px] border-b-[1px] p-2  w-[100%]  border-[#0C1615]' /> 
            <div className='bg-white p-4 text-left w-[100%] border-[#0C1615] rounded-[10px]'>
                <flex className="flex flex-rows justify-center items-center space-x-1">
                    <p className=" text-2xl bg-white rounded-3xl px-4 py-1">Jackpot</p>
                    <p className="text-4xl flex-1 font-medium bg-[#FFD700] px-4 py-2 rounded-3xl text-center text-black border-[1px] border-[#0C1615]">$4000 </p>

                </flex>
            </div>
            
        </div>
    )

}