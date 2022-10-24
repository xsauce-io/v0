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
import { Layout } from '../components/layout/layout';
import { ContentHeader } from '../components/layout/contentHeader';

const DripFeed: NextPage = () => {
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
		<div>
			<Head>
				<title>Xsauce | Markets</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" type='favicon' href='/greenDrop.svg' />
			</Head>

			<Layout
				headerSubtitle={'LIVE DERIVATIVES MARKET'}
				showHowItWorksButton={true}
				showFinancialOverview={false}
				headerTitle={'Xchange'}
				logoColor={'#FFFFFF'}
			>
				<main className="flex w-full flex-1 flex-col text-center">
					{/*Sorting */}
					<ContentHeader
						title={'Predict the live market'}
						icon={<img src="/candle.svg" />}
					>
						<div className="flex mobile:flex-col tablet:flex-row tablet:space-x-3 mobile:space-y-3  tablet:space-y-0 items-center ">
							<text>
								Total Live Markets &nbsp;
								<span className="text-[#748282]"> {response.length}</span>
							</text>
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="text-[10px]  flex flex-row justify-center  text-center items-center border-[#0C1615] border-2 rounded-3xl text-sm  bg-[#0C1615]  hover:opacity-50  w-[130px] p-1 px-2"
								>
									<img className="" src="/arrowUpDownGrey.svg" />

									<span className="flex-1 text-white font-Inter ">Sort On</span>

									<img className="" src="/downArrowGrey.svg" />
								</label>
								<ul
									tabIndex={0}
									className="menu dropdown-content bg-[#DCDEE1] p-2 shadow rounded-box w-52 mt-4"
								>
									<li>
										<button
											onClick={() => {
												setSortBy({ state: SORT_BY_STATES.RETAIL_PRICE });
												mixpanel.track('Sort ', {
													sortBy: SORT_BY_STATES.RETAIL_PRICE,
												});
											}}
											className="text-black font-Inter active:bg-[#ACFF00]"
										>
											Retail Price
										</button>
									</li>
									<li>
										<button
											onClick={() => {
												setSortBy({ state: SORT_BY_STATES.RELEASE_DATE });
												mixpanel.track('Sort ', {
													sortBy: SORT_BY_STATES.RELEASE_DATE,
												});
											}}
											className="text-black font-Inter active:bg-[#ACFF00]"
										>
											Release Date
										</button>
									</li>

									<li>
										<button
											onClick={() => {
												setSortBy({ state: SORT_BY_STATES.NAME });
												mixpanel.track('Sort ', {
													sortBy: SORT_BY_STATES.NAME,
												});
											}}
											className="text-black font-Inter active:bg-[#ACFF00]"
										>
											Name
										</button>
									</li>
								</ul>
							</div>

						</div>
					</ContentHeader>


				</main>
			</Layout>
		</div>
	);
};

export default DripFeed;
