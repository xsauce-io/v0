import React from 'react';
import { useState } from 'react';
import { LostFamButton } from '../LostFamButton'
export const TabInvest= (market) => {
	const [isLong, setIsLong] = useState(true);

	return (
		<div className="flex flex-col ">
			<div className='flex flex-col tablet:flex-row w-full items-center justify-center'>
				<h1 className="font-bold text-left tablet:py-2 text-md tablet:text-xl flex-1">{market?.market}</h1>
				<LostFamButton/>
			</div>
			<div className="flex flex-col flex-1 ">

				<div className="flex flex-row bg-white border-2 border-[#0C1615] rounded-[40px]">
					<button
						type="selection"
						id="long"
						className={
							!isLong
								? 'flex flex-row justify-center items-center space-x-2  w-1/2  font-medium text-xs tablet:text-xl py-3 text-black bg-white  border-r-0 border-[#0C1615] rounded-tl-[40px] rounded-bl-[40px]  '
								: 'flex flex-row justify-center items-center space-x-2 w-[55%] font-medium text-xs tablet:text-xl text-white  bg-[#0C1615] rounded-[40px]'
						}
						onClick={() => setIsLong(true)}
					>
						<p>Long 2x</p>
						<img
							className="mobile:hidden tablet:flex  tablet:w-[15px] laptop:w-[20px]"
							src="/up-trend-green-icon-png.png"
						/>
					</button>
					<button
						type="selection"
						id="short"
						className={
							isLong
								? 'flex flex-row justify-center items-center space-x-2 w-1/2 font-medium  text-xs tablet:text-xl py-3 text-black bg-white  border-l-0 border-[#0C1615] rounded-tr-[40px] rounded-br-[40px] '
								: 'flex flex-row justify-center items-center space-x-2  w-[55%] font-medium  text-xs tablet:text-xl py-3 text-white  bg-[#0C1615] rounded-[40px] '
						}
						onClick={() => setIsLong(false)}
					>
						<p>Short 2x</p>
						<img
							className="mobile:hidden tablet:flex  tablet:w-[15px] laptop:w-[20px]"
							src="/down-trend-red-icon-png.png"
						/>
					</button>
				</div>
				<div className="mt-3 flex flex-row  bg-white items-center py-3 px-6 text-left w-[100%] border-[1px] border-black rounded-[80px]  focus:outline-2 focus:outline-offset-2 hover:outline-1">
					<p className="flex-1 text-left text-xs tablet:text-xl  pr-1">
						Amount:
					</p>
					<input
						className="flex-1 bg-white  text-right text-xs tablet:text-xl laptop:text-md mobile:w-[10%] appearance-none focus:none focus:outline-none"
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
					className="w-full font-medium text-xs tablet:text-xl my-3 text-xl py-4 text-white bg-[#0C1615] rounded-[80px] hover:opacity-70 active:bg-[#ACFF00]"
				>
					{isLong ? 'Go Long' : 'Go Short'}
				</button>
			</div>
		</div>
	);
};
