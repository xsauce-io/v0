import type { NextPage } from 'next';
import { Nav } from '../../../components/nav';
// import { Card } from '../components/card'
import { WagerCard } from '../../../components/wagerCard';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { BigNumber, ethers, utils } from 'ethers';
import { Xchange } from '../../../components/xchange';
import { ActionCard } from '../../../components/actionCard';
import { Header } from '../../../components/header';
import { Footer } from '../../../components/footer';
import { useGetSneaker } from '../../../services/useRequests';
import BookFactoryABI from '../../../abi/bookFactory.json';
import {
	$tableAddress,
	OrderBookAddressGit,
} from '../../../services/constants';

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
				<title>Xsauce</title>
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

					<div className="tablet:flex flex-row items-center tablet:space-x-4">
						<div className="flex-1">
							<WagerCard cardObject={data} />
						</div>
						<div className="mobile:mt-5 tablet:mt-[143px] sm-laptop:mt-[108px] laptop:mt-40 space-y-4">
							<ActionCard />
							<Xchange cardObject={response} />
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
