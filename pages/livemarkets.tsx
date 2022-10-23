import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';

import { Skeleton } from '@mui/material';
import { Layout } from '../components/layout/layout';
import { ContentHeader } from '../components/layout/contentHeader';

import { Card } from '../components/livemarkets/cardWager';
import { useGetSneaker } from '../services/useRequests';
import toast from 'react-hot-toast';
import { ToastNotification } from '../components/common/toast';

const Markets: NextPage = () => {
	// ------------------- Constants ---------------------

	const SORT_BY_STATES = {
		RELEASE_DATE: 'releaseDate',
		NAME: 'name',
		RETAIL_PRICE: 'retailPrice',
	};

	const FILTER_BY_STATES = {
		LIVE: 'live',
		EXPIRED: 'expired',
		NONE: 'none',
	};

	const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];

	// -------------------- Data Fetching ------------------

	const { data: s1, error: e1 } = useGetSneaker('DH7138-006');
	const { data: s2, error: e2 } = useGetSneaker('DR8869-200');
	const { data: s3, error: e3 } = useGetSneaker('DR0501-101');
	const { data: s4, error: e4 } = useGetSneaker('DX2836-001');

	// ------------------- State Variable --------------------

	const [response, setResponse] = useState([] as any[]);
	const [storedPersistentResponse, setStoredPersistentResponse] = useState(
		[] as any[]
	);
	const [sortBy, setSortBy] = useState({
		state: SORT_BY_STATES.RETAIL_PRICE,
	});
	const [isAscending, setIsAscending] = useState(true);
	const [filterBy, setFilterBy] = useState({
		state: FILTER_BY_STATES.NONE,
	});

	//------------------ Use Effect / Use memo ------------------

	useEffect(() => {
		setResponse([s1, s2, s3, s4]);
		setStoredPersistentResponse([s1, s2, s3, s4]);
		setSortBy({
			state: SORT_BY_STATES.RETAIL_PRICE,
		});
	}, [s1, s2, s3, s4]);

	useMemo(() => {
		if (response) {
			if (response.length > 0 && isAscending === true) {
				if (response.length > 0 && sortBy.state === SORT_BY_STATES.NAME) {
					response.sort((a: { name: string }, b: { name: string }) =>
						a.name?.toLowerCase() > b.name?.toLowerCase() ? 1 : -1
					);
					console.log({ response });
				} else if (
					response.length > 0 &&
					sortBy.state === SORT_BY_STATES.RELEASE_DATE
				) {
					response.sort(
						(a: { releaseDate: string }, b: { releaseDate: string }) =>
							a.releaseDate > b.releaseDate
								? 1
								: b.releaseDate > a.releaseDate
									? -1
									: 0
					);
					console.log({ response });
				} else if (
					response.length > 0 &&
					sortBy.state === SORT_BY_STATES.RETAIL_PRICE
				) {
					response.sort(
						(a: { retailPrice: number }, b: { retailPrice: number }) =>
							a.retailPrice - b.retailPrice
					);
					console.log({ response });
				}
			} else if (response.length > 0 && isAscending === false) {
				if (response.length > 0 && sortBy.state === SORT_BY_STATES.NAME) {
					response.sort((a: { name: string }, b: { name: string }) =>
						a.name?.toLowerCase() < b.name?.toLowerCase() ? 1 : -1
					);
					console.log({ response });
				} else if (
					response.length > 0 &&
					sortBy.state === SORT_BY_STATES.RELEASE_DATE
				) {
					response.sort(
						(a: { releaseDate: string }, b: { releaseDate: string }) =>
							a.releaseDate < b.releaseDate
								? 1
								: b.releaseDate < a.releaseDate
									? -1
									: 0
					);
					console.log({ response });
				} else if (
					response.length > 0 &&
					sortBy.state === SORT_BY_STATES.RETAIL_PRICE
				) {
					response.sort(
						(a: { retailPrice: number }, b: { retailPrice: number }) =>
							b.retailPrice - a.retailPrice
					);
					console.log({ response });
				}
			}
		}
	}, [sortBy, isAscending]);

	// useMemo(() => {
	// 	if (response) {
	// 		if (response.length >= 0 && filterBy.state === FILTER_BY_STATES.NONE) {
	// 			setResponse(storedPersistentResponse);
	// 		} else if (
	// 			response.length > 0 &&
	// 			filterBy.state === FILTER_BY_STATES.EXPIRED
	// 		) {
	// 			response.filter((element) => {
	// 				let today = new Date();
	// 				const expirationDate = new Date(element.expiration);

	// 				if (today >= expirationDate) {
	// 					console.log('element expired', expirationDate);
	// 				}
	// 				console.log(element.expiration);
	// 			});
	// 			console.log('expired', { response });
	// 		} else if (
	// 			response.length > 0 &&
	// 			filterBy.state === FILTER_BY_STATES.LIVE
	// 		) {
	// 			response.sort(
	// 				(a: { retailPrice: number }, b: { retailPrice: number }) =>
	// 					a.retailPrice - b.retailPrice
	// 			);
	// 			console.log('live', { response });
	// 		}
	// 	}
	// }, [filterBy]);

	useEffect(() => {
		if (e1 || e2 || e3 || e4) {
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
	}, [e1, e2, e3, e4]);

	// ----------------- Render ------------------

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
							{/* <div className="dropdown dropdown-end ">
								<label
									tabIndex={0}
									className="text-[10px] flex flex-row justify-center text-center items-center border-[#0C1615] border-2 rounded-3xl text-sm  bg-[#0C1615] hover:opacity-50  w-[130px]  p-1 px-2"
								>
									<img className="" src="/settingsSlider.svg" />

									<span className="flex-1 text-white font-Inter ">Filter</span>

									<img className="" src="/downArrowGrey.svg" />
								</label>
								<ul
									tabIndex={0}
									className="menu dropdown-content bg-[#DCDEE1] p-2 shadow rounded-box w-52 mt-4"
								>
									<li>
										<button
											onClick={() => {
												setFilterBy({ state: FILTER_BY_STATES.EXPIRED });
												mixpanel.track('Filter ', {
													sortBy: FILTER_BY_STATES.EXPIRED,
												});
											}}
											className="text-black font-Inter active:bg-[#ACFF00]"
										>
											Expired
										</button>
									</li>
									<li>
										<button
											onClick={() => {
												setFilterBy({ state: FILTER_BY_STATES.LIVE });
												mixpanel.track('Filter ', {
													sortBy: FILTER_BY_STATES.LIVE,
												});
											}}
											className="text-black font-Inter active:bg-[#ACFF00]"
										>
											Live
										</button>
									</li>
								</ul>
							</div> */}
						</div>
					</ContentHeader>

					<div className="grid mobile:grid-cols-1 tablet:grid laptop:grid-cols-2 grid-rows-1 gap-y-6 place-items-center gap-x-6 mb-10 ">
						{response ||
							e1 === undefined ||
							e2 === undefined ||
							e3 === undefined ||
							e4 === undefined
							? response?.map((el: any) => <Card cardObject={el} />)
							: skeletonArray.map(() => (
								<Skeleton
									animation="wave"
									variant="rounded"
									height={500}
									sx={{ borderRadius: '100px' }}
									width={'100%'}
								/>
							))}
					</div>
				</main>
			</Layout>
		</div>
	);
};

export default Markets;
