import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import {MktBanner} from '../components/marketPlaceBanner';
import React from 'react';
import { ethers } from 'ethers';
import { TopStories } from '../components/topStories';
import { DashboardTable } from '../components/dashboardTable';
import { MarketFactory, marketsDataGit } from '../services/constants';
import MarketFactoryABI from '../abi/marketFactory.json';
import MarketAbi from '../abi/markets.json';
import { CalendarHighlight } from '../components/calendarHighlight';
import { useGetMarketBySku, useGetSneaker } from '../services/useRequests';

// Here we have used react-icons package for the icons
// And react-slick as our Carousel Lib

import { Dashboard } from '../components/dashboard';
import { ContentHeader } from '../components/contentHeader';
import { Skeleton } from '@mui/material';
import toast from 'react-hot-toast';
import { ToastNotification } from '../components/toast';
declare let window: any;
import { FirstTimeVisitorModal } from '../components/firstTimeVisitorModal';
import { CalendarCard } from '../components/calendarCard';
import { Nav } from '../components/nav';
import { useWindowDimensions } from '../utils/hooks/useWindowDimensionsTS';

const Home: NextPage = () => {
	// ------------------- Constants ---------------------
	const SORT_BY_STATES = {
		RELEASE_DATE: 'releaseDate',
		NAME: 'name',
		RETAIL_PRICE: 'retailPrice',
	};

	const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];

	// ------------------- State Variable --------------------
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

	// -------------------- Data Fetching ------------------

	const [allBalances, setAllBalances] = useState([] as any);

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

	//------------------ Use Effect / Use memo ------------------
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



	return (
		<div className="w-full items-center justify-center text-black">
			<Head>
				<title>Xsauce | Culture is Currency</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
        <link rel="icon" type='favicon' href='/greenDrop.svg'/>
			</Head>
      

	<Nav logoColor={"#ACFF00"}/>
  {/* <h1 className='font-bold font-SG laptop:p-6 text-[60px] w-full text-center'>The Future of Culture is Here</h1> */}
  <div className='flex mobile:flex-col justify-center laptop:flex-row justify-center items-center laptop:h-[calc(100vh-80px)]'>
  <ul className=' font-SG font-medium mobile:text-[30px] laptop:w-[50%] flex flex-col justify-start items-center text-[40px] p-8' >
<a href='/markets'>
    <li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl px-3 py-2 flex flex-row justify-center items-center'>
      <img className="w-[5%] invisible group-hover:visible" src='/jordans.svg'/>
      <span className='ml-2'>Launch App</span>
    </li>
    </a>
    <li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl w-fit px-3 py-2 flex flex-row justify-center items-center'>
      <img className="w-[5%] invisible group-hover:visible" src='/jordans.svg'/>
      <span className='ml-2'>Drip Feed </span>
      
      </li>
    <li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl  px-3 py-2 flex flex-row justify-center items-center'>
    <img className="w-[5%] invisible group-hover:visible" src='/jordans.svg'/>
    <span className='ml-2'>What is Xsauce? </span>
      </li>
      <li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl  px-3 py-2 flex flex-row justify-center items-center'>
      <img className="w-[5%] invisible group-hover:visible" src='/jordans.svg'/>
      <span className='ml-2'>Documentation  </span>
      </li >
      <li className='group text-black hover:bg-[#ACFF00] hover:rounded-xl w-fit px-3 py-2 flex flex-row justify-center items-center'>
      <img className="w-[5%] invisible group-hover:visible" src='/jordans.svg'/>
      <span className='ml-2'>Drop us a line </span>
      
      </li>
     

  </ul>
  <div className='flex mobile:justify-center laptop:w-[50%] flex-row justify-start items-center  '>
  <img className='w-[80%]' src='/visual.png'/>
  </div>
  </div>
		</div>
	);
};

export default Home;
