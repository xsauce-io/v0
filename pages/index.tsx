import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import  background from "../public/landingBackgroundDrop.png";


// Here we have used react-icons package for the icons
// And react-slick as our Carousel Lib


import toast from 'react-hot-toast';
import { ToastNotification } from '../components/common/toast';
declare let window: any;

import { HomeNav } from '../components/home/homeNav';
import Link from 'next/link';
import { Footer } from '../components/layout/footer';
import { useWindowDimensions } from '../utils/hooks/useWindowDimensionsTS';

const Home: NextPage = () => {
	// ----------------------------------------------------
	// -------------------- Constants ---------------------
	// -----------------------------------------------------

	const screens = {
		mobile: '300',
		tablet: '640',
		laptop: '1200',
		desktop: '1400',
	};


	const SORT_BY_STATES = {
		RELEASE_DATE: 'releaseDate',
		NAME: 'name',
		RETAIL_PRICE: 'retailPrice',
	};

	const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];



	// -------------------------------------------------------
	// -------------------- State Variables ------------------
	// -------------------------------------------------------



	// ----------------------------------------------------
	// -------------------- Functions ---------------------
	// ----------------------------------------------------



	// ----------------------------------------------------
	// ------------------ Use Effect / Use Memo -----------
	// ----------------------------------------------------







	// ----------------------------------------------------
	// ----------------------Render------------------------
	// ----------------------------------------------------

	return (
		<div className="w-screen h-fit text-black bg-white">
			<Head>
				<title>Xsauce | Culture is Currency</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" type='favicon' href='/greenDrop.svg' />
			</Head>


			{/* Note this is a custom navigator component for home  */}
			<HomeNav logoColor={"#0C1615"} />


			<div id="mainSection" className='flex flex-col tablet:flex-row justify-center items-center h-[calc(100vh-80px)] px-5 laptop:px-20 mt-80px font-Inter'>

				<ul className='flex flex-col font-SG font-medium tablet:w-[50%] font-Inter cursor-pointer justify-center items-start lg-desktop:items-end text-[20px] tablet:text-[30px] laptop:text-[40px] lg-desktop:text-[55px] p-4 tablet:p-8' >

					<Link href='/markets'>
						<a className=' flex flex-row w-full' >
							<li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl w-full laptop:w-3/4  px-4 py-2 flex flex-row justify-start items-center active'>


								<img className="w-[25px] invisible group-hover:flex group-hover:visible mr-4 " src='/jordans.svg' />
								<span className=''>Launch App</span>
							</li>
						</a>
					</Link>

					<a className=' flex flex-row w-full' href="#whatIsXsauceSection">
						<li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl w-full laptop:w-3/4 px-4 py-2 flex flex-row justify-start items-center'>
							<img className="w-[25px] invisible  group-hover:flex mr-4 group-hover:visible" src='/jordans.svg' />
							<span className=''>What is Xsauce</span>
						</li>
					</a>

					<Link href='/dripFeed'>
						<a className='flex flex-row w-full'  >
							<li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl w-full laptop:w-3/4  px-4 py-2 flex flex-row justify-start items-center'>
								<img className="w-[25px] invisible  group-hover:flex mr-4 group-hover:visible" src='/jordans.svg' />
								<span className=''>Drip Feed </span>
							</li>
						</a>
					</Link>


					<a className=' flex flex-row w-full' href="https://docs.xsauce.io/applications/prediction-markets-v.0-beta"
						target={'_blank'}
						rel={'noreferrer'} >
						<li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl w-full laptop:w-3/4 px-4 py-2 flex flex-row justify-start items-center'>
							<img className="w-[25px] invisible  group-hover:flex mr-4 group-hover:visible" src='/jordans.svg' />
							<span className=' '>Documentation </span>
						</li>
					</a>


					<a className='flex flex-row w-full' href="mailto:info@xsauce.io">
						<li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl  w-full laptop:w-3/4  px-4 py-2 flex flex-row justify-start items-center'>

							<img className="w-[25px] invisible group-hover:flex mr-4 group-hover:visible" src='/jordans.svg' />
							<span className=''>Drop us a line</span>

						</li>
					</a>


				</ul>
				<div className='tablet:w-[50%] flex flex-row justify-start items-center '>
					<img className='w-full p-4 tablet:p-8' src='/visual.png' />
				</div>
			</div >

			<div id="whatIsXsauceSection" className="flex flex-col border-[1px] justify-center items-center px-5 tablet:flex-row h-[calc(100vh-80px)] laptop:px-20 " style={{backgroundImage: `url(/bgLandingDrop.png)`}} >

				<div className='tablet:w-[70%] flex flex-col justify-start items-center space-y-4 '>
					<h1 className='w-full px-4 tablet:px-8 font-SG  text-3xl text-white'>
					What is Xsauce
					</h1>
					<p className='w-full px-4 tablet:px-8 font-SG text-md tablet:text-xl text-white'>
						Xsauce is a dynamic, decentralized ecosystem which allows you to translate your knowledge of culture into money in your pocket. The founding belief of Xsauce is that cultural assets are a legitimate asset class.
					</p>
					<p className='w-full px-4 tablet:px-8 font-SG text-md  tablet:text-xl text-white'>
						For clarity, when we say cultural assets, we are referring to assets that derive their value from cultural significance rather than a pure measure of utility.
					</p>
					<p className='w-full px-4 tablet:px-8 font-SG text-md tablet:text-xl text-white'>
					Our immediate focus is on hyped or rare sneakers as they offer sustained value as evidenced through the rapidly growing $10 billion+ sneaker resale market.
					</p>
				</div>

			</div>

		</div>
	);
};

export default Home;
