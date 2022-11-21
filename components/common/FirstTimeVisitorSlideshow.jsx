import React, { useState, useEffect, useRef } from 'react';

// ---------------- IMPORTANT -----------------
// This component can only be used in jsx files.
// And its currently hardcoded to support the onboarding modal

const Images = [
	{
		href: '/hand.png',
		header: 'Welcome to the Xchange',
		text: 'Culture is now in your hands. Before you get started, we need to explain a few things. The Xchange requires a web3 wallet to hold your funds. If you don’t have one yet, you’ll need to set one up. ',
	},
	{
		href: '/traffic-light-image-png.png',
		header: 'The Basics',
		text: '1.) Connect your preferred web3 wallet \n2.) Select an index under the “Markets” tab. \n3.) Decide whether you think the price of the index will go up (Choose Go Long) or if the price of the index will go down (Choose Go Short)',
	},
	{
		href: '/magglass.png',
		header: 'Tune In',
		text: 'Watch for new drops, collabs or other news regarding the markets. It’s likely that this information will impact resale prices and the value of each index.',
	},
	{
		href: '/money.png',
		header: 'Cash Out',
		text: 'Choose “Withdraw” to close your position and redeem your profits',
	},
];

export const FirstTimeVisitorSlideshow = ({ reset }) => {
	const delay = 8000;

	const [index, setIndex] = useState(0);
	const timeoutRef = useRef(null);

	useEffect(() => {
		resetTimeout();
		timeoutRef.current = setTimeout(
			() =>
				setIndex((prevIndex) =>
					prevIndex === Images.length - 1 ? 0 : prevIndex + 1
				),
			delay
		);
		return () => {
			resetTimeout();
		};
	}, [index]);

	useEffect(() => {
		if (reset === true) {
			setIndex(0);

		}
	}, [reset]);

	function resetTimeout() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}
	return (
		//full slider container but hides all but one page
		<div className={'m-auto overflow-hidden max-w-[600px]'}>
			{/* full container doing affect */}
			<div
				className={
					'flex flex-row whitespace-nowrap ease-in-out duration-1000 items-center justify-start'
				}
				style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
			>
				{/* each page of the slider */}
				{Images?.map((item, index) => (
					<div
						className={
							'flex flex-col shrink-0 h-[40%] w-[100%]  p-5  whitespace-pre-line pr-1 pl-1 justify-start '
						}
						key={index}
					>
						<img className="object-fit w-auto h-auto" src={item.href}></img>
						<h1 className="text-white mobile:text-lg tablet:text-xl ">
							{item.header}
						</h1>
						<p className="text-white mobile:text-sm tablet:text-[16px] font-SG ">
							{item.text}
						</p>
					</div>
				))}
			</div>
			<div className="text-center z-20">
				{Images.map((_, idx) => (
					<div
						key={idx}
						className={
							index === idx
								? 'inline-block h-[20px] w-[20px] rounded-2xl cursor-pointer mt-[15px] mx-[7px] mb-[0px] bg-[#ACFF00]'
								: 'inline-block h-[20px] w-[20px] rounded-2xl cursor-pointer mt-[15px] mx-[7px] mb-[0px] bg-[#c4c4c4]'
						}
						onClick={() => setIndex(idx)}
					></div>
				))}
			</div>
		</div>
	);
};
