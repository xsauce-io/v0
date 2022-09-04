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
import { RiArrowDropDownLine, RiLayoutGridFill } from 'react-icons/Ri';
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
	const [layout, setLayout] = useState({ state: LAYOUT_STATES.GRID });
	let [toggled, setisToggled] = useState('1');

	const options = {
		method: 'GET',
		url: 'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&brand=adidas&name=yeezy-350&gender=men',
	};

	const handleSortByReleaseDateClick = () => {};
	const handleSortByRetailPriceClick = () => {};

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
		if (response.length > 0 && sortBy.state === SORT_BY_STATES.NAME) {
			response.sort((a: { name: string }, b: { name: string }) =>
				a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
			);
			console.log({ response });
		} else if (
			response.length > 0 &&
			sortBy.state === SORT_BY_STATES.RELEASE_DATE
		) {
			response.sort((a: { releaseDate: string }, b: { releaseDate: string }) =>
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
	}, [sortBy]);

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
								<label className="text-[14px] flex flex-row justify-center items-center border-[#0C1615] border-2 rounded-3xl p-2 text-sm px-5 bg-white">
									{toggled === '1' ? (
										<>
											<span className="text-black">Most Positive</span>
										</>
									) : toggled === '2' ? (
										<>
											<span className="text-black">Most Negative</span>
										</>
									) : (
										<>
											<span className="text-black">Telos</span>
										</>
									)}
									<RiArrowDropDownLine />
								</label>
								<ul className="menu dropdown-content bg-[#DCDEE1] p-2 shadow rounded-box w-52 mt-4">
									<li>
										<button onClick={() => setisToggled('1')}>
											Most Positive
										</button>
									</li>
									<li>
										<button
											onClick={() => {
												setisToggled('2');
											}}
										>
											Most Negative
										</button>
									</li>

									<li>
										<button onClick={() => setisToggled('3')}>
											Most Popular
										</button>
									</li>
								</ul>
							</div>
						</div>

						{/* <div className="grid-cols-1 gap-4 px-12 ">
							<div className="flex flex-row items-center justify-start space-x-4">
								<div className="flex flex-row items-center justify-center border-[#30403F] border-[1px] rounded-[40px] w-[40%] h-[40%] py-2 px-3 space-x-2">
									<div className="text-[10px]">Filter on:</div>
									<button
										onClick={() =>
											setSortBy({ state: SORT_BY_STATES.RETAIL_PRICE })
										}
										className={
											sortBy.state === SORT_BY_STATES.RETAIL_PRICE
												? 'laptop:flex flex-row items-center rounded-xl text-white transition duration-500 text-[#D9CE3F] p-2'
												: 'laptop:flex flex-row items-center rounded-xl transition duration-500 p-2 text-black'
										}
									>
										<h3 className="text-black rounded-[40px] flex flex-row justify-center laptop:text-[10px] border-[1px] py-2 px-4 border-[black]">
											Retail Price
										</h3>
									</button>
									<button
										onClick={() =>
											setSortBy({ state: SORT_BY_STATES.RELEASE_DATE })
										}
										className={
											sortBy.state === SORT_BY_STATES.RELEASE_DATE
												? 'laptop:flex flex-row items-center text-white rounded-xl transition duration-200 text-[#D9CE3F] p-2'
												: 'laptop:flex flex-row items-center text-black rounded-xl transition duration-500  p-2'
										}
									>
										<h3 className="text-black rounded-[40px] flex flex-row justify-center laptop:text-[10px] border-[1px] py-2 px-4 border-[black]">
											Release Date
										</h3>
									</button>
									<button
										onClick={() => setSortBy({ state: SORT_BY_STATES.NAME })}
										className={
											sortBy.state === SORT_BY_STATES.NAME
												? 'laptop:flex flex-row items-center text-white rounded-xl transition duration-200 text-[#D9CE3F] p-2'
												: 'laptop:flex flex-row items-center text-black rounded-xl transition duration-500  p-2'
										}
									>
										<h3 className="text-black rounded-[40px] flex flex-row justify-center laptop:text-[10px] border-[1px] py-2 px-4 border-[black]">
											Sneaker Name
										</h3>
									</button>
								</div>

								<div className="flex flex-row items-center justify-center border-[#30403F] border-[1px] rounded-[40px] w-[15%] h-[40%] py-2 px-3 space-x-2">
									<div className="text-[10px]">Ascending</div>
									<button
										onClick={() =>
											setSortBy({ state: SORT_BY_STATES.RETAIL_PRICE })
										}
										className={
											sortBy.state === SORT_BY_STATES.RETAIL_PRICE
												? 'laptop:flex flex-row items-center rounded-xl text-white transition duration-500 text-[#D9CE3F] p-2'
												: 'laptop:flex flex-row items-center rounded-xl transition duration-500 p-2 text-black'
										}
									>
										<h3 className="text-black rounded-[40px] flex flex-row justify-center laptop:text-[10px] border-[1px] py-2 px-4 border-[black]">
											Retail Price
										</h3>
									</button>
								</div>
							</div>
						</div> */}
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
