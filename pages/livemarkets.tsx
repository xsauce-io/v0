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
import { FaList } from 'react-icons/Fa';
import {
	RiArrowDownSLine,
	RiArrowDropDownLine,
	RiArrowUpSLine,
	RiLayoutGridFill,
} from 'react-icons/Ri';
import { Card } from '../components/cardWager';

const Markets: NextPage = () => {
	const SORT_BY_STATES = {
		RELEASE_DATE: 'releaseDate',
		NAME: 'name',
		RETAIL_PRICE: 'retailPrice',
	};

	const LAYOUT_STATES = {
		GRID: 'grid',
		LIST: 'list',
	};

	const [response, setResponse] = useState([]);
	const [sortBy, setSortBy] = useState({ state: SORT_BY_STATES.NAME });
	const [isAscending, setIsAscending] = useState(true);

	const options = {
		method: 'GET',
		url: 'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&brand=adidas&name=yeezy-350&gender=men',
	};

	// fetch sneaker data
	const getSneaker = async () => {
		axios
			.request(options)
			.then(function (response) {
				setResponse(response.data.results);
				console.log(response.data.results);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	useEffect(() => {
		getSneaker();
	}, []);

	useMemo(() => {
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
	}, [sortBy, isAscending]);

	return (
		//#F5DEB3 - Vanilla
		//#E5E5E5 - Gray

		<div>
			<Head>
				<title>Xsauce</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout headerSubtitle={'LIVE DERIVATIVES MARKET'}>
				<main className="flex w-full flex-1 flex-col text-center">
					{/*Sorting */}
					<ContentHeader title={'Predict the live market'}>
						<div className="border-[#0C1615] bg-[#DCDEE1] border-2 rounded-[80px] flex items-center p-2 px-5 space-x-3">
							<h5 className="text-sm">Filter on</h5>
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="text-[14px] flex flex-row justify-center items-center border-[#0C1615] border-2 rounded-3xl p-2 text-sm px-5 bg-white"
								>
									{sortBy.state === SORT_BY_STATES.RETAIL_PRICE ? (
										<>
											<span className="text-black">Retail Price</span>
										</>
									) : sortBy.state === SORT_BY_STATES.RELEASE_DATE ? (
										<>
											<span className="text-black">Release Date</span>
										</>
									) : (
										<>
											<span className="text-black">Name</span>
										</>
									)}
									<RiArrowDropDownLine />
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
										>
											Retail Price
										</button>
									</li>
									<li>
										<button
											onClick={() =>
												setSortBy({ state: SORT_BY_STATES.RELEASE_DATE })
											}
										>
											Release Date
										</button>
									</li>

									<li>
										<button
											onClick={() => setSortBy({ state: SORT_BY_STATES.NAME })}
										>
											Name
										</button>
									</li>
								</ul>
							</div>
							<button
								className="hover:scale-150"
								onClick={() => setIsAscending(!isAscending)}
							>
								{isAscending === true ? (
									<RiArrowUpSLine size={20} />
								) : (
									<RiArrowDownSLine size={20} />
								)}
							</button>
						</div>
					</ContentHeader>

					<div className="laptop:grid grid-cols-3 grid-rows-1 gap-y-14 place-items-center gap-x-1 mb-10 pt-10">
						{response.map((el) => (
							<Card cardObject={el} />
						))}
					</div>
				</main>
			</Layout>
		</div>
	);
};

export default Markets;
