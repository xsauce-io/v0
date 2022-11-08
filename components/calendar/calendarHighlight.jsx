import React from 'react';
import { Skeleton } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useGetSneaker } from '../../services/useRequests';
import { calendarUseGetSneakerSku } from '../../services/dataVariables';
import { ToastNotification } from '../common/Toast';
import { Highlight } from '@chakra-ui/react';
import toast from 'react-hot-toast';


export const CalendarHighlight = () => {
	// ------------------- Constants ---------------------

	const randomPlaceholder = [
		'/hurache.svg',
		'/octobers.svg',
		'/yeezy.svg',
		'/jordans.svg',
		'/11s.svg',
	];

	// ------------------- State Variable --------------------


	// -------------------- Data Fetching ------------------


	const { data: highlightSneakerData, error: highlightSneakerError } = useGetSneaker(
		calendarUseGetSneakerSku
	);

	//------------------ Use Effect / Use memo ------------------

	useEffect(() => {
	}, [highlightSneakerData, highlightSneakerError]);

	useEffect(() => {
		if (highlightSneakerError) {
			toast.custom(
				(t) => (
					<ToastNotification
						message={'An Internal Error has Occurred'}
						subMessage={
							'The data cannot be currently loaded. Please try again later.'
						}
						icon={<img src="/alertCircle.svg" />}
						t={t}
					/>
				),
				{ duration: 7000, id: 'data-not-loading-calendar' }
			);
		}
	}, [highlightSneakerError]);

	return (
		<div

			className="flex flex-col transition duration-500 bg-black rounded-md shadow-md shadow-black text-black hover:shadow-2xl w-full items-start text-left font-inter min-h-full "
		>
			{highlightSneakerData === undefined ? (
				<React.Fragment>
					<Skeleton
						variant="rectangular"
						sx={{ backgroundColor: 'white', height: '450px' }}
					/>
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="flex items-left flex-col space-y-3 justify-center w-full h-full ">
						{highlightSneakerData.image?.original === '' ||
							highlightSneakerData.image?.original ===
							'https://image.goat.com/placeholders/product_templates/original/missing.png' ? (
							<div className="w-full  bg-white justify-center items-center border-black border-[1px] rounded-tl-md rounded-tr-md">
								<img
									className="object-contain h-auto w-[40%] m-auto scale-80"
									src={
										highlightSneakerData?.name[0] === 'J'
											? randomPlaceholder[3]
											: highlightSneakerData?.name[0] === 'Y'
												? randomPlaceholder[2]
												: randomPlaceholder[4]
									}
								/>
							</div>
						) : (
							<div className="w-full bg-white justify-center items-center border-black border-[1px] rounded-tl-md rounded-tr-md ">
								{/* Information in this div will be fed by the contract. Can grab it on load in the main index and pass it as another object */}
								<img
									className="object-contain h-auto w-[30%] m-auto"
									src={highlightSneakerData.image?.original}
								></img>
							</div>
						)}

						<div className="h-full">
							<div className="px-8">
								<h1 className="text-2xl font-normal text-white h-[22%] w-full line-clamp-2 font-SG  ">
									{highlightSneakerData.name}
								</h1>
								<h2 className=" text-lg font-light text-left w-full text-white py-4 font-Inter">
									Retail Price &ensp; &ensp; &ensp; ${highlightSneakerData.retailPrice}
								</h2>
							</div>
							<div className="border-b-[1px] border-[#30403F]"></div>
							<div className="px-8 ">
								<div className="flex flex-col w-full py-4 space-y-3 font-light">
									<div className="w-full">
										<h2 className="text-[14px] text-[#748282] font-Inter">
											Release Date: {highlightSneakerData.releaseDate}
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
