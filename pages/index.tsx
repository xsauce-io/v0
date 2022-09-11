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
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=B75571'
			),
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=AO4606-001'
			),

			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DR9654-100'
			),
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DV2122-400'
			),
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=HP7870'
			),
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DH7138-006'
			),
		])

			.then(
				axios.spread((obj1, obj2, obj3, obj4, obj5, obj6) => {
					setAuctionResponse([
						obj1.data.results[0],
						obj2.data.results[0],
						obj3.data.results[0],
						obj4.data.results[0],
						obj5.data.results[0],
						obj6.data.results[0],
					]);

					setisLoading(false);

					console.log({ obj1 });
					console.log({ obj2 });
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
							<h5 className="text-sm">Filter on</h5>
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="text-[14px] flex flex-row justify-center  text-center items-center border-[#0C1615] border-2 rounded-3xl p-2 text-sm px-5 bg-white space-x-5 hover:opacity-50"
								>
									<img className="" src="/textBlock.svg" />
									<span className="text-black">Winning Positions</span>

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
										<button>Winnings Positions</button>
									</li>
									<li>
										<button>Total Price</button>
									</li>

									<li>
										<button>Returns</button>
									</li>
								</ul>
							</div>
							<button
								className="hover:scale-150"
								onClick={() => setIsAscending(!isAscending)}
							>
								{isAscending === true ? (
									<img className="" src="/upArrow.svg" />
								) : (
									<img className="" src="/downArrow.svg" />
								)}
							</button>
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
