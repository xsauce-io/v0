import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
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

const Portfolio: NextPage = () => {
	// ------------------- Constants ---------------------
	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};
	const SORT_BY_STATES = {
		RELEASE_DATE: 'releaseDate',
		NAME: 'name',
		RETAIL_PRICE: 'retailPrice',
	};

	const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];

	// ------------------- State Variable --------------------

	const [response, setResponse] = useState([] as any);
	const [storedPersistentResponse, setStoredPersistentResponse] = useState(
		[] as any[]
	);
	//filter state mana
	const [isAscending, setIsAscending] = useState(true);
	const [sortBy, setSortBy] = useState({ state: SORT_BY_STATES.RELEASE_DATE });
	const [allBalances, setAllBalances] = useState([] as any);

	const [showPortfolio, setShowPortfolio] = useState(false);

	const showBalances = async () => {
		const hasConnectedWalletBefore = localStorage.getItem(
			'hasConnectedWalletBefore'
		);

		if (hasConnectedWalletBefore != null) {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const connected = (
					await provider.send('eth_requestAccounts', [0])
				).toString();
				setShowPortfolio(true);
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
			} catch {
				console.log('failed balance retrieval');
				setShowPortfolio(false);
			}
		}
	};

	//------------------ Use Effect / Use memo ------------------

	useEffect(() => {
		showBalances();
	}, []);

	useEffect(() => {}, [showPortfolio]);

	return (
		<div>
			<Head>
				<title>Xsauce</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<Layout
				headerSubtitle={'OVERVIEW'}
				headerTitle={'Dashboard'}
				showHowItWorksButton={true}
				showFinancialOverview={false}
			>
				<div className="relative min-h-[60vh]">
					<ContentHeader
						title={'Your Positions'}
						icon={<img src="/pieChart.svg" />}
						flexColumn
					>
						<div className="flex flex-row items-center mobile:flex-col tablet:space-x-3 mobile:space-y-3  tablet:space-y-0    tablet:flex-row">
							<text>
								Total Positions &nbsp;
								{showPortfolio ? (
									<span className="text-[#748282]">{allBalances?.length}</span>
								) : (
									<></>
								)}
							</text>
						</div>
					</ContentHeader>
					{showPortfolio ? (
						<DashboardTable>
							{allBalances.length === 0
								? skeletonArray.map(() => (
										<>
											<Skeleton
												animation="pulse"
												variant="rounded"
												height={70}
												width={'100%'}
												sx={{ borderRadius: '100px' }}
											/>
											<p className="h-4"> </p>
										</>
								  ))
								: allBalances?.map((el: any) => {
										return <Dashboard positions={el} />;
								  })}
						</DashboardTable>
					) : (
						<div className="w-full h-full bg-[#c4c4c4] absolute top-4 bg-opacity-50 flex flex justify-center items-center text-center">
							<div
								className={
									'py-4 px-4 w-full bg-[#ACFF00]   border-y-[1px] border-[#0C1615]'
								}
							>
								<text className="mobile:text-sm tablet:text-xl font-normal font-Inter">
									Connect your wallet to see your Portfolio
								</text>
							</div>
						</div>
					)}
				</div>
			</Layout>
		</div>
	);
};

export default Portfolio;
