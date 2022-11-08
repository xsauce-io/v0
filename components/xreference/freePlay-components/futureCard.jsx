import React from 'react';
import { Skeleton } from '@mui/material';

export const FutureCard = ({ cardObject }) => {
	return cardObject === undefined ? (
		<React.Fragment>
			<Skeleton
				variant="rectangular"
				sx={{ backgroundColor: 'white', height: '450px' }}
			/>
		</React.Fragment>
	) : (
		<React.Fragment>
			<div className="flex items-center flex-col justify-center bg-white w-full h-full rounded-md p-6 shadow-lg hover:bg-[#ACFF00]">
				<div className="w-full justify-center items-center rounded-tl-md rounded-tr-md">
					{/* Information in this div will be fed by the contract. Can grab it on load in the main index and pass it as another object */}

					<img
						className="pb-10 mobile:w-[40%] m-auto mobile:h-[100%] scale-110 tablet:w-[100px] h-[100px]"
						src={cardObject.href}
					></img>
				</div>

				<div className="rounded-bl-md rounded-br-md">
					<div className="">
						<h1 className="text-2xl text-black font-normal h-[22%] w-full line-clamp-2 font-SG  ">
							{cardObject.title}
						</h1>
						{/* <h2 className=" text-lg font-light text-left w-full text-white py-4 font-Inter">
									Retail Price: &ensp; &ensp; &ensp;
								</h2> */}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
