import type { NextPage } from 'next';
import { Nav } from '../../../components/layout/nav';
// import { Card } from '../components/card'
import { TreeMap } from '../../../components/markets[title]/treemap';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { BigNumber, ethers, utils } from 'ethers';

import { Footer } from '../../../components/layout/footer';

import { Linegraph } from '../../../components/markets[title]/linegraph';
import { MintTab } from '../../../components/markets[title]/marketTabs/mint'
import { WithdrawTab } from '../../../components/markets[title]/marketTabs/withdraw'
import { StakeTab } from '../../../components/markets[title]/marketTabs/stake'
import { UnstakeTab } from '../../../components/markets[title]/marketTabs/unstake'
import { SwitchTab } from '../../../components/markets[title]/marketTabs/switch'

declare var window: any;

const LiveMarket: NextPage = () => {
	const router = useRouter();
	const mkt = router.query;
	const mktTitl = mkt.marketTitle;

	console.log(mktTitl)

	// const { data, error } = useGetSneaker(sku);

	// const [response, setResponse] = useState(data);
	const [admin, setAdmin] = useState(false);
	const [Tab, setTab] = useState(0);

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

	// useEffect(() => {
	// 	setResponse(data);
	// }, [data]);

	useEffect(() => {
		if (!router.isReady) return;
		adminCheck();
	}, [router.isReady]);

	// if (!data || error) {
	// 	return <div>loading</div>;
	// }
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
				<Nav logoColor="#FFFFFF" />
			</div>
			<main className="flex w-full mobile:px-5 laptop:px-40 flex-1 flex-col text-center mb-40 mt-10 ">
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
					<div className='flex flex-col flex-col laptop:flex-row mt-6 text-[#0C1615]'>
						<div className="flex flex-col space-y-4 laptop:flex-row laptop:w-full laptop:space-x-4 laptop:space-y-0 pb-4">
							<div className='bg-white rounded-lg font-SG p-6 laptop:w-fit'>
								<div className='flex flex-row  rounded-lg pt-3 px-3 '>
									<ul className='flex flex-row flex-wrap justify-center items-center'>
										<button onClick={() => setTab(0)} className={Tab === 0 ? 'w-fit text-black px-3 py-3 rounded-tl-lg rounded-tr-lg text-md font-medium mr-2 bg-[#ACFF00] ' : 'w-fit text-black bg-[#DCDEE1] px-3 py-3 rounded-tl-lg rounded-tr-lg text-md font-medium mr-2 hover:bg-[#ACFF00] hover:text-black'}> Mint</button>
										<button onClick={() => setTab(1)} className={Tab === 1 ? 'w-fit text-black px-3 py-3 rounded-tl-lg rounded-tr-lg text-md font-medium mr-2 bg-[#ACFF00] ' : 'w-fit text-black bg-[#DCDEE1] px-3 py-3 rounded-tl-lg rounded-tr-lg text-md font-medium mr-2 hover:bg-[#ACFF00] hover:text-black '}> Withdraw</button>
										<button onClick={() => setTab(2)} className={Tab === 2 ? 'w-fit text-black px-3 py-3 rounded-tl-lg rounded-tr-lg text-md font-medium mr-2 bg-[#ACFF00]  ' : 'w-fit text-black bg-[#DCDEE1]  px-3 py-3 rounded-tl-lg rounded-tr-lg text-md font-medium mr-2 hover:bg-[#ACFF00] hover:text-black'}> Stake</button>
										<button onClick={() => setTab(3)} className={Tab === 3 ? 'w-fit text-black px-3 py-3 rounded-tl-lg rounded-tr-lg text-md font-medium mr-2 bg-[#ACFF00] ' : 'w-fit text-black bg-[#DCDEE1]  px-3 py-3 rounded-tl-lg rounded-tr-lg text-md font-medium mr-2 hover:bg-[#ACFF00] hover:text-black'}> Unstake</button>
										<button onClick={() => setTab(4)} className={Tab === 4 ? 'w-fit text-black px-3 py-3 rounded-tl-lg rounded-tr-lg text-md font-medium mr-2 bg-[#ACFF00] ' : 'w-fit text-black bg-[#DCDEE1]  px-3 py-3 rounded-tl-lg rounded-tr-lg text-md font-medium mr-2 hover:bg-[#ACFF00] hover:text-black'}> Switch</button>
									</ul>
								</div>
								<div className='w-full h-fit border-2 rounded-md p-4'>
								{Tab === 0 ? <MintTab market={mktTitl} /> : Tab === 1 ? <WithdrawTab market={mktTitl} /> : Tab === 2 ? <StakeTab market={mktTitl} /> : Tab === 3 ? <UnstakeTab market={mktTitl} /> : Tab === 4 ? <SwitchTab market={mktTitl} /> : <></>}
								</div>


							</div>

							<div className='flex flex-col bg-white rounded-lg font-SG p-2 w-full laptop:w-[60%] justify-center items-center text-[#0C1615]'>
								<h1>{mktTitl}Price</h1>
								<Linegraph />
							</div>


						</div>
					</div>
					<div className='flex flex-col space-y-4 laptop:flex-row laptop:space-y-0 laptop:space-x-4 text-[#0C1615]'>
						<div className='bg-white rounded-lg font-SG p-6 flex-1 flex-col justify-center items-center text-left '>
							<span className='font-bold laptop:text-2xl'>{mktTitl}</span>
							<p className='laptop:text-xl mt-5'>The Culture Index is a basket of the top 30 streetwear items represented by their resale value. This index was designed to give maximum diversity across streetwear</p>
						</div>
						<div className='w-full laptop:w-[60%]' >
						<TreeMap />
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
