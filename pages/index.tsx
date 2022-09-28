import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import React from 'react';
import Script from 'next/script';
import { DashboardTable } from '../components/dashboardTable';

// Here we have used react-icons package for the icons
// And react-slick as our Carousel Lib

import { Dashboard } from '../components/dashboard';
import { ContentHeader } from '../components/contentHeader';
import { useGetSneakerByLimit } from '../services/useRequests';
import { Skeleton } from '@mui/material';
import toast from 'react-hot-toast';
import { ToastNotification } from '../components/toast';

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

	// -------------------- Data Fetching ------------------
	const { data: sneakersData, error: sneakersDataError } =
		useGetSneakerByLimit('11');

	// ------------------- State Variable --------------------
	const [response, setResponse] = useState(sneakersData);
	//filter state mana
	const [isAscending, setIsAscending] = useState(true);
	const [sortBy, setSortBy] = useState({ state: SORT_BY_STATES.RELEASE_DATE });

	//------------------ Use Effect / Use memo ------------------
	useEffect(() => {
		setResponse(sneakersData);
	}, [sneakersData]);

	useMemo(() => {
		if (response) {
			if (response.length > 0 && isAscending === true) {
				if (response.length > 0 && sortBy.state === SORT_BY_STATES.NAME) {
					response.sort((a: { name: string }, b: { name: string }) =>
						a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
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
						a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
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

			<Layout headerSubtitle={'TOTAL BALANCE'} headerTitle={'$ 144,000.00'}>
				<>
					<ContentHeader
						title={'Positions'}
						icon={<img src="/pieChart.svg" />}
						flexColumn
					>
						<div className="flex flex-row items-center mobile:flex-col tablet:space-x-3 mobile:space-y-3  tablet:space-y-0    tablet:flex-row">
							<text>
								Total wager lives <span className="text-[#748282]">87</span>
							</text>
							<div className="dropdown dropdown-end">
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
							</div>
						</div>
					</ContentHeader>
					<DashboardTable>
						{response === undefined || sneakersDataError
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
							: response?.map((el: []) => <Dashboard positions={el} />)}
					</DashboardTable>
				</>
			</Layout>
		</div>
	);
};

export default Home;
