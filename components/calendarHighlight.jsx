import React from 'react';
import { Skeleton } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import marketAbi from '../abi/markets.json';
import axios from 'axios';

export const CalendarHighlight = ({ cardObject }) => {
	const randomPlaceholder = [
		'/hurache.svg',
		'/octobers.svg',
		'/yeezy.svg',
		'/jordans.svg',
		'/11s.svg',
	];

	const [No, setNo] = useState();
	const [Yes, setYes] = useState();
	const [expiration, setExpiration] = useState();

	let [favored, setFavored] = useState();

	return (
		<div className="flex flex-col transition duration-500 bg-black rounded-md shadow-md shadow-black text-black hover:shadow-2xl laptop: w-full items-start text-left font-inter min-h-full 	">
			{cardObject === undefined ? (
				<React.Fragment>
					<Skeleton
						variant="rectangular"
						sx={{ backgroundColor: 'white', height: '450px' }}
					/>
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="flex items-left flex-col space-y-3 justify-center w-full h-full ">
						{cardObject.image?.original === '' ||
						cardObject.image?.original ===
							'https://image.goat.com/placeholders/product_templates/original/missing.png' ? (
							<div className="w-full h-1/4 bg-white justify-center items-center border-black border-[1px] rounded-tl-md rounded-tr-md">
								<img
									className="object-cover mobile:w-[40%]  m-auto mobile:h-[100%] scale-100"
									src={
										cardObject?.name[0] === 'J'
											? randomPlaceholder[3]
											: cardObject?.name[0] === 'Y'
											? randomPlaceholder[2]
											: randomPlaceholder[4]
									}
								/>
							</div>
						) : (
							<div className="relative w-full h-1/4 bg-white justify-center items-center border-black border-[1px] rounded-tl-md rounded-tr-md ">
								{/* Information in this div will be fed by the contract. Can grab it on load in the main index and pass it as another object */}
                <span className='absolute right-5 top-5 bg-[#ACFF00] rounded-xl px-4 py-3 laptop:text-lg tablet:text-[14px] mobile:text-[10px]'>Drop of the Month</span>
								<img
									className="laptop:object-contain laptop:pt-0 tablet:pt-[10%]  mobile:w-[40%] mobile:pt-[20%] m-auto mobile:h-[100%] scale-110"
									src={cardObject.image?.original}
								></img>
							</div>
						)}

						<div className="h-full">
							<div className="px-8  ">
								<h1 className="text-2xl font-normal text-white h-[22%] w-full line-clamp-2 font-SG  ">
									{cardObject.name}
								</h1>
								<h2 className=" text-lg font-light text-left w-full text-white py-4 font-Inter">
									Retail Price &ensp; &ensp; &ensp; ${cardObject.retailPrice}
								</h2>
							</div>
							<div className="border-b-[1px] border-[#30403F]"></div>
							<div className="px-8 ">
								<div className="flex flex-col w-full py-4 space-y-3 font-light">
									<div className="w-full">
										<h2 className="text-[14px] text-[#748282] font-Inter">
											Release Date: {cardObject.releaseDate}
										</h2>
									</div>
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};
