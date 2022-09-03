import type { NextPage } from 'next';
import { Nav } from '../components/nav';
import { Announcement } from '../components/announcement';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { RepeatOneSharp } from '@mui/icons-material';
import { Skeleton } from '@mui/material';

import { FaList } from 'react-icons/Fa';
import { RiLayoutGridFill } from 'react-icons/Ri';
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

		<div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#F8F8F8]">
			<Head>
				<title>Xsauce</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex w-full flex-1 flex-col text-center">
				<Announcement />
				<Nav />

				<div className="flex flex-row  w-full bg-[#8B8B8B] bg-opacity-20 space-x-14 justify-center pb-14 pt-14">
					<div className="flex flex-col font-SG items-center py-3 h-[350px] w-[290px] rounded-md bg-[#F9F9F9] shadow-[8px_12px_18px_17px_rgba(0,0,0,0.3)]">
						<img
							src="/jordansvg.svg"
							className="h-[120px] bg-[#EAEAEA] w-[130px] my-4 p-4 rounded-full"
						></img>
						<h1 className="text-[25px]">
							{' '}
							Total Live <br /> Markets{' '}
						</h1>
						<h1 className="text-[60px] text-[#630606] m-0 flex flex-col items-center">
							3
						</h1>
					</div>
					<div className="flex flex-col font-SG items-center py-3 h-[350px] w-[290px] rounded-md bg-[#F9F9F9] shadow-[8px_12px_18px_17px_rgba(0,0,0,0.3)]">
						<img
							src="/octobers.svg"
							className="h-[120px] bg-[#EAEAEA] w-[130px] my-4 p-4 rounded-full"
						></img>
						<h1 className="text-[25px]">
							Total <br />
							Markets Value
						</h1>
						<h1 className="text-[60px] text-[#630606] m-0 flex flex-col items-center">
							$1.5 M
						</h1>
					</div>
					<div className="flex flex-col font-SG items-center py-3 h-[350px] w-[290px] rounded-md bg-[#F9F9F9] shadow-[8px_12px_18px_17px_rgba(0,0,0,0.3)]">
						<img
							src="/hurache.svg"
							className="h-[120px] bg-[#EAEAEA] w-[130px] my-4 p-4 rounded-full"
						></img>
						<h1 className="text-[25px]">
							Total <br /> Trades{' '}
						</h1>
						<h1 className="text-[60px] text-[#630606] m-0 flex flex-col items-center">
							420
						</h1>
					</div>

					<div className="flex flex-col font-SG items-center py-3 h-[350px] w-[290px] text-[#FED955] rounded-md bg-[#251E1E] shadow-[8px_12px_18px_17px_rgba(0,0,0,0.3)]">
						<img
							src="/11s.svg"
							className="h-[120px] bg-[#EAEAEA] w-[130px] my-4 p-4 rounded-full"
						></img>
						<h1 className="text-[25px]">
							{' '}
							Total <br /> Redeemed{' '}
						</h1>
						<h1 className="text-[60px] text-[#EAEAEA] m-0 flex flex-col items-center">
							300
						</h1>
					</div>
				</div>

				
				{/*Sorting */}

				<div className="laptop: grid-cols-1 gap-4 px-12 ">
          <div className='flex flex-row items-center justify-start space-x-4'>
					<div className="flex flex-row items-center justify-center border-[#30403F] border-[1px] rounded-[40px] w-[40%] h-[40%] py-2 px-3 space-x-2">
						<div className="text-[10px]">Filter on:</div>
						<button
							onClick={() => setSortBy({ state: SORT_BY_STATES.RETAIL_PRICE })}
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
							onClick={() => setSortBy({ state: SORT_BY_STATES.RELEASE_DATE })}
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

						{/* <div className=" flex-1 " />

						<div className="flex flex-row items-center  ">
							<button
								onClick={() => setLayout({ state: LAYOUT_STATES.GRID })}
								className={
									layout.state === LAYOUT_STATES.GRID
										? 'laptop:flex flex-row items-center text-black rounded-l-xl transition duration-200 bg-[#D9D9D9] p-2 w-[50%] '
										: 'laptop:flex flex-row items-center text-black rounded-l-xl transition duration-500  p-2 bg-[#ECECEC] w-[50%]'
								}
							>
								<RiLayoutGridFill size={35} className={'p-1'} />
							</button>
							<button
								onClick={() => setLayout({ state: LAYOUT_STATES.LIST })}
								className={
									layout.state === LAYOUT_STATES.LIST
										? 'laptop:flex flex-row items-center text-black rounded-r-xl transition duration-200 bg-[#D9D9D9] p-2 w-[50%]'
										: 'laptop:flex flex-row items-center text-black rounded-r-xl transition duration-500  p-2 bg-[#ECECEC] w-[50%]'
								}
							>
								<FaList size={35} className={'p-1'} />
							</button>
						</div> */}
             <div className="flex flex-row items-center justify-center border-[#30403F] border-[1px] rounded-[40px] w-[15%] h-[40%] py-2 px-3 space-x-2">
						<div className="text-[10px]">Ascending</div>
						<button
							onClick={() => setSortBy({ state: SORT_BY_STATES.RETAIL_PRICE })}
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
         

				</div>
				{layout.state === LAYOUT_STATES.GRID ? (
					<div className="laptop:grid grid-cols-3 grid-rows-1 gap-y-14 place-items-center gap-x-1 mb-10 pt-10">
						{response.map((el) => (
							<Card cardObject={el} />
						))}
					</div>
				) : (
					<div className="laptop:grid grid-cols-1 grid-rows-3 gap-y-14 place-items-center gap-x-1 mb-10 pt-10">
						{response.map((el) => (
							<Card cardObject={el} />
						))}
					</div>
				)}
			</main>

			{/* <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer> */}
		</div>
	);
};

export default Markets;
