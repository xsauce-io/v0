import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import { ethers } from 'ethers';
import { MarketFactory, marketsDataGit } from '../services/constants';
import MarketFactoryABI from '../abi/marketFactory.json';
import MarketAbi from '../abi/markets.json';
import { useGetMarketBySku, useGetSneaker } from '../services/useRequests';

// Here we have used react-icons package for the icons
// And react-slick as our Carousel Lib


import toast from 'react-hot-toast';
import { ToastNotification } from '../components/common/toast';
declare let window: any;

import { HomeNav } from '../components/home/homeNav';
import Link from 'next/link';

const Home: NextPage = () => {
	// ----------------------------------------------------
	// -------------------- Constants ---------------------
	// -----------------------------------------------------
	const SORT_BY_STATES = {
		RELEASE_DATE: 'releaseDate',
		NAME: 'name',
		RETAIL_PRICE: 'retailPrice',
	};

	const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];

	// ----------------------------------------------------
	// -------------------- State Variables ---------------------
	// ------------------------------------------------------------
	const { data: s1, error: e1 } = useGetSneaker('DH7138-006');
	const { data: s2, error: e2 } = useGetSneaker('DR8869-200');
	const { data: s3, error: e3 } = useGetSneaker('DR0501-101');

	const [response, setResponse] = useState([] as any);
	const [storedPersistentResponse, setStoredPersistentResponse] = useState(
		[] as any[]
	);

	//filter state mana
	const [isAscending, setIsAscending] = useState(true);
	const [sortBy, setSortBy] = useState({ state: SORT_BY_STATES.RELEASE_DATE });
	const [allBalances, setAllBalances] = useState([] as any);


	// ----------------------------------------------------
	// -------------------- Functions ---------------------
	// ----------------------------------------------------
	const showBalances = async () => {
		const hasConnectedWalletBefore = localStorage.getItem(
			'hasConnectedWalletBefore'
		);

		if (hasConnectedWalletBefore != null) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const connected = (
				await provider.send('eth_requestAccounts', [0])
			).toString();
			const signer = provider.getSigner();
			const contract2 = new ethers.Contract(
				MarketFactory,
				MarketFactoryABI,
				signer
			);
			const allMarkets = await contract2.getAllMarketswSku();

			const cleanedAllMarkets: any[] = [];
			for (let index = 0; index < allMarkets.length; index++) {
				const r1 = allMarkets[index].sku.toString();
				const r2 = allMarkets[index].market.toString();
				const r3 = allMarkets[index].name.toString();
				const newData = { sku: r1, address: r2, name: r3 };
				cleanedAllMarkets.push(newData);
			}

			const balanceArray: any = [];

			for (let index = 0; index < cleanedAllMarkets?.length; index++) {
				const contract = new ethers.Contract(
					cleanedAllMarkets[index]?.address,
					MarketAbi,
					signer
				);
				const balances = await contract.getAcctInfo(connected);
				const one = balances.amountNo.toString();
				const two = balances.amountYes.toString();
				const three = (balances.avgBuyPriceNo / 1e18).toFixed(2);
				const four = (balances.avgBuyPriceYes / 1e18).toFixed(2);

				const newObj = {
					amountNo: one,
					amountYes: two,
					avgBuyPriceNo: three,
					avgBuyPriceYes: four,
					address: cleanedAllMarkets[index].address,
					sku: cleanedAllMarkets[index].sku,
					name: cleanedAllMarkets[index].name,
				};
				balanceArray.push(newObj);
			}
			setAllBalances(balanceArray);
		}
	};

	// ----------------------------------------------------
	//------------------ Use Effect / Use Memo ------------------
	// ----------------------------------------------------
	useEffect(() => {
		setResponse([s1, s2, s3]);
		setStoredPersistentResponse([s1, s2, s3]);
	}, [s1, s2, s3]);

	useEffect(() => {
		showBalances();
	}, []);

	useEffect(() => {
		if (e1 || e2 || e3) {
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
				{ duration: 7000, id: 'data-not-loading-live' }
			);
		}
	}, [e1, e2, e3]);


	// ----------------------------------------------------
	// ----------------------Render------------------------
	// ----------------------------------------------------

	return (
		<div className="w-screen h-screen text-black bg-white">
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


			{/* //Note this is a custom home navigator  */}
			<HomeNav logoColor={"#0C1615"} />
			<div className='flex  flex-col tablet:flex-row justify-center items-center laptop:h-[calc(100vh-80px)] mx-5 laptop:mx-20 mt-80px'>
				<ul className='flex flex-col font-SG font-medium tablet:w-[50%] cursor-pointer justify-center items-start lg-desktop:items-end text-[20px] tablet:text-[30px] laptop:text-[40px] lg-desktop:text-[55px] p-4 tablet:p-8' >


					<Link href='/markets'>
						<a className=' flex flex-row w-full' >
							<li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl w-full laptop:w-3/4  laptop:w-3/4 px-4 py-2 flex flex-row justify-start items-center active'>

								<img className="w-[25px] invisible group-hover:flex group-hover:visible mr-4 " src='/jordans.svg' />
								<span className=''>Launch App</span>
							</li>
						</a>
					</Link>

					<a className=' flex flex-row w-full' href="https://docs.xsauce.io/applications/prediction-markets-v.0-beta"
						target={'_blank'}
						rel={'noreferrer'} >
						<li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl w-full laptop:w-3/4 px-4 py-2 flex flex-row justify-start items-center'>
							<img className="w-[25px] invisible  group-hover:flex mr-4 group-hover:visible" src='/jordans.svg' />
							<span className=''>What is Xsauce</span>
						</li>
					</a>

					<Link href='/markets'>
						<a className=' flex flex-row w-full'  >
							<li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl w-full laptop:w-3/4 laptop:w-1/2 px-4 py-2 flex flex-row justify-start items-center'>
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


					<a className='flex flex-row w-full' href="https://docs.xsauce.io/connect/socials"
						target={'_blank'}
						rel={'noreferrer'}>
						<li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl  w-full laptop:w-3/4  px-4 py-2 flex flex-row justify-start items-center'>

							<img className="w-[25px] invisible group-hover:flex mr-4 group-hover:visible" src='/jordans.svg' />
							<span className=''>Drop us a line</span>

						</li>
					</a>


				</ul>
				<div className='tablet:w-[50%] flex flex-row justify-start items-center  '>
					<img className='w-full p-4 tablet:p-8' src='/visual.png' />
				</div>
			</div >
		</div >
	);
};

export default Home;
