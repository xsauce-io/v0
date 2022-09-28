import type { NextPage } from 'next';
import { Nav } from '../components/nav';
import { Card } from '../components/cardWager';
import { Announcement } from '../components/announcement';
import Head from 'next/head';
import React from 'react';
import { Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '../components/layout';
import { ContentHeader } from '../components/contentHeader';
import { RedeemCard } from '../components/redeemCard';
import Script from 'next/script';

const Redeem: NextPage = () => {
	let [isLoading, setisLoading] = useState(true as boolean);
	let [marketResponse1, setMarketResponse1] = useState([] as any);
	let [marketResponse2, setMarketResponse2] = useState([] as any);
	let [marketResponse3, setMarketResponse3] = useState([] as any);
	let [toggled, setisToggled] = useState('1');

	const getSneaker2 = async () => {
		Promise.all([
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=394805-100'
			),
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=AR9880-023'
			),

			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=AA7293-200'
			),
		])

			.then(
				axios.spread((obj1, obj2, obj3) => {
					setMarketResponse1([obj1.data.results[0]]);
					setMarketResponse2([obj2.data.results[0]]);
					setMarketResponse3([obj3.data.results[0]]);

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
		<div>
			<Head>
				<title>Xsauce</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<Layout
				headerTitle={'Redeem Positions'}
				headerSubtitle={'MONEY WELL EARNED'}
				showFinancialOverview={false}
				showHowItWorksButton={true}
			>
				<main className="flex w-full items-center justify-center flex-col h-[calc(100%-85px)]">
					<form className="flex w-full h-full items-center justify-center flex-col space-y-5">
						<ContentHeader
							title={'Select Wager'}
							icon={<img className="" src="/candle.svg" />}
						/>
						<div className="mobile:w-full tablet:w-[60%] laptop:w-[35%] items-center justify-center flex-col dropdown laptop:dropdown-right mobile:dropdown-end ">
							<label
								tabIndex={0}
								className="text-xl flex flex-column justify-center text-center items-center border-[#0C1615] border-2 rounded-3xl p-2 text-sm px-8 bg-white space-x-5 hover:opacity-50"
							>
								{toggled === '1' ? (
									<p className="text-black truncate font-Inter">
										Nike Air Max 1 Patta Denim
									</p>
								) : toggled === '2' ? (
									<p className="text-black truncate font-Inter">
										Jordan 1 Retro High Homage to Home Chicago (Numbered)
									</p>
								) : (
									<p className="text-black truncate font-Inter">
										Nike Air Max 90 OFF-White Desert Ore
									</p>
								)}
								<img className="" src="/downArrow.svg" />
							</label>
							<ul
								tabIndex={0}
								className="menu dropdown-content bg-[#DCDEE1] p-4 shadow rounded-box w-full mt-4 z-10 text-lg"
							>
								<li
									className="py-2 border-b-[1px] border-[#0C1615]"
									onClick={() => setisToggled('1')}
								>
									<text className="text-black font-Inter active:bg-[#ACFF00]">
										Nike Air Max 1 Patta Denim
									</text>
								</li>
								<li
									className="py-2 border-b-[1px] border-[#0C1615] font-Inter active:bg-[#ACFF00]"
									onClick={() => setisToggled('2')}
								>
									<text className="text-black font-Inter active:bg-[#ACFF00]">
										Jordan 1 Retro High Homage to Home Chicago (Numbered)
									</text>
								</li>
								<li
									className="py-2 font-Inter active:bg-[#ACFF00]"
									onClick={() => setisToggled('3')}
								>
									<text className="text-black font-Inter active:bg-[#ACFF00]">
										Nike Air Max 90 OFF-White Desert Ore
									</text>
								</li>
							</ul>
						</div>
						<div className="mobile:full tablet:w-[60%] flex flex-col space-y-4 laptop:items-center">
							<div className="mobile:flex w-full flex-1 flex-col laptop:w-[390px]">
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
									</React.Fragment>
								) : toggled == '1' ? (
									marketResponse1.map((el: any) => (
										<RedeemCard cardObject={el} />
									))
								) : toggled == '2' ? (
									marketResponse2.map((el: any) => (
										<RedeemCard cardObject={el} />
									))
								) : (
									marketResponse3.map((el: any) => (
										<RedeemCard cardObject={el} />
									))
								)}
							</div>
						</div>

						<button
							id="redeem"
							className="h-[4rem] w-[9rem] text-lg px-4 text-black bg-[#ACFF00] rounded shadow-md hover:bg-white transition duration-300 hover:text-black justify-self-center font-inter "
							type="submit"
							onClick={() => mixpanel.track('Redeem')}
						>
							Redeem
						</button>
					</form>
				</main>
			</Layout>
		</div>
	);
};

export default Redeem;
