
import React from "react"
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js'

export const DashboardTable = ({ children }) => {
    const screens = {
        mobile: "300",
        tablet: "640",
        smlaptop: "1024",
        laptop: "1200",
        desktop: "1400"
    }

    const { width } = useWindowDimensions();

    return (

        <div className="flex flex-col w-full ">
            {width >= screens.desktop ? (
                <div className="flex flex-row py-4 text-[14px] font-Inter items-center w-full px-4">
                    <div className="flex flex-row pl-4 w-[30%] space-x-2 items-center ">
                        <p>Positions</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[18.5%] space-x-2 items-center">
                        <p>Shares</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[21.5%] space-x-2 items-center">
                        <p>Total price</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[20%] space-x-2 items-center">
                        <p>Return</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[11%]  space-x-2 items-center">
                        <p>Contracts</p>
                        <img src="/up-down.svg" />
                    </div>
                </div>
            ) : width >= screens.laptop ? (
                <div className="flex flex-row py-4 text-[14px] font-Inter items-center w-full px-4">
                    <div className="flex flex-row pl-4 w-[40%] space-x-2 items-center w-full flex-1 ">
                        <p>Positions</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[22%] space-x-2 items-center">
                        <p>Shares</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[24%] space-x-2 items-center">
                        <p>Return</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[19%]  space-x-2 items-center">
                        <p>Contracts</p>
                        <img src="/up-down.svg" />
                    </div>
                </div>
            ) : width >= screens.tablet ? (
                <div className="flex flex-row py-4 text-[14px] font-Inter items-center w-full px-4">
                    <div className="flex flex-row pl-4 w-[40%] space-x-2 items-center w-full flex-1 ">
                        <p>Positions</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[22%] space-x-2 items-center">
                        <p>Shares</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[24%] space-x-2 items-center">
                        <p>Return</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[19%]  space-x-2 items-center">
                        <p>Contracts</p>
                        <img src="/up-down.svg" />
                    </div>
                </div>
            ) : (
                <div className="flex flex-row py-4 text-[14px] font-Inter items-center w-full px-4 space-x-2">
                    <div className="flex flex-row pl-4 w-[40%] items-center ">
                        <p>Positions</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[28.5%] items-center">
                        <p>Shares</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[32%] items-center ">
                        <p>Return</p>
                        <img src="/up-down.svg" />
                    </div>
                </div>
            )}
            {children}
        </div>


    )
}