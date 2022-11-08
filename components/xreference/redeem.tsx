import type { NextPage } from 'next';

import Head from 'next/head';
import React from 'react';
import { Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '../components/layout/layout';
import { ContentHeader } from '../components/layout/contentHeader';
import { RedeemCard } from '../components/redeem/redeemCard';
import { useGetSneaker } from '../services/useRequests';

const Redeem: NextPage = () => {
	let [isLoading, setisLoading] = useState(false as boolean);
	let [toggled, setisToggled] = useState('1');

	const { data: s1, error: e1 } = useGetSneaker('DH7138-006');
	const { data: s2, error: e2 } = useGetSneaker('DR8869-200');
	const { data: s3, error: e3 } = useGetSneaker('DR0501-101');
	const { data: s4, error: e4 } = useGetSneaker('DX2836-001');

	const loaded = () => {
		if (s1 !== undefined) {
			setisLoading(true);
		}
	};

	useEffect(() => {
		loaded();
	}, [s1]);

	return (
		<div>
			<Head>
				<title>Xsauce | Cash Out</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" type="favicon" href="/greenDrop.svg" />
			</Head>

			<Layout
				headerTitle={'Redeem Positions'}
				headerSubtitle={'MONEY WELL EARNED'}
				showFinancialOverview={false}
				showHowItWorksButton={true}
				logoColor={'#FFFFFF'}
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
									<p className="text-black truncate font-Inter">{s1?.name}</p>
								) : toggled === '2' ? (
									<p className="text-black truncate font-Inter">{s2?.name}</p>
								) : toggled === '3' ? (
									<p className="text-black truncate font-Inter">{s3?.name}</p>
								) : (
									<p className="text-black truncate font-Inter">{s4?.name}</p>
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
										{s1?.name}
									</text>
								</li>
								<li
									className="py-2 border-b-[1px] border-[#0C1615] font-Inter active:bg-[#ACFF00]"
									onClick={() => setisToggled('2')}
								>
									<text className="text-black font-Inter active:bg-[#ACFF00]">
										{s2?.name}
									</text>
								</li>
								<li
									className="py-2 border-b-[1px] border-[#0C1615] font-Inter active:bg-[#ACFF00]"
									onClick={() => setisToggled('3')}
								>
									<text className="text-black font-Inter active:bg-[#ACFF00]">
										{s3?.name}
									</text>
								</li>
								<li
									className="py-2 font-Inter active:bg-[#ACFF00]"
									onClick={() => setisToggled('4')}
								>
									<text className="text-black font-Inter active:bg-[#ACFF00]">
										{s4?.name}
									</text>
								</li>
							</ul>
						</div>
						<div className="mobile:full tablet:w-[60%] flex flex-col space-y-4 laptop:items-center">
							<div className="mobile:flex w-full flex-1 flex-col laptop:w-[390px]">
								{!isLoading ? (
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
									<RedeemCard cardObject={s1} />
								) : toggled == '2' ? (
									<RedeemCard cardObject={s2} />
								) : toggled == '3' ? (
									<RedeemCard cardObject={s3} />
								) : (
									<RedeemCard cardObject={s4} />
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
