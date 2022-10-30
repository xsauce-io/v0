import React from "react";
import { useEffect, useState } from "react";

export const SwitchTab = (market) => {
  const [isStaked, setIsStaked] = useState(true);
  const [fromLong, setFromLong] = useState(true);

  return (
    <div className="flex flex-col ">
      <h1 className="font-bold text-left py-4 text-xl">{market?.market}</h1>
      <div className="flex flex-col flex-1 ">
        <div className="flex flex-row bg-white border-2 border-[#0C1615] rounded-[40px] mb-3">
          <button
            type="selection"
            id="staked"
            className={
              !isStaked
                ? 'flex flex-row justify-center items-center space-x-1 tablet:space-x-2  tablet:py-3.5  w-1/2  font-medium text-[10px]  tablet:text-[16px]  text-black bg-white  border-r-0 border-[#0C1615] rounded-tl-[40px] rounded-bl-[40px]  '
                : 'flex flex-row justify-center items-center space-x-1 tablet:space-x-2 tablet:py-3.5 w-[55%] font-medium text-[10px]  tablet:text-[16px]  text-white  bg-[#0C1615] rounded-[40px]'
            }
            onClick={() => setIsStaked(true)}
          >
            <p>Staked Tokens</p>
            <img
              className="mobile:w-[10px] laptop:w-[20px]"
              src="/upTrend.png"
            />
          </button>
          <button
            type="selection"
            id="unStaked"
            className={
              isStaked
                ? 'flex flex-row justify-center items-center space-x-1 tablet:space-x-2 tablet:py-3.5 w-1/2 font-medium text-[10px] tablet:text-[16px]   text-black bg-white  border-l-0 border-[#0C1615] rounded-tr-[40px] rounded-br-[40px] '
                : 'flex flex-row justify-center items-center space-x-1 tablet:space-x-2 tablet:py-3.5 w-[55%] font-medium text-[10px] tablet:text-[16px]  text-white  bg-[#0C1615] rounded-[40px] '
            }
            onClick={() => setIsStaked(false)}
          >
            <p>Unstaked Tokens</p>
            <img
              className="mobile:w-[10px] laptop:w-[20px]"
              src="/downTrend.png"
            />
          </button>
        </div>

        {/* <div className="flex flex-row">
        <div className="flex flex-row w-full bg-white border-2 border-[#0C1615] rounded-[40px]">

          <button
            type="selection"
            id="fromLong"
            className={
							!fromLong
								? 'flex flex-row justify-center items-center space-x-2  w-1/2  font-medium text-xs tablet:text-xl py-3 text-black bg-white  border-r-0 border-[#0C1615] rounded-tl-[40px] rounded-bl-[40px]  '
								: 'flex flex-row justify-center items-center space-x-2 w-[55%] font-medium text-xs tablet:text-xl py-3 text-white  bg-[#0C1615] rounded-[40px]'
						}
            onClick={() => setFromLong(true)}
          >
            From &nbsp; <span className="text-[#ACFF00]">Long</span>&nbsp; &rarr; &nbsp; <span className="text-[red]">Short</span>

          </button>
          <button
            type="selection"
            id="short"
            className={
							fromLong
								? 'flex flex-row justify-center items-center space-x-2 w-1/2 font-medium text-xs tablet:text-xl  py-3 text-black bg-white  border-l-0 border-[#0C1615] rounded-tr-[40px] rounded-br-[40px] '
								: 'flex flex-row justify-center items-center space-x-2 w-[55%] font-medium text-xs tablet:text-xl py-3 text-white  bg-[#0C1615] rounded-[40px] '
						}
            onClick={() => setFromLong(false)}
          >
               From &nbsp; <span className="text-[red]">Short</span>&nbsp; &rarr; &nbsp; <span className="text-[#ACFF00]">Long</span>


            </button>
            </div>
        </div> */}


        <div className=" flex flex-row  bg-white items-center py-3 px-6 text-left w-[100%] border-[1px] border-black rounded-[80px]  focus:outline-2 focus:outline-offset-2 hover:outline-1">
          <p className="flex-1 text-left text-xs tablet:text-xl pr-1">
            Amount:
          </p>
          <input
            className="flex-1 text-right text-xs tablet:text-xl mobile:w-[10%] appearance-none focus:none focus:outline-none"
            name="Amount"
            id="amount"
            type="number"
            placeholder="$200"
            // onChange={() => CalculateTotal()}
            required
          />
        </div>

        <button
          type="submit"
          id="mint"
          className="w-full font-medium my-3 text-xs tablet:text-xl py-4 text-white bg-[#0C1615] rounded-[80px] hover:opacity-70 active:bg-[#ACFF00]"
        >
          Switch
        </button>
      </div>
    </div>
  );
};
