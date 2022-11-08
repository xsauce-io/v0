import React from 'react';
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';

export const PortfolioTableContainer = ({ children }) => {
	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};

	const { width } = useWindowDimensions();

	return (
		<div className="flex flex-col w-full ">
			{width >= screens.tablet ? (
				<div className=" grid grid-cols-9 py-4 px-8 text-[14px] items-start w-full  font-Inter ">
					<div className="flex flex-row col-span-3   space-x-2 items-center ">
						<p>Name of Assets</p>
						<img src="/up-down.svg" />
					</div>

					<div className="flex flex-row col-span-2  space-x-2 items-center">
						<p>Holdings</p>
						<img src="/up-down.svg" />
					</div>

					<div className="flex flex-row col-span-3  space-x-2 items-center">
						<p>Avg Buy Price</p>
						<img src="/up-down.svg" />
					</div>

					<div className="flex flex-row col-span-1  space-x-2 items-center">
						<p>Contract</p>
						<img src="/up-down.svg" />
					</div>
				</div>
			) : (
				<div className="grid grid-cols-2 py-4 text-[12px] px-4  space-x-2 items-start w-full font-Inter">
					<div className="flex flex-row col-span-1 space-x-2 items-center ">
						<p>Name of Assets</p>
						<img src="/up-down.svg" />
					</div>

					<div className="flex flex-row col-span-1 space-x-2 items-center">
						<p>Avg Buy Price</p>
						<img src="/up-down.svg" />
					</div>
				</div>
			)}
			{children}
		</div>
	);
};
