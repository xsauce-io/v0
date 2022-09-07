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

const Redeem: NextPage = () => {
	let [isLoading, setisLoading] = useState(true as boolean);
	let [marketResponse1, setMarketResponse1] = useState([] as any);
	let [marketResponse2, setMarketResponse2] = useState([] as any);
	let [marketResponse3, setMarketResponse3] = useState([] as any);
	let [toggled, setisToggled] = useState('1' as string);

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

	const handleChange = (event: any) => {
		if (event.target.value === '1') {
			setisToggled('1');
		} else if (event.target.value === '2') {
			setisToggled('2');
		} else if (event.target.value === '3') {
			setisToggled('3');
		}
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
				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<Layout headerTitle={'Redeem Positions'}>
				<main className="flex w-full items-center justify-center flex-col h-[calc(100%-85px)]">
					<ContentHeader title={'Cash Out'} />
					<form className="flex w-full h-full items-center justify-center flex-col space-y-5">
						<div className="flex w-full items-center justify-center flex-col">
							<label
								className="font-SG text-[25px] pb-3 pt-3"
								htmlFor="markets"
							>
								Choose a market:
							</label>
							<select
								className="bg-[#F1F1F1] shadow-black shadow-md mobile:w-3/4 font-SG text-[15px] mb-3 p-4 rounded focus:outline-none laptop:w-[390px] font-SG text-[15px] mb-3 rounded focus:outline-none"
								onChange={handleChange}
								id="markets"
								name="markets"
							>
								<option value="1">Nike Air Max 1 Patta Denim</option>
								<option value="2">
									Jordan 1 Retro High Homage to Home Chicago (Numbered)
								</option>
								<option value="3">Nike Air Max 90 OFF-White Desert Ore</option>
							</select>
						</div>
						{toggled === '1' ? (
							<div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:items-center">
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
									) : (
										marketResponse1.map((el: any) => <Card cardObject={el} />)
									)}
								</div>
							</div>
						) : toggled == '2' ? (
							<div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:">
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
									) : (
										marketResponse2.map((el: any) => <Card cardObject={el} />)
									)}
								</div>
							</div>
						) : (
							<div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:">
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
									) : (
										marketResponse3.map((el: any) => <Card cardObject={el} />)
									)}
								</div>
							</div>
						)}
						<button
							id="redeem"
							className="h-[3rem] w-[8rem] text-[15px] px-4 text-white bg-black rounded shadow-md hover:bg-white transition duration-300 hover:text-black"
							type="submit"
						>
							Redeem{' '}
						</button>
					</form>
				</main>
			</Layout>
		</div>
	);
};

export default Redeem;
