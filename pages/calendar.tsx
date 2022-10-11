import type { NextPage } from 'next';
import { Nav } from '../components/nav';
import { Announcement } from '../components/announcement';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { RepeatOneSharp } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { Tabs } from '../components/tabs';
import { Layout } from '../components/layout';
import { ContentHeader } from '../components/contentHeader';

import { ethers, utils } from 'ethers';

import { CalendarCard } from '../components/calendarCard';
import { CalendarHighlight } from '../components/calendarHighlight';
import {
	useGetMarketBySku,
	useGetSneaker,
	useGetSneakerByLimit,
} from '../services/useRequests';
import { Box } from '@mui/system';
import toast from 'react-hot-toast';
import { ToastNotification } from '../components/toast';

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

	const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	// -------------------- Data Fetching ------------------

	const { data: highlightSneaker, error } = useGetSneaker('DZ5485-612');
	const { data: sneakersData, error: sneakersDataError } =
		useGetSneakerByLimit('28');

	// ------------------- State Variable --------------------

	const [response, setResponse] = useState(sneakersData);
	const [responseError, setResponseError] = useState(sneakersDataError);
	const [highlight, setHighlight] = useState(highlightSneaker);
	const [sortBy, setSortBy] = useState({ state: SORT_BY_STATES.RELEASE_DATE });
	const [filterBy, setFilterBy] = useState({
		state: FILTER_BY_STATES.NONE,
	});

	const [isAscending, setIsAscending] = useState(true);

	//------------------ Use Effect / Use memo ------------------

	useEffect(() => {
		setResponse(sneakersData);
		setHighlight(highlightSneaker);
		setSortBy({
			state: SORT_BY_STATES.RETAIL_PRICE,
		});
		setFilterBy({
			state: FILTER_BY_STATES.NONE,
		});
		setResponseError(sneakersDataError);
	}, [sneakersData, highlightSneaker, sneakersDataError]);

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
						message={'An Internal Error has Occurred'}
						subMessage={
							'The data cannot be currently loaded. Please try again later.'
						}
						icon={<img src="/alertCircle.svg" />}
						t={t}
					/>
				),
				{ duration: 7000, id: 'data-not-loading-calendar' }
			);
		}
	}, [sneakersDataError]);

	return (
		<div>
			<Head>
				<title>Xsauce</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<Layout
				headerSubtitle={'RELEASE SCHEDULE'}
				showHowItWorksButton={true}
				showFinancialOverview={false}
				headerTitle={'Calendar'}
			>
				<main className="flex w-full flex-1 flex-col text-center">
					{/*Sorting */}
					<ContentHeader
						title={'Upcoming Sneaker Drops'}
						icon={<img className={'h-[30px] w-[30px]'} src="/calendar.svg" />}
					/>

					<div className="space-y-10">
						{/* <CalendarHighlight cardObject={highlight} /> */}
						<div className="flex laptop:flex-row laptop:items-center laptop:space-y-0 mobile:flex-col tablet:space-x-3 mobile:space-y-3  tablet:space-y-0  items-center tablet:flex-row">
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="text-[10px]  flex flex-row justify-center  text-center items-center border-[#0C1615] border-2 rounded-3xl  text-sm  bg-[#0C1615]  hover:opacity-50  w-[130px]  p-1 px-2"
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
												setSortBy({ state: FILTER_BY_STATES.EXPIRED });
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
												setSortBy({ state: FILTER_BY_STATES.LIVE });
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
						<div className="grid mobile:grid-cols-1 tablet:grid laptop:grid-cols-4 grid-rows-1 gap-y-6 place-items-center gap-x-6 mb-10 ">
							{response || sneakersDataError === undefined
								? response?.map((el: any) => <CalendarCard cardObject={el} />)
								: skeletonArray.map(() => (
										<Skeleton
											animation="pulse"
											variant="rounded"
											height={300}
											sx={{ borderRadius: '15px' }}
											width={'100%'}
										/>
								  ))}
						</div>
					</div>
				</main>
			</Layout>
		</div>
	);
};

export default Markets;
