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
	const SORT_BY_STATES = {
		RELEASE_DATE: 'releaseDate',
		NAME: 'name',
		RETAIL_PRICE: 'retailPrice',
	};

	const [sortBy, setSortBy] = useState({ state: SORT_BY_STATES.RETAIL_PRICE });
	const [isAscending, setIsAscending] = useState(true);

	const { data, error } = useGetMultiSneakers([
		'315728-381',
		'AA3830-001',
		'AT9915-002',
		'555088-711',
	]);
	//const [response, setResponse] = useState([]);

	useMemo(() => {
		if (data) {
			if (data.length > 0 && isAscending === true) {
				if (data.length > 0 && sortBy.state === SORT_BY_STATES.NAME) {
					data.sort((a: { name: string }, b: { name: string }) =>
						a.name?.toLowerCase() > b.name?.toLowerCase() ? 1 : -1
					);
					console.log({ data });
				} else if (
					data.length > 0 &&
					sortBy.state === SORT_BY_STATES.RELEASE_DATE
				) {
					data.sort((a: { releaseDate: string }, b: { releaseDate: string }) =>
						a.releaseDate > b.releaseDate
							? 1
							: b.releaseDate > a.releaseDate
							? -1
							: 0
					);
					console.log({ data });
				} else if (
					data.length > 0 &&
					sortBy.state === SORT_BY_STATES.RETAIL_PRICE
				) {
					data.sort(
						(a: { retailPrice: number }, b: { retailPrice: number }) =>
							a.retailPrice - b.retailPrice
					);
					console.log({ data });
				}
			} else if (data.length > 0 && isAscending === false) {
				if (data.length > 0 && sortBy.state === SORT_BY_STATES.NAME) {
					data.sort((a: { name: string }, b: { name: string }) =>
						a.name?.toLowerCase() < b.name?.toLowerCase() ? 1 : -1
					);
					console.log({ data });
				} else if (
					data.length > 0 &&
					sortBy.state === SORT_BY_STATES.RELEASE_DATE
				) {
					data.sort((a: { releaseDate: string }, b: { releaseDate: string }) =>
						a.releaseDate < b.releaseDate
							? 1
							: b.releaseDate < a.releaseDate
							? -1
							: 0
					);
					console.log({ data });
				} else if (
					data.length > 0 &&
					sortBy.state === SORT_BY_STATES.RETAIL_PRICE
				) {
					data.sort(
						(a: { retailPrice: number }, b: { retailPrice: number }) =>
							b.retailPrice - a.retailPrice
					);
					console.log({ data });
				}
			}
		}
	}, [sortBy, isAscending]);

	if (!data) {
		return <text>Loading</text>;
	}

	useEffect(() => {}, [data]);

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
									className="dropdown-content bg-[#DCDEE1] p-2 shadow rounded-box w-52 mt-4"
								>
									<li className="font-Inter active:bg-[#ACFF00] p-4 rounded-3xl">
										<button
											onClick={() =>
												setSortBy({ state: SORT_BY_STATES.RETAIL_PRICE })
											}
											className="font-Inter active:bg-[#ACFF00]"
										>
											Retail Price
										</button>
									</li>
									<li className="font-Inter active:bg-[#ACFF00] p-4 rounded-3xl">
										<button
											onClick={() =>
												setSortBy({ state: SORT_BY_STATES.RELEASE_DATE })
											}
											className="font-Inter "
										>
											Release Date
										</button>
									</li>

									<li className="font-Inter active:bg-[#ACFF00] p-4 rounded-3xl">
										<button
											onClick={() => setSortBy({ state: SORT_BY_STATES.NAME })}
											className="font-Inter active:bg-[#ACFF00]"
										>
											Name
										</button>
									</li>
								</ul>
							</div>
						</div>
					</ContentHeader>

					<div className="grid mobile:grid-cols-1 tablet:grid laptop:grid-cols-2 grid-rows-1 gap-y-6 place-items-center gap-x-6 mb-10 ">
						{data?.map((el: any) => (
							<Card cardObject={el} />
						))}
					</div>
				</main>
			</Layout>
		</div>
	);
};

export default Markets;
