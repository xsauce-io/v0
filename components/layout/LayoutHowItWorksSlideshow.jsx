import { style } from '@mui/system';
import React, { useState, useEffect, useRef } from 'react';

// ---------------- IMPORTANT -----------------
// This component can only be used in jsx files.
// And its currently hardcoded to support the onboarding modal

export const LayoutHowItWorksSlideshow = ({ content, reset }) => {
	const delay = 8000;

	const [index, setIndex] = useState(0);
	const timeoutRef = useRef(null);

	useEffect(() => {
		resetTimeout();
		timeoutRef.current = setTimeout(
			() =>
				setIndex((prevIndex) =>
					prevIndex === content.length - 1 ? 0 : prevIndex + 1
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
				{content?.map((item, index) => (
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
				{content.map((_, idx) => (
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
