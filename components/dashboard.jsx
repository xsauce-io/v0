
import React from "react"

export const Dashboard = () => {
    return (
        <div className="flex flex-row h-[50px] w-full">
          <div className="flex flex-row items-center justify-center">
            Position
            <img className="h-[25%]" src="up-down.svg"/>
        
          </div>

          <div className="flex flex-row items-center justify-center">
            Shares
            <img className="h-[25%]" src="up-down.svg"/>
          </div>

          <div className="flex flex-row items-center justify-center">
            Total Price
            <img className="h-[25%]" src="up-down.svg"/>
          </div>

          <div className="flex flex-row items-center justify-center">
            Contract
            <img className="h-[25%]" src="up-down.svg"/>
          </div>

        </div>
    )
}