import type { NextPage } from 'next';
import { Nav } from '../../../components/nav';
// import { Card } from '../components/card'
import { WagerCard } from '../../../components/wagerCard';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { Footer } from '../../../components/footer';
import {PreMarketActionCard } from '../../../components/PreMarketActionCard'
import {ethers} from "ethers";

import {Jackpot} from '../../../components/quote';

declare var window: any;

const PreMarket: NextPage = (cardObject) => {
	const router = useRouter();

	const { sku } = router.query;


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

const OrderBookGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/OrderBookFactory20.json'
const OrderBookAddressGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/deployments.json'


const requestOrderBookAbi = axios.get(OrderBookGit);
const requestOrderBookAddress = axios.get(OrderBookAddressGit);

const tokenAddress = "0x9B2BC1c778051870767bE3d8b8d6b714Fc0E4967"
const market1Add = "0x44A5cE34F2997091De32F1eC7f552c3FC175869d"

const [OrderBookAbi, setOrderBookAbi] = useState([] as any);
  const [OrderBookAddress, setOrderBookAddress] = useState("" as any);


  axios.all([requestOrderBookAbi, requestOrderBookAddress]).then(axios.spread((...responses) => {
    const OrderBookInfo = responses[0].data;
    setOrderBookAbi(OrderBookInfo);
    const OrderBookAddress = responses[1].data[4].OrderBookFactory20.address;
  setOrderBookAddress(OrderBookAddress);

   })).catch(errors => {
    console.log(errors)
  })



  const createNewBook = async (e:any) => {

    e.preventDefault();
    const data = new FormData(e.target);
    const Toke2 = data.get("Token2");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const OrderBookFactory = new ethers.Contract(OrderBookAddress, OrderBookAbi, signer);
    const NewBook = await OrderBookFactory.createBook(tokenAddress, Toke2, 100)
    await NewBook.wait(1)

   console.log(NewBook);

// const newMarket = await create.allMarkets(-1);

// alert(`market created at ${newMarket}!`)
  }

	useEffect(() => {
		if (!router.isReady) return;
		getSneaker();
		adminCheck();
	}, [router.isReady]);



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
						className="text-left text-[#748282] text-xs flex space-x-2 hover:opacity-60"
						onClick={() => router.back()}
					>
						<img className="" src="/slimArrowLeft.svg" width="16" height="16" />

						<p>GO BACK</p>
					</button>
          {admin === true ?
            <form onSubmit={createNewBook}  className='space-x-2 ml-4'>
<input
  className="desktop:w-1/3 py-4 pl-3  text-[12px] shadow-md rounded-lg appearance-none focus:ring focus:outline-none focus:ring-black"
  name="Token2"
  type="string"
  placeholder="Sneaker Contract Address"
/>

            <button type="submit" className='bg-black text-white rounded-lg py-3 px-2 mt-3'>Create New OrderBook</button>
            </form> : <></>}

					<div className="tablet:flex flex-row items-center tablet:space-x-4">
						<div className="flex-1">
							{response.map((el: any) => (
								<WagerCard cardObject={el} />
							))}
						</div>
						<div className="self-start mobile:mt-5 tablet:mt-[143px] sm-laptop:mt-[108px] laptop:mt-28">
							{/*       
          <button className={admin == true ? 'h-[100px] w-[100px] bg-[black]': 'h-[100px] w-[100px] bg-[red]' }></button>
			 */}            <Jackpot/>
							<PreMarketActionCard cardObject={sku} />

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

export default PreMarket;
