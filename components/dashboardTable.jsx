
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
                <div className="flex flex-row py-4 text-[14px]  items-center w-full px-4 font-Inter">
                    <div className="flex flex-row pl-4 w-[40%] space-x-2 items-center ">
                        <p >Name of Assets</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[25%] space-x-2 items-center">
                        <p  >Holdings</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[25%] space-x-2 items-center">
                        <p >Avg Buy Price</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[11%]  space-x-2 items-center">
                        <p>Contract</p>
                        <img src="/up-down.svg" />
                    </div>
                </div>
            ) : width >= screens.laptop ? (
                <div className="flex flex-row py-4 text-[14px] font-Inter items-center w-full px-4">
                    <div className="flex flex-row pl-4 w-[25%] space-x-2 items-center w-full flex-1 ">
                        <p>Name of Asset</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[25%] space-x-2 items-center justify-center">
                        <p>Holdings</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[25%] space-x-2 items-center justify-center">
                        <p>Average Buy Price</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[25%]  space-x-2 items-center justify-center">
                        <p>Contract</p>
                        <img src="/up-down.svg" />
                    </div>
                </div>
            ) : width >= screens.tablet ? (
                <div className="flex flex-row py-4 text-[14px] font-Inter items-center w-full px-4">
                    <div className="flex flex-row pl-4 w-[35%] space-x-2 items-center w-full flex-1 ">
                        <p>Name of Asset</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[27%] space-x-2 items-center justify-center">
                        <p>Holdings</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[25%] space-x-2 items-center">
                        <p>Avg Buy Price</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[17%]  space-x-2 items-center">
                        <p>Contract</p>
                        <img src="/up-down.svg" />
                    </div>
                </div>
            ) : (
                <div className="flex flex-row py-4 text-[14px] font-Inter items-center w-full px-4 space-x-2">
                    <div className="flex flex-row pl-4 w-[40%] items-center ">
                        <p>Name of Asset</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[28.5%] items-center">
                        <p>Holdings</p>
                        <img src="/up-down.svg" />
                    </div>

                    <div className="flex flex-row w-[32%] items-center ">
                        <p>Contract</p>
                        <img src="/up-down.svg" />
                    </div>
                </div>
            )}
            {children}
        </div>


    )
}