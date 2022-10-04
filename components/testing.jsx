import { Nav } from '../components/nav';
import { Announcement } from '../components/announcement';
import Head from 'next/head';
import axios from 'axios';
import { ethers, BigNumber, utils } from 'ethers';
import oracle from '../abi/oracle.json';
import { useState, useEffect } from 'react';
import { WalletNotConnectedModal } from './walletNotConnectedModal';

const Tester = () => {
	let [feedSet, setFeed] = useState(false);
	const address = '0xF422d89B8900D0236aC2f8002Cecf0Fe6719f761';
	let bigData = 1;

	async function callAPI(sneak) {
		try {
			const response = await axios.get(
				`https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=${sneak}`
			);
			const price = response.data.results[0].estimatedMarketValue;
			bigData = BigNumber.from(price);
			return bigData;
		} catch (err) {
			/**
			 * If the request is rejected, then the catch method will be executed.
			 */
			console.log(err);
		}
	}

	//intialize Web3 with the Url of our environment as a variable
	const go = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send('eth_requestAccounts', []);
		const signer = provider.getSigner();
		const check = new ethers.Contract(address, oracle, signer);

		if (feedSet == false) {
			check.on('NewJob', async (sku, jobId) => {
				await callAPI(sku);
				check.updateSneak(bigData, jobId);
				setFeed(true);
			});
		} else {
			go();
		}
	};

	useEffect(() => {
		go();
		console.log('working');
	}, []);

	//  while(true){
	//   //initialize a contract listener for emmisions of the "NewJob" event, see web3.js for docs
	//

	return (
		//#F5DEB3 - Vanilla
		//#E5E5E5 - Gray

		<div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#E5E5E5]">
			<Head>
				<title>Xsauce</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex w-full flex-1 flex-col text-center">
				<Announcement />
				<Nav />
			</main>
		</div>
	);
};

export default Tester;
