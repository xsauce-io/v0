import type { NextPage } from 'next';
import { Nav } from '../components/nav';
import { Card } from '../components/cardWager';
import { Layout } from '../components/layout';
import { CardPreMarket } from '../components/cardPreMarket';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import React from 'react';
import CasinoIcon from '@mui/icons-material/Casino';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { Announcement } from '../components/announcement';
import {
	Box,
	IconButton,
	useBreakpointValue,
	Stack,
	Heading,
	Text,
	Container,
	Link,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { Tabs } from '../components/tabs';
import { Dashboard } from '../components/dashboard';
import { ContentHeader } from '../components/contentHeader';

const Home: NextPage = () => {
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

			<Layout headerSubtitle={'TOTAL BALANCE'} headerTitle={'$144,000.00'}>
				<>
					<ContentHeader
						title={'Positions'}
						icon={
							<svg
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.09332 17.6534H3.62665V25.5467H9.09332V17.6534Z"
									fill="#ACFF00"
									stroke="#0C1615"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M18.6533 10H13.3333V22.8267H18.6533V10Z"
									fill="#ACFF00"
									stroke="#0C1615"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M28.2933 6.38672H22.8267V18.9734H28.2933V6.38672Z"
									fill="#ACFF00"
									stroke="#0C1615"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M6.35992 17.6534V13.1467"
									stroke="#0C1615"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M15.9866 9.38673V4.88007"
									stroke="#0C1615"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M25.56 6.29173V3.70673"
									stroke="#0C1615"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M6.35992 28.3601V25.5467"
									stroke="#0C1615"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M16 25.6401V23.3334"
									stroke="#0C1615"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M25.56 22.8134V18.9734"
									stroke="#0C1615"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						}
					>
						<div className="border-[#0C1615] bg-[#DCDEE1] border-2 rounded-[80px] flex items-center p-2 px-5 space-x-3 z-10">
							<h5 className="text-sm">Filter on</h5>
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="text-[14px] flex flex-row justify-center  text-center items-center border-[#0C1615] border-2 rounded-3xl p-2 text-sm px-5 bg-white space-x-5 hover:opacity-50"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M4 6L12 6"
											stroke="#0C1615"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M10.6666 8L5.33329 8"
											stroke="#0C1615"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M6.66671 10L9.33337 10"
											stroke="#0C1615"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
									<span className="text-black">Winning Positions</span>

									{/* {sortBy.state === SORT_BY_STATES.RETAIL_PRICE ? (
										<span className="text-black ">Retail Price</span>
									) : sortBy.state === SORT_BY_STATES.RELEASE_DATE ? (
										<span className="text-black">Release Date</span>
									) : (
										<span className="text-black ">Name</span>
									)} */}
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M10.6666 6.66666L7.8382 9.49508L5.00977 6.66666"
											stroke="#0C1615"
											stroke-width="1.2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
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
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M10.6666 6.66666L7.8382 9.49508L5.00977 6.66666"
											stroke="#0C1615"
											stroke-width="1.2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								) : (
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M5.33337 9.33331L8.1618 6.50489L10.9902 9.33331"
											stroke="#0C1615"
											stroke-width="1.2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								)}
							</button>
						</div>
					</ContentHeader>
					<div className="flex flex-col w-full">
						<div className="flex flex-row py-4 text-[14px] font-Inter items-center w-full">
							<div className="flex flex-row pl-4 w-[30%] space-x-2">
								<p>Positions</p>
								<img className="w-[3.4%]" src="up-down.svg" />
							</div>

							<div className="flex flex-row w-[18.5%] space-x-2">
								<p>Shares</p>
								<img className="w-[5%]" src="up-down.svg" />
							</div>

							<div className="flex flex-row w-[21.5%] space-x-2">
								<p>Total price</p>
								<img className="w-[4.4%]" src="up-down.svg" />
							</div>

							<div className="flex flex-row w-[20%] space-x-2">
								<p>Return</p>
								<img className="w-[4.8%]" src="up-down.svg" />
							</div>

							<div className="flex flex-row w-[11%]  space-x-2">
								<p>Contracts</p>
								<img className="w-[10%]" src="up-down.svg" />
							</div>
						</div>
						{premarketResponse.map((el: []) => (
							<Dashboard positions={el} />
						))}
					</div>
				</>
			</Layout>
		</div>
		// let [premarketResponse, setAuctionResponse] = useState([] as any);
		// let [marketResponse, setMarketResponse] = useState([] as any);
		// let [isLoading, setisLoading] = useState(true as boolean);
		// let [toggled, setisToggled] = useState(true as boolean);
		// const [slider, setSlider] = React.useState<any | null>(null);

		// // Settings for the slider

		// const Settings = {
		// 	dots: true,
		// 	arrows: false,
		// 	fade: true,
		// 	infinite: true,
		// 	autoplay: true,
		// 	speed: 500,
		// 	autoplaySpeed: 5000,
		// 	slidesToShow: 1,
		// 	slidesToScroll: 1,
		// };

		// // As we have used custom buttons, we need a reference variable to
		// // change the state

		// // This list contains all the data for carousels
		// // This can be static or loaded from a server
		// const cards = [
		// 	{
		// 		link: '',
		// 		image: 'Slide1.svg',
		// 	},
		// 	{
		// 		link: 'https://linktr.ee/xsauceio',
		// 		image: 'Slide2.svg',
		// 	},
		// 	{
		// 		title: 'Design Projects 3',
		// 		text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
		// 		image:
		// 			'https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
		// 	},
		// ];

		// // fetch sneaker data
		// const getSneaker2 = async () => {
		// 	Promise.all([
		// 		axios.get(
		// 			'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=B75571'
		// 		),
		// 		axios.get(
		// 			'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=AO4606-001'
		// 		),

		// 		axios.get(
		// 			'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DR9654-100'
		// 		),
		// 		axios.get(
		// 			'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DV2122-400'
		// 		),
		// 		axios.get(
		// 			'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=HP7870'
		// 		),
		// 		axios.get(
		// 			'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DH7138-006'
		// 		),
		// 	])

		// 		.then(
		// 			axios.spread((obj1, obj2, obj3, obj4, obj5, obj6) => {
		// 				setAuctionResponse([
		// 					obj1.data.results[0],
		// 					obj2.data.results[0],
		// 					obj3.data.results[0],
		// 				]);
		// 				setMarketResponse([
		// 					obj4.data.results[0],
		// 					obj5.data.results[0],
		// 					obj6.data.results[0],
		// 				]);

		// 				setisLoading(false);

		// 				console.log({ obj1 });
		// 				console.log({ obj2 });
		// 			})
		// 		)
		// 		.catch(function (error) {
		// 			console.error(error);
		// 		});
		// };

		// useEffect(() => {
		// 	getSneaker2();
		// }, []);

		// return (
		// 	//#F5DEB3 - Vanilla
		// 	//#E5E5E5 - Gray
		// 	<div>
		// 		<Head>
		// 			<title>Xsauce</title>
		// 			<link rel="preconnect" href="https://fonts.googleapis.com" />
		// 			<link rel="preconnect" href="https://fonts.gstatic.com" />
		// 			<link
		// 				href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
		// 				rel="stylesheet"
		// 			/>
		// 		</Head>

		// 		<Layout>
		// 			<main>
		// 				<div className=" mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-full font-SG border-b-0 pb-12">
		// 					<div className="mobile:flex w-full flex-1 flex-col laptop:grid grid-cols-4 grid-rows-1 gap-2 laptop:w-full ">
		// 						{isLoading === true ? (
		// 							<React.Fragment>
		// 								<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3 ">
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '12px',
		// 										}}
		// 										width={400}
		// 										height={300}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={400}
		// 										height={30}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={300}
		// 										height={30}
		// 									/>
		// 								</div>
		// 								<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '12px',
		// 										}}
		// 										width={400}
		// 										height={300}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={400}
		// 										height={30}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={300}
		// 										height={30}
		// 									/>
		// 								</div>
		// 								<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '12px',
		// 										}}
		// 										width={400}
		// 										height={300}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={400}
		// 										height={30}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={300}
		// 										height={30}
		// 									/>
		// 								</div>
		// 							</React.Fragment>
		// 						) : (
		// 							premarketResponse.map((el: any) => <Card cardObject={el} />)
		// 						)}
		// 					</div>
		// 				</div>

		// 				<div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-full pb-12">
		// 					<div className="mobile:flex w-full flex-1 flex-col laptop:grid grid-cols-3 grid-rows-1 gap-4 laptop:w-full">
		// 						{isLoading === true ? (
		// 							<React.Fragment>
		// 								<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '12px',
		// 										}}
		// 										width={400}
		// 										height={300}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={400}
		// 										height={30}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={300}
		// 										height={30}
		// 									/>
		// 								</div>
		// 								<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '12px',
		// 										}}
		// 										width={400}
		// 										height={300}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={400}
		// 										height={30}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={300}
		// 										height={30}
		// 									/>
		// 								</div>
		// 								<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '12px',
		// 										}}
		// 										width={400}
		// 										height={300}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={400}
		// 										height={30}
		// 									/>
		// 									<Skeleton
		// 										variant="rectangular"
		// 										sx={{
		// 											zIndex: '2',
		// 											backgroundColor: 'gray',
		// 											borderRadius: '8px',
		// 										}}
		// 										width={300}
		// 										height={30}
		// 									/>
		// 								</div>
		// 							</React.Fragment>
		// 						) : (
		// 							marketResponse.map((el: any) => <Card cardObject={el} />)
		// 						)}
		// 					</div>
		// 				</div>
		// 			</main>
		// 		</Layout>
		// 	</div>
		// );
	);
};

export default Home;
