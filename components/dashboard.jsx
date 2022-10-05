import React from 'react';
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';
import { useGetMarketBySku } from '../services/useRequests';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MarketAbi from '../abi/markets.json';

export const Dashboard = ({ positions }) => {
	console.log(positions);
	const screens = {
		mobile: '300',
		tablet: '640',
		laptop: '1200',
		desktop: '1400',
	};

	let truncateContract =
		positions?.address.substring(0, 4) + '...' + positions?.address.slice(-4);

	const explorer = 'https://goerli.etherscan.io/address/' + positions?.address;

	const { width } = useWindowDimensions();
	return (
		<a>
			{width >= screens.tablet ? (
				<div className="flex flex-row grid grid-cols-9 text-[12px] rounded-[40px] w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]">
					<span className="flex flex-row col-span-3 font-SG text-sm ">
						{positions?.name}
					</span>
					<span className="flex flex-row col-span-2 text-xs font-Inter ">
						{positions?.amountYes} Yes / {positions?.amountNo} No
					</span>

					<span className="flex flex-row col-span-3 text-xs ">
						<span className="bg-[#ACFF00] text-black rounded-[40px] py-1 px-2 flex ">
							<p className="text-xs font-Inter">
								{positions?.avgBuyPriceYes} ¢ (yes) / {positions?.avgBuyPriceNo}{' '}
								¢ (no)
							</p>
						</span>
					</span>
					<a
						href={explorer}
						className="flex flex-row col-span-1 text-xs font-Inter underline"
					>
						{truncateContract} ↗
					</a>
				</div>
			) : (
				<a
					href={explorer}
					className="flex flex-row grid grid-cols-2 text-[12px] rounded-[40px]  space-x-2 w-full bg-[#0C1615] text-white font-Inter items-center justify-between py-4 px-8 my-[.5rem]"
				>
					<span className="flex flex-row col-span-1 font-SG text-xs text-ellipsis overflow-hidden ">
						{positions?.name}
					</span>
					<span className="flex flex-row col-span-1 text-xs font-Inter justify-center bg-[#ACFF00] text-black rounded-[40px] py-1 ">
						{positions?.amountYes} Yes / {positions?.amountNo} No
					</span>
				</a>
			)}
		</a>
	);
};
