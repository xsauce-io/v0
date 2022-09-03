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
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { Tabs } from '../components/tabs';

const Home: NextPage = () => {
	let [premarketResponse, setAuctionResponse] = useState([] as any);
	let [marketResponse, setMarketResponse] = useState([] as any);
	let [isLoading, setIsLoading] = useState(true as boolean);
	let [toggled, setIsToggled] = useState(true as boolean);
	const [slider, setSlider] = React.useState<any | null>(null);

	// Settings for the slider

	const Settings = {
		dots: true,
		arrows: false,
		fade: true,
		infinite: true,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	// As we have used custom buttons, we need a reference variable to
	// change the state

	// These are the breakpoints which changes the position of the
	// buttons as the screen size changes
	// const top = useBreakpointValue({ base: '90%', md: '50%' });
	// const side = useBreakpointValue({ base: '30%', md: '40px' });

	// This list contains all the data for carousels
	// This can be static or loaded from a server
	const cards = [
		{
			link: '',
			image: 'Slide1.svg',
		},
		{
			link: 'https://linktr.ee/xsauceio',
			image: 'Slide2.svg',
		},
		{
			title: 'Design Projects 3',
			text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
			image:
				'https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
		},
	];

	// fetch sneaker data
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
					]);
					setMarketResponse([
						obj4.data.results[0],
						obj5.data.results[0],
						obj6.data.results[0],
					]);

					setIsLoading(false);

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
		<>
			<Head>
				<title>Xsauce</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Layout>
				<div className="flex flex-col  text-center font-SG">
					<Box
						position={'relative'}
						height={'1/3vh'}
						width={'100%'}
						overflow={'hidden'}
					>
						{/* CSS files for react-slick */}
						<link
							rel="stylesheet"
							type="text/css"
							charSet="UTF-8"
							href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
						/>
						<link
							rel="stylesheet"
							type="text/css"
							href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
						/>
						{/* Left Icon */}
						<IconButton
							aria-label="left-arrow"
							variant="ghost"
							position="absolute"
							left="1%"
							top="50%"
							transform={'translate(0%, -50%)'}
							zIndex={2}
							onClick={() => slider?.slickPrev()}
						>
							<BiLeftArrowAlt color="white" size="40px" />
						</IconButton>
						{/* Right Icon */}
						<IconButton
							aria-label="right-arrow"
							variant="ghost"
							position="absolute"
							right="1%"
							top="50%"
							transform={'translate(0%, -50%)'}
							zIndex={2}
							onClick={() => slider?.slickNext()}
						>
							<BiRightArrowAlt color="white" size="40px" />
						</IconButton>
						{/* Slider */}
						<Slider {...Settings} ref={(slider: any) => setSlider(slider)}>
							{cards.map((card, index) => (
								<Box
									key={index}
									height={'6xl'}
									position="relative"
									backgroundPosition="center"
									backgroundRepeat="no-repeat"
									backgroundSize="cover"
									backgroundImage={`url(${card.image})`}
								>
									{/* This is the block you need to change, to customize the caption */}
									<Link href={`${card.link}`}>
										<Container
											size="container.lg"
											height="400px"
											position="relative"
										>
											<Stack
												spacing={6}
												w={'full'}
												maxW={'lg'}
												position="absolute"
												left="15%"
												top="50%"
											>
												<Heading
													fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
												>
													{card.title}
												</Heading>
												<Text
													fontSize={{ base: 'md', lg: 'lg' }}
													color="GrayText"
												>
													{card.text}
												</Text>
											</Stack>
										</Container>
									</Link>
								</Box>
							))}
						</Slider>
					</Box>

					<div className="flex flex-row items-center pl-18 pb-8 pt-8">
						<div className="flex flex-row items-center justify-between w-[1300px] m-auto border-b-0">
							<div className="flex flex-row items-center space-x-4">
								<button
									onClick={() => setIsToggled(true)}
									className={
										toggled == true
											? 'laptop:flex flex-row items-center rounded-xl text-white transition duration-500 bg-[black] p-2'
											: 'laptop:flex flex-row items-center rounded-xl transition duration-500 p-2 text-black'
									}
								>
									<SportsScoreIcon />
									<h3 className="text-[17px] text-left font-normal font-Inter">
										Pre-Market
									</h3>
								</button>
								<button
									onClick={() => setIsToggled(false)}
									className={
										toggled == false
											? 'laptop:flex flex-row items-center text-white rounded-xl transition duration-200 bg-[black] p-2'
											: 'laptop:flex flex-row items-center text-black rounded-xl transition duration-500  p-2'
									}
								>
									<CasinoIcon />
									<h3 className="text-[17px] text-left font-normal font-Inter">
										Live Market
									</h3>
								</button>
							</div>
							<a
								href="/markets"
								className="rounded ml-8 text-black font-light text-[16px] hover:bg-gray px-4 underline underline-offset-2 font-Inter"
							>
								see all &#8594;
							</a>
						</div>
					</div>
					{toggled === true ? (
						<div className=" mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-[1300px] font-SG border-b-0 pb-12">
							<div className="mobile:flex w-full flex-1 flex-col laptop:grid grid-cols-3 grid-rows-1 gap-4 laptop:w-[1300px] ">
								{isLoading === true ? (
									<React.Fragment>
										<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3 ">
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '12px',
												}}
												width={400}
												height={300}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={400}
												height={30}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={300}
												height={30}
											/>
										</div>
										<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '12px',
												}}
												width={400}
												height={300}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={400}
												height={30}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={300}
												height={30}
											/>
										</div>
										<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '12px',
												}}
												width={400}
												height={300}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={400}
												height={30}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={300}
												height={30}
											/>
										</div>
									</React.Fragment>
								) : (
									premarketResponse.map((el: any) => (
										<CardPreMarket cardObject={el} />
									))
								)}
							</div>
						</div>
					) : (
						<div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-[1300px] pb-12">
							<div className="mobile:flex w-full flex-1 flex-col laptop:grid grid-cols-3 grid-rows-1 gap-4 laptop:w-[1300px]">
								{isLoading === true ? (
									<React.Fragment>
										<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '12px',
												}}
												width={400}
												height={300}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={400}
												height={30}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={300}
												height={30}
											/>
										</div>
										<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '12px',
												}}
												width={400}
												height={300}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={400}
												height={30}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={300}
												height={30}
											/>
										</div>
										<div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '12px',
												}}
												width={400}
												height={300}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={400}
												height={30}
											/>
											<Skeleton
												variant="rectangular"
												sx={{
													zIndex: '2',
													backgroundColor: 'gray',
													borderRadius: '8px',
												}}
												width={300}
												height={30}
											/>
										</div>
									</React.Fragment>
								) : (
									marketResponse.map((el: any) => <Card cardObject={el} />)
								)}
							</div>
						</div>
					)}
				</div>
			</Layout>

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
		</>
	);
};

export default Home;
