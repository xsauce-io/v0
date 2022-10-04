import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import React from 'react';
import { ethers } from 'ethers';
import Script from 'next/script';
import { DashboardTable } from '../components/dashboardTable';
import { MarketFactory, marketsDataGit } from '../services/constants';
import MarketFactoryABI from '../abi/marketFactory.json';
import MarketAbi from '../abi/markets.json';
import { useGetAllMarkets, useGetMarketBySku } from '../services/useRequests';

// Here we have used react-icons package for the icons
// And react-slick as our Carousel Lib

import { Dashboard } from '../components/dashboard';
import { ContentHeader } from '../components/contentHeader';
import { useGetSneakerByLimit } from '../services/useRequests';
import { Skeleton } from '@mui/material';
import toast from 'react-hot-toast';
import { ToastNotification } from '../components/toast';
declare let window: any;
import { FirstTimeVisitorModal } from '../components/firstTimeVisitorModal';

const Home: NextPage = () => {
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
	const allMarketSkus: any[] = [];
	const allMarketContracts: any[] = [];

	// ------------------- State Variable --------------------
	const { data: sneakersData, error: sneakersDataError } =
		useGetSneakerByLimit('11');
	const [response, setResponse] = useState(sneakersData);
	const [responses, setResponses] = useState([] as any);

	const [allMarkets, setAllMarkets] = useState([] as any);
	const [positions, setPositions] = useState([] as any);

	//filter state mana
	const [isAscending, setIsAscending] = useState(true);
	const [sortBy, setSortBy] = useState({ state: SORT_BY_STATES.RELEASE_DATE });

	// -------------------- Data Fetching ------------------

	// const mergeData = async () => {
	// 	const newResponseArray: any = [];
	// 	for (let x = 0; x < balanceArray.length; x++) {
	// 		let balanceCurrentObject = balanceArray[x];

	// 		for (let y = 0; y < responses.length; y++) {
	// 			let responseCurrentObject = responses[y];

	// 			if (balanceCurrentObject.sku === responseCurrentObject.sku) {
	// 				let newMergeObject = {
	// 					yes: balanceCurrentObject.yes,
	// 					no: balanceCurrentObject.yes,
	// 					sku: responseCurrentObject.sku,
	// 					name: responseCurrentObject.name,
	// 					address: responseCurrentObject.address,
	// 					book: responseCurrentObject.book,
	// 					expiration: responseCurrentObject.expiration,
	// 				};

	// 				newResponseArray.push(newMergeObject);
	// 			}
	// 		}
	// 	}
	// 	console.log(newResponseArray);
	// 	setPositions(newResponseArray);
	// };

	// const getSneaker = async () => {
	// 	axios
	// 		.get(marketsDataGit)

	// 		.then((res) => {
	// 			const resArray = [];
	// 			for (let index = 0; index < allMarketSkus.length; index++) {
	// 				const element = res.data[3][allMarketSkus[index]];
	// 				resArray.push(element);
	// 			}

	// 			setResponses(resArray);
	// 		})
	// 		.catch(function (error) {
	// 			console.error(error);
	// 		});
	// };

	// const checkMarkets = async () => {
	// 	const provider = new ethers.providers.Web3Provider(window.ethereum);
	// 	const connected = (
	// 		await provider.send('eth_requestAccounts', [0])
	// 	).toString();
	// 	const signer = provider.getSigner();
	// 	const contract = new ethers.Contract(
	// 		MarketFactory,
	// 		MarketFactoryABI,
	// 		signer
	// 	);

		
	// 	console.log(cleanedAllMarkets);
	// 	setAllMarkets(cleanedAllMarkets);

	// 	for (let index = 0; index < allMarkets.length; index++) {
	// 		const shoeData = allMarkets[index].sku;
	// 		const shoeMarket = allMarkets[index].market;
	// 		allMarketSkus.push(shoeData);
	// 		allMarketContracts.push(shoeMarket);
	// 	}
	// };
	



	const [allBalances, setAllBalances] = useState([] as any);

	const showBalances = async () => {

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
			const r1 = (allMarkets[index].sku).toString();
      const r2 = (allMarkets[index].market).toString();
      const r3 = (allMarkets[index].name).toString();
      const newData = {sku: r1, address: r2, name: r3}
			cleanedAllMarkets.push(newData);
    }
    
		
    const balanceArray: any = [];
		
    for (let index = 0; index < cleanedAllMarkets?.length; index++) {
		const contract = new ethers.Contract(cleanedAllMarkets[index]?.address, MarketAbi, signer);
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
      address:cleanedAllMarkets[index].address,
      sku:cleanedAllMarkets[index].sku,
      name:cleanedAllMarkets[index].name

		};
      balanceArray.push(newObj)
  }
		setAllBalances(balanceArray);
    
	};
  console.log(allBalances)

	useEffect(() => {
		showBalances();
	}, []);



	// const showBalances = async () => {

	//     const provider = new ethers.providers.Web3Provider(window.ethereum);
	//     const connected = (await provider.send('eth_requestAccounts', [0])).toString();
	//     const signer = provider.getSigner();
	//     for (let index = 0; index < allMarketContracts.length; index++) {
	//       const contract = new ethers.Contract(allMarkets[index].market, MarketAbi , signer);
	//       const sku = allMarkets[index].sku
	//       const balance1 = (await contract.balanceOf(connected, 1)).toString()
	//       const balance2 = (await contract.balanceOf(connected, 2)).toString()
	//       balanceArray.push({sku, yes:balance1, no:balance2})
	//     }
	//    setIsComplete(true)
	//   }

	//------------------ Use Effect / Use memo ------------------
	useEffect(() => {
		setResponse(sneakersData);
	}, [sneakersData]);

	useEffect(() => {
		const run = async () => {
			// await checkMarkets();
			// await getSneaker();
		};
		run();
	}, []);

	// useMemo(() => {
	// 	if (allMarkets) {
	// 		console.log('here', allMarkets);
	// 		if (allMarkets.length > 0 && isAscending === true) {
	// 			if (allMarkets.length > 0 && sortBy.state === SORT_BY_STATES.NAME) {
	// 				allMarkets.sort((a: { name: string }, b: { name: string }) =>
	// 					a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
	// 				);
	// 			} else if (
	// 				allMarkets.length > 0 &&
	// 				sortBy.state === SORT_BY_STATES.RELEASE_DATE
	// 			) {
	// 				allMarkets.sort(
	// 					(a: { releaseDate: string }, b: { releaseDate: string }) =>
	// 						a.releaseDate > b.releaseDate
	// 							? 1
	// 							: b.releaseDate > a.releaseDate
	// 							? -1
	// 							: 0
	// 				);
	// 			} else if (
	// 				allMarkets.length > 0 &&
	// 				sortBy.state === SORT_BY_STATES.RETAIL_PRICE
	// 			) {
	// 				allMarkets.sort(
	// 					(a: { retailPrice: number }, b: { retailPrice: number }) =>
	// 						a.retailPrice - b.retailPrice
	// 				);
	// 			}
	// 		} else if (allMarkets.length > 0 && isAscending === false) {
	// 			if (allMarkets.length > 0 && sortBy.state === SORT_BY_STATES.NAME) {
	// 				allMarkets.sort((a: { name: string }, b: { name: string }) =>
	// 					a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
	// 				);
	// 			} else if (
	// 				response.length > 0 &&
	// 				sortBy.state === SORT_BY_STATES.RELEASE_DATE
	// 			) {
	// 				response.sort(
	// 					(a: { releaseDate: string }, b: { releaseDate: string }) =>
	// 						a.releaseDate < b.releaseDate
	// 							? 1
	// 							: b.releaseDate < a.releaseDate
	// 							? -1
	// 							: 0
	// 				);
	// 			} else if (
	// 				allMarkets.length > 0 &&
	// 				sortBy.state === SORT_BY_STATES.RETAIL_PRICE
	// 			) {
	// 				allMarkets.sort(
	// 					(a: { retailPrice: number }, b: { retailPrice: number }) =>
	// 						b.retailPrice - a.retailPrice
	// 				);
	// 				console.log({ allMarkets });
	// 			}
	// 		}
	// 	}
	// }, [sortBy, isAscending]);

	useEffect(() => {
		if (sneakersDataError) {
			toast.custom(
				(t) => (
					<ToastNotification
						message={'An Internal Error has occurred'}
						subMessage={
							'The data cannot be currently loaded. Please try again later.'
						}
						icon={<img src="/alertCircle.svg" />}
						t={t}
					/>
				),
				{ duration: 7000 }
			);
		}
	}, [sneakersDataError]);

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
				headerSubtitle={'TOTAL BALANCE'}
				headerTitle={'Positions'}
				showHowItWorksButton={true}
				showFinancialOverview={false}
			>
				<>
					<ContentHeader
						title={'Positions'}
						icon={<img src="/pieChart.svg" />}
						flexColumn
					>
						<div className="flex flex-row items-center mobile:flex-col tablet:space-x-3 mobile:space-y-3  tablet:space-y-0    tablet:flex-row">
							<text>
								Total Positions &nbsp;
								<span className="text-[#748282]">{responses?.length}</span>
							</text>
							{/* <div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="text-[10px]  flex flex-row justify-center  text-center items-center border-[#0C1615] border-2 rounded-3xl text-sm bg-[#0C1615]  hover:opacity-50  w-[130px]  p-1 px-2"
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
							<div className="dropdown dropdown-end ">
								<label
									tabIndex={0}
									className="text-[10px] flex flex-row justify-center text-center items-center border-[#0C1615] border-2 rounded-3xl  text-sm  bg-[#0C1615] hover:opacity-50 w-[130px]  p-1 px-2 text-[10px]"
								>
									<img className="" src="/settingsSlider.svg" />

									<span className="flex-1 text-white font-Inter ">
										Filter On
									</span>

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
												mixpanel.track('Filter ', {
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
												mixpanel.track('Filter ', {
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
												mixpanel.track('Filter ', {
													sortBy: SORT_BY_STATES.NAME,
												});
											}}
											className="text-black font-Inter active:bg-[#ACFF00]"
										>
											Name
										</button>
									</li>
								</ul>
							</div> */}
						</div>
					</ContentHeader>
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
				</>
			</Layout>
		</div>
	);
};

export default Home;
