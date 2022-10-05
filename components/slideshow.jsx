import { style } from '@mui/system';
import React, { useState, useEffect, useRef } from 'react';
import styles from './slideshow.module.css';

// ---------------- IMPORTANT -----------------
// This component can only be used in jsx files.
// And its currently hardcoded to support the onboarding modal

const Images = [
	{
		href: '/hand.png',
		header: 'Welcome to the Xchange',
		text: 'Culture is now in your hands. Before you get started, we need to explain a few things.',
	},
	{
		href: '/basics.png',
    header:'The Basics',
    text:"1.) Select a market in the Live Markets tab you want to place a wager on. 2.) Choose either YES or NO to represent which side you are on.\n3.) Select how many tickets you want to buy and submit your transaction!"
	},
	{
		href: '/magglass.png',
    header:'Tune In',
    text:'Watch the live market for price updates and news. The buy in price is dynamic and is determined by previous buys.'
	},
	{
		href: '/money.png',
    header: 'Cash Out',
    text:'If you are on the winning side of a wager when it resolves you will recieve back what you put in + your share of the winnings.'
	},
];

export const Slideshow = () => {
	//const slides = ["#0088FE", "#00C49F", "#FFBB28"];
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

	function resetTimeout() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}
	return (
		<div className={styles.slideshow}>
			<div
				className={styles.slideshowSlider}
				style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
			>
				{Images.map((image, index) => (
					<div
						className={styles.slide}
						key={index}

						//style={{ backgroundColor }}
					>
						<img className="object-fit" src={image.href}></img>
						<h1 className="text-white text-xl">{image.header}</h1>
						<p className="text-white font-SG ">{image.text}</p>
					</div>
				))}
				{/* {slides.map((backgroundColor, index) => (
                    <div
                        className={styles.slide}
                        key={index}
                        style={{ backgroundColor }}>

                    </div>
                ))} */}
			</div>
			<div className={styles.slideshowDots}>
				{Images.map((_, idx) => (
					<div
						key={idx}
						className={
							index === idx ? styles.slideshowDotActive : styles.slideshowDot
						}
						onClick={() => setIndex(idx)}
					></div>
				))}
			</div>
		</div>
	);
};
