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

import { Card } from '../components/cardWager';
import { useGetMultiSneakers, useGetSneaker } from '../services/useRequests';

const Markets: NextPage = () => {
	// ------------------- Constants ---------------------

	const SORT_BY_STATES = {
		RELEASE_DATE: 'releaseDate',
		NAME: 'name',
		RETAIL_PRICE: 'retailPrice',
	};

	// -------------------- Data Fetching ------------------

	const { data: s1, error: e1 } = useGetSneaker('315728-381');
	const { data: s2, error: e2 } = useGetSneaker('AA3830-001');
	const { data: s3, error: e3 } = useGetSneaker('AT9915-002');
	const { data: s4, error: e4 } = useGetSneaker('555088-711');

	// ------------------- State Variable --------------------

	const [response, setResponse] = useState([] as any[]);
	const [sortBy, setSortBy] = useState({
		state: SORT_BY_STATES.RETAIL_PRICE,
	});
	const [isAscending, setIsAscending] = useState(true);

	//------------------ Use Effect / Use memo ------------------

	useEffect(() => {
		setResponse([s1, s2, s3, s4]);
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
				headerSubtitle={'LIVE DERIVATIVES MARKET'}
				showHowItWorksButton={true}
				showFinancialOverview={false}
				headerTitle={'Xchange'}
			>
				<main className="flex w-full flex-1 flex-col text-center">
					{/*Sorting */}
					<ContentHeader
						title={'Predict the live market'}
						icon={<img className="" src="/candle.svg" />}
					>
						<div className="border-[#0C1615] bg-[#DCDEE1] border-2 rounded-[80px] flex items-center p-2 px-5 space-x-2 z-10">
							<h5 className="text-sm font-Inter font-medium ">Filter on</h5>
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="text-[14px] flex flex-row justify-center  text-center items-center border-[#0C1615] border-2 rounded-3xl p-2 text-sm px-5 bg-white space-x-5 hover:opacity-50"
								>
									<img className="" src="/textBlock.svg" />

									{sortBy.state === SORT_BY_STATES.RETAIL_PRICE ? (
										<span className="text-black font-Inter ">Retail Price</span>
									) : sortBy.state === SORT_BY_STATES.RELEASE_DATE ? (
										<span className="text-black font-Inter">Release Date</span>
									) : (
										<span className="text-black font-Inter ">Name</span>
									)}
									<img className="" src="/downArrow.svg" />
								</label>
								<ul
									tabIndex={0}
									className="menu dropdown-content bg-[#DCDEE1] p-2 shadow rounded-box w-52 mt-4"
								>
									<li>
										<button
											onClick={() =>
												setSortBy({ state: SORT_BY_STATES.RETAIL_PRICE })
											}
											className="text-black font-Inter active:bg-[#ACFF00]"
										>
											Retail Price
										</button>
									</li>
									<li>
										<button
											onClick={() =>
												setSortBy({ state: SORT_BY_STATES.RELEASE_DATE })
											}
											className="text-black font-Inter active:bg-[#ACFF00]"
										>
											Release Date
										</button>
									</li>

									<li>
										<button
											onClick={() => setSortBy({ state: SORT_BY_STATES.NAME })}
											className="text-black font-Inter active:bg-[#ACFF00]"
										>
											Name
										</button>
									</li>
								</ul>
							</div>
						</div>
					</ContentHeader>

					<div className="grid mobile:grid-cols-1 tablet:grid laptop:grid-cols-2 grid-rows-1 gap-y-6 place-items-center gap-x-6 mb-10 ">
						{response?.map((el: any) => (
							<Card cardObject={el} />
						))}
					</div>
				</main>
			</Layout>
		</div>
	);
};

export default Markets;
