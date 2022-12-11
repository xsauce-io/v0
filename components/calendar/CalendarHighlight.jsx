import React from 'react';
import { Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { ToastNotification } from '../common/Toast';
import toast from 'react-hot-toast';
import { useGetCalendarHighlightSneaker } from '../../services/calendar/highlightSneaker/useRequest';


export const CalendarHighlight = () => {
	// ------------------- Constants ---------------------
	const goatImagePlaceHolderURL = 'https://image.goat.com/placeholders/product_templates/original/missing.png';

	const randomPlaceholder = [
		'/hurache-placeholder-img-svg.svg',
		'/octobers.svg',
		'/yeezy-placeholder-img-svg.svg',
		'/jordans-placeholder-img-svg.svg',
		'/jordan-11-placeholder-img-svg.svg',
	];

	// ------------------- State Variable -----------------------
	// -------------------- Data Fetching -----------------------
	const { highlightSneakerData, highlightSneakerDataError, highlightSneakerDataLoading } = useGetCalendarHighlightSneaker();
	// ----------------- Use Effect / Use memo ------------------
	useEffect(() => {
		if (highlightSneakerDataError) {
			toast.custom(
				(t) => (
					<ToastNotification
						message={'An Internal Error has Occurred'}
						subMessage={
							'The data cannot be currently loaded. Please try again later.'
						}
						icon={<img src="/alert-circle-red-icon-svg.svg" />}
						t={t}
					/>
				),
				{ duration: 7000, id: 'data-not-loading-calendar' }
			);
		}
	}, [highlightSneakerData, highlightSneakerDataError]);

	return (
		<div
			className="flex flex-row transition duration-500 rounded-md w-full items-start  min-h-full "
		>
			{highlightSneakerDataLoading || highlightSneakerData === undefined ? (
				<React.Fragment>
					<Skeleton
						variant="rounded"
						sx={{ backgroundColor: 'lightgrey', height: '400px', width: "100%" }}
					/>
				</React.Fragment>
			) : (
				<React.Fragment>

					<div className="flex items-left flex-col tablet:flex-row space-y-3 justify-center w-full h-full bg-black shadow-md shadow-black text-black hover:shadow-2xl text-left font-inter ">
						{highlightSneakerData.image.original === '' ||
							highlightSneakerData.image.original === goatImagePlaceHolderURL ? (
							<div className="w-full  bg-white  justify-center items-center border-black border-[1px] rounded-tl-md rounded-tr-md">
								<img
									className="object-contain h-auto w-[60%] m-auto scale-80"
									src={
										highlightSneakerData.name[0] === 'J'
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
									className="object-contain h-auto w-[60%] m-auto"
									src={highlightSneakerData.image.original}
								/>
							</div>
						)}

						<div className="h-full">
							<div className="px-8">
								<h1 className="text-2xl tablet:text-3xl laptop:text-5xl font-normal text-white  w-full line-clamp-2 font-SG  ">
									{highlightSneakerData.name}
								</h1>
								<h2 className="text-lg tablet:text-xl laptop:text-2xl font-light text-left w-full text-white py-4 font-Inter">
									Retail Price &ensp; &ensp; &ensp; ${highlightSneakerData.retailPrice}
								</h2>
							</div>
							<div className="border-b-[1px] border-[#30403F]"></div>
							<div className="px-8 ">
								<div className="flex flex-col w-full py-4 space-y-3 font-light">
									<div className="w-full">
										<h2 className="text-[14px] tablet:text-lg laptop:text-xl text-[14px] text-[#748282] font-Inter">
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
