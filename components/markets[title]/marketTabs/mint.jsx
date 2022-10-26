import React from 'react';
import { useEffect, useState } from 'react';

export const MintTab = (market) => {
	const [isLong, setIsLong] = useState(true);

	return (
		<div className="flex flex-col mt-4">
			<h1 className="font-bold text-left py-4 text-xl">{market?.market}</h1>
			<div className="flex flex-col flex-1 ">
				<div className="flex flex-row">
					<button
						type="selection"
						id="long"
						className={
							isLong
								? 'flex flex-row justify-center items-center w-1/2 font-medium text-md py-4 text-white bg-black rounded-tl-[80px] rounded-bl-[80px]'
								: 'flex flex-row justify-center items-center w-1/2 font-medium text-md py-4 text-white bg-black rounded-tl-[80px] rounded-bl-[80px] active:bg-[#ACFF00]'
						}
						onClick={() => setIsLong(true)}
					>
						Long 2x
						<img
							className="ml-2 mobile:w-[10px] laptop:w-[25px]"
							src="/upTrend.png"
						/>
					</button>
					<button
						type="selection"
						id="short"
						className={
							isLong
								? 'flex flex-row justify-center items-center w-1/2 font-medium text-md py-4 text-white bg-black rounded-tr-[80px] rounded-br-[80px] active:bg-[#ACFF00]'
								: 'flex flex-row justify-center items-center w-1/2 font-medium text-md py-4 text-white bg-black rounded-tr-[80px] rounded-br-[80px]'
						}
						onClick={() => setIsLong(false)}
					>
						Short 2x
						<img
							className="ml-2 mobile:w-[10px] laptop:w-[25px]"
							src="/downTrend.png"
						/>
					</button>
				</div>
				<div className="mt-5 flex flex-row  bg-white items-center py-4 px-6 text-left w-[100%] border-[1px] border-black rounded-[80px]  focus:outline-2 focus:outline-offset-2 hover:outline-1">
					<p className="flex-1 text-left mobile:text-sm laptop:text-md pr-1">
						Amount:
					</p>
					<input
						className="flex-1 text-right mobile:text-sm laptop:text-md mobile:w-[10%] appearance-none focus:none focus:outline-none"
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
					className="w-full font-medium mb-6 mt-3 text-xl py-4 text-white bg-[#0C1615] rounded-[80px] hover:opacity-70 active:bg-[#ACFF00]"
				>
					{isLong ? 'Mint Long' : 'Mint Short'}
				</button>
			</div>
		</div>
	);
};
