import type { NextPage } from 'next';
import { Nav } from '../../../components/nav';
// import { Card } from '../components/card'
import { PredictToggle } from '../../../components/predictionToggle';
import { Announcement } from '../../../components/announcement';
import { WagerCard } from '../../../components/wagerCard';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { BigNumber, ethers, utils } from 'ethers';
import { Layout } from '../../../components/layout';
import { ActionCard } from '../../../components/actionCard';
import { Header } from '../../../components/header';
import { ContentHeader } from '../../../components/contentHeader';
import { Footer } from '../../../components/footer';

declare var window: any;

const LiveMarket: NextPage = (cardObject) => {
	const router = useRouter();

	const { sku } = router.query;

	console.log(sku);

	const skuUrl =
		'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=' +
		sku;

	const options = {
		method: 'GET',
		url: skuUrl,
	};

	const [response, setResponse] = useState([] as any);
	const [admin, setAdmin] = useState(false);

	// fetch sneaker data
	const getSneaker = async () => {
		axios
			.request(options)
			.then(function (response) {
				const array: any[] = response.data.results;
				setResponse(array);
				console.log(response.data.results);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	const adminCheck = async () => {
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
	};

	useEffect(() => {
		if (!router.isReady) return;
		getSneaker();
		adminCheck();
	}, [router.isReady]);

	useEffect(() => {
		adminCheck();
	}, []);

	return (
		<div className="bg-[#EFF1F3]">
			<Head>
				<title>Xsauce</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				className={`laptop:px-40 w-full items-center justify-center text-black bg-[#EFF1F3]`}
				style={{
					backgroundColor: '#0C1615',
					color: 'white',
					borderColor: '#0C1615',
				}}
			>
				{/* <Announcement /> */}
				<Nav logoColor="#ACFF00" />
			</div>
			<main className="flex w-full laptop:px-60 flex-1 flex-col text-center pb-40 mt-20 ">
				<ContentHeader title={'Sneaker Name'}></ContentHeader>
				<h1>{admin}</h1>

				<div className="laptop:flex flex-col">
					<div className=" laptop:flex flex-row items-center  laptop:space-x-[1px]">
						<div className="flex-1">
							{response.map((el: any) => (
								<WagerCard cardObject={el} />
							))}
						</div>
						<div className="mobile:flex flex-col space-y-6  items-center pt-2 ">
							{/*       
          <button className={admin == true ? 'h-[100px] w-[100px] bg-[black]': 'h-[100px] w-[100px] bg-[red]' }></button>
			 */}
							<ActionCard />
						</div>
					</div>
				</div>
			</main>

			<div className="laptop:px-40 w-full items-center justify-center">
				<Footer />
			</div>
		</div>
	);
};

export default LiveMarket;
