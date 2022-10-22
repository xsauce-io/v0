import type { NextPage } from 'next';
import { Nav } from '../../../components/nav';
import { WagerCard } from '../../../components/livemarket[sku]/wagerCard';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { BigNumber, ethers, utils } from 'ethers';

import { Footer } from '../../../components/footer';
import { useGetSneaker } from '../../../services/useRequests';

import { FreePlayGraph } from '../../../components/freePlayGraph';

declare var window: any;

const LiveMarket: NextPage = () => {
	const router = useRouter();
	const { sku } = router.query;

	const { data, error } = useGetSneaker(sku);

	const [response, setResponse] = useState(data);
	const [admin, setAdmin] = useState(false);

	const adminCheck = async () => {
		const hasConnectedWalletBefore = localStorage.getItem(
			'hasConnectedWalletBefore'
		);

		if (hasConnectedWalletBefore != null) {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				// Prompt user for account connections
				let wallet = await provider.send('eth_requestAccounts', [0]);
				let accounts = wallet.toString();
				console.log(accounts);

				if (accounts == 0x50924f626d1ae4813e4a81e2c5589ec3882c13ca) {
					setAdmin(true);
				} else {
					setAdmin(false);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	// const createNewBook = async (e: any) => {
	// 	e.preventDefault();
	// 	const data = new FormData(e.target);
	// 	const Toke2 = data.get('Token2');
	// 	const provider = new ethers.providers.Web3Provider(window.ethereum);
	// 	await provider.send('eth_requestAccounts', []);
	// 	const signer = provider.getSigner();
	// 	const OrderBookFactory = new ethers.Contract(
	// 		OrderBookFactoryAddress,
	// 		OrderBookAbi,
	// 		signer
	// 	);
	// 	const NewBook = await OrderBookFactory.createBook(Token1, Toke2, 100);
	// 	await NewBook.wait(1);

	// 	console.log(NewBook);
	// };

	useEffect(() => {
		setResponse(data);
	}, [data]);

	useEffect(() => {
		if (!router.isReady) return;
		adminCheck();
	}, [router.isReady]);

	if (!data || error) {
		return <div>loading</div>;
	}

	return (
		<div className="bg-[#EFF1F3]">
			<Head>
				<title>Xsauce | Culture is Currency</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<div
				className={`mobile:px-5 laptop:px-40 w-full items-center justify-center text-black bg-[#EFF1F3]`}
				style={{
					backgroundColor: '#0C1615',
					color: 'white',
					borderColor: '#0C1615',
				}}
			>
				{/* <Announcement /> */}
				<Nav logoColor="#ACFF00" />
			</div>
			<main className="flex w-full mobile:px-5 laptop:px-48 flex-1 flex-col text-center pb-40 mt-16 ">
				<h1>{admin}</h1>

				<div className="flex flex-col ">
					<button
						className=" w-fit text-left text-[#748282] text-xs flex space-x-2 hover:opacity-60"
						onClick={() => router.back()}
					>
						<img className="" src="/slimArrowLeft.svg" width="16" height="16" />

						<p>GO BACK</p>
					</button>
					{/* {admin === true ? (
						<form  className="space-x-2 ml-4">
							<input
								className="desktop:w-1/3 py-4 pl-3  text-[12px] shadow-md rounded-lg appearance-none focus:ring focus:outline-none focus:ring-black"
								name="Token2"
								type="string"
								placeholder="Sneaker Contract Address"
							/>

							<button
								type="submit"
								className="bg-black text-white rounded-lg py-3 px-2 mt-3"
							>
								Create New OrderBook
							</button>
						</form>
					) : (
						<></>
					)} */}
					<div className='flex mobile:flex-col tablet:flex-col laptop:flex-row'>
						<div className="flex flex-col space-y-4 laptop:flex-row  laptop:space-x-4 laptop:space-y-0 pb-4">
							<div className='bg-white w-full laptop:w-full rounded-lg font-SG p-6 border-[1px] border-[#0C1615] '>
								<span className='flex flex-row justify-end'>
									<h1 className='w-fit text-right px-3 py-2 rounded text-xl font-medium bg-[#ACFF00] '> Pick of the Day</h1>
								</span>
								<img
									src={response?.image.original}
									className="object-cover w-[50%] laptop:w-[30%] m-auto h-auto rounded-lg "
								/>
								<div className='flex flex-col space-y-5'>
									<div className='flex-1'>
										What will the resell price of the <span className='font-bold'>{response?.name}</span> be on <span className='font-bold'>October 31st, 2022?</span>
									</div>
									<div className='flex flex-col flex-1 space-y-3 '>
										<div className="flex flex-row bg-white items-center py-4 px-6 text-left w-[100%] border-[1px] rounded-[80px] border-[#0C1615] focus:outline-2 focus:outline-offset-2 hover:outline-1">
											<p className="flex-1 text-left mobile:text-sm laptop:text-md pr-1">Prediction Price:</p>
											<input
												className="flex-1 text-right mobile:text-sm laptop:text-md mobile:w-[10%] appearance-none focus:none focus:outline-none"
												name="Amount"
												id="amount"
												type="number"
												placeholder="$375"
												// onChange={() => CalculateTotal()}
												required
											/>
										</div>

										<button
											type="submit"
											id="mint"
											className="w-full font-medium mb-6 text-xl py-4 text-white bg-[#0C1615] rounded-[80px] hover:opacity-60"
										>
											Submit
										</button>
										<div className='pt-5'>
											<h1 className='font-bold'>Current Resell Price:
												<span className='bg-[#ACFF00] py-2 px-3 rounded-full ml-2 text-sm font-normal'>${response?.estimatedMarketValue}</span>
											</h1>
										</div>
									</div>

								</div>
								<div className='bg-white rounded-lg font-SG p-6 flex-1 flex justify-center items-center '>

									<FreePlayGraph />
								</div>
							</div>



						</div>



					</div>
				</div>
			</main>

			<div className="mobile:px-5 laptop:px-40 w-full items-center justify-center text-[#0C1615] ">
				<Footer />
			</div>
		</div>
	);
};

export default LiveMarket;
