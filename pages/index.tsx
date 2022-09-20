import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { DashboardTable } from '../components/dashboardTable';

// Here we have used react-icons package for the icons
// And react-slick as our Carousel Lib

import { Dashboard } from '../components/dashboard';
import { ContentHeader } from '../components/contentHeader';

const Home: NextPage = () => {
	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};

	let [premarketResponse, setAuctionResponse] = useState([] as any);
	let [isLoading, setisLoading] = useState(true as boolean);
	let [toggled, setisToggled] = useState(true as boolean);
	const [isAscending, setIsAscending] = useState(true);

	const getSneaker2 = async () => {
		Promise.all([
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&brand=nike&silhouette=dunk'
			),
		])

			.then(
				axios.spread((obj1) => {
					setAuctionResponse([
						obj1.data.results[0],
						obj1.data.results[1],
						obj1.data.results[2],
						obj1.data.results[3],
						obj1.data.results[4],
						obj1.data.results[5],
					]);

					setisLoading(false);

					console.log({ obj1 });
				})
			)
			.catch(function (error) {
				console.error(error);
			});
	};

	useEffect(() => {
		getSneaker2();
	}, []);

	return (
		//#F5DEB3 - Vanilla
		//#E5E5E5 - Gray
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
					<ContentHeader title={'Positions'} icon={<img src="/pieChart.svg" />}>
						<div className="border-[#0C1615] bg-[#DCDEE1] border-2 rounded-[80px] flex items-center p-2 px-5 space-x-3 z-10">
							<h5 className="text-sm font-Inter font-medium">Filter on</h5>
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="text-[14px] flex flex-row justify-center  text-center items-center border-[#0C1615] border-2 rounded-3xl p-2 text-sm px-5 bg-white space-x-5 hover:opacity-50"
								>
									<img className="" src="/textBlock.svg" />
									<span className="text-black font-Inter">
										Winning Positions
									</span>

									{/* {sortBy.state === SORT_BY_STATES.RETAIL_PRICE ? (
										<span className="text-black ">Retail Price</span>
									) : sortBy.state === SORT_BY_STATES.RELEASE_DATE ? (
										<span className="text-black">Release Date</span>
									) : (
										<span className="text-black ">Name</span>
									)} */}
									<img className="" src="/downArrow.svg" />
								</label>
								<ul
									tabIndex={0}
									className="menu dropdown-content bg-[#DCDEE1] p-2 shadow rounded-box w-52 mt-4"
								>
									<li>
										<button className="text-black font-Inter active:bg-[#ACFF00]">
											Winnings Positions
										</button>
									</li>
									<li>
										<button className="text-black font-Inter active:bg-[#ACFF00]">
											Total Price
										</button>
									</li>

									<li>
										<button className="text-black font-Inter active:bg-[#ACFF00]">
											Returns
										</button>
									</li>
								</ul>
							</div>
							{/* <button
								className="hover:scale-150"
								onClick={() => setIsAscending(!isAscending)}
							>
								{isAscending === true ? (
									<img className="" src="/upArrow.svg" />
								) : (
									<img className="" src="/downArrow.svg" />
								)}
							</button> */}
						</div>
					</ContentHeader>
					<DashboardTable>
						{premarketResponse.map((el: []) => (
							<Dashboard positions={el} />
						))}
					</DashboardTable>
				</>
			</Layout>
		</div>
	);
};

export default Home;
