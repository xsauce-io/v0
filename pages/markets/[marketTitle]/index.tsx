import type { NextPage } from 'next';
import { LayoutNavBar } from '../../../components/layout/LayoutNavBar';
// import { Card } from '../components/card'
import { MarketTreeMap } from '../../../components/markets[title]/MarketTreeMap';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { BigNumber, ethers, utils } from 'ethers';

import { LayoutFooter } from '../../../components/layout/LayoutFooter';

import { MarketLineGraph } from '../../../components/markets[title]/MarketLineGraph';
import { TabMint } from '../../../components/markets[title]/marketTabs/TabMint';
import { TabWithdraw } from '../../../components/markets[title]/marketTabs/TabWithdraw';
import { TabStake } from '../../../components/markets[title]/marketTabs/TabStake';
import { TabUnstake } from '../../../components/markets[title]/marketTabs/TabUnstake';
import { TabSwitch } from '../../../components/markets[title]/marketTabs/TabSwitch';

declare var window: any;

const MarketByTitle: NextPage = () => {
	const router = useRouter();
	const mkt = router.query;
	const mktTitl = mkt.marketTitle;

	console.log(mktTitl);

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
				<LayoutNavBar />
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

					<div className="flex flex-col flex-col laptop:flex-row mt-6 text-[#0C1615]">
						<div className="flex flex-col space-y-4 laptop:flex-row laptop:w-full laptop:space-x-4 laptop:space-y-0 pb-4">
							<div className="bg-white rounded-lg font-SG p-2 tablet:p-4 laptop:w-[40%] flex tablet:flex-col">
								<div className="flex flex-row  rounded-lg pt-3 px-0 tablet:px-3 ">
									<ul className="flex flex-col tablet:flex-row flex-wrap justify-start items-end space-y-2 tablet:space-y-0 tablet:justify-center tablet:items-end">
										<button
											onClick={() => setTab(0)}
											className={
												Tab === 0
													? 'w-fit text-black p-2 rounded-tl-lg rounded-bl-lg font-medium text-xs tablet:mr-1 tablet:px-3  tablet:py-3 tablet:rounded-tl-lg tablet:rounded-tr-lg tablet:rounded-bl-none tablet:text-base laptop:text-sm laptop:p-2 desktop:text-base desktop:p-2 bg-[#ACFF00]'
													: 'w-fit text-black bg-[#DCDEE1] p-2 rounded-tl-lg rounded-bl-lg font-medium text-xs tablet:mr-1  tablet:px-3  tablet:py-3 tablet:rounded-tl-lg tablet:rounded-tr-lg tablet:rounded-bl-none tablet:text-base laptop:text-sm laptop:p-2 desktop:text-base desktop:p-2 hover:bg-[#ACFF00] hover:text-black'
											}
										>

											Mint
										</button>
										<button
											onClick={() => setTab(1)}
											className={
												Tab === 1
													? 'w-fit text-black p-2 rounded-tl-lg rounded-bl-lg font-medium text-xs tablet:mr-1 tablet:px-3  tablet:py-3 tablet:rounded-tl-lg tablet:rounded-tr-lg tablet:rounded-bl-none tablet:text-base laptop:text-sm laptop:p-2 desktop:text-base desktop:p-2 bg-[#ACFF00]'
													: 'w-fit text-black bg-[#DCDEE1] p-2 rounded-tl-lg rounded-bl-lg font-medium text-xs tablet:mr-1  tablet:px-3  tablet:py-3 tablet:rounded-tl-lg tablet:rounded-tr-lg tablet:rounded-bl-none tablet:text-base laptop:text-sm laptop:p-2 desktop:text-base desktop:p-2 hover:bg-[#ACFF00] hover:text-black'
											}
										>

											Withdraw
										</button>
										<button
											onClick={() => setTab(2)}
											className={
												Tab === 2
													? 'w-fit text-black p-2 rounded-tl-lg rounded-bl-lg font-medium text-xs tablet:mr-1 tablet:px-3  tablet:py-3 tablet:rounded-tl-lg tablet:rounded-tr-lg tablet:rounded-bl-none tablet:text-base laptop:text-sm laptop:p-2 desktop:text-base desktop:p-2 bg-[#ACFF00]'
													: 'w-fit text-black bg-[#DCDEE1] p-2 rounded-tl-lg rounded-bl-lg font-medium text-xs tablet:mr-1  tablet:px-3  tablet:py-3 tablet:rounded-tl-lg tablet:rounded-tr-lg tablet:rounded-bl-none tablet:text-base laptop:text-sm laptop:p-2 desktop:text-base desktop:p-2 hover:bg-[#ACFF00] hover:text-black'
											}
										>

											Stake
										</button>
										<button
											onClick={() => setTab(3)}
											className={
												Tab === 3
													? 'w-fit text-black p-2 rounded-tl-lg rounded-bl-lg font-medium text-xs tablet:mr-1 tablet:px-3  tablet:py-3 tablet:rounded-tl-lg tablet:rounded-tr-lg tablet:rounded-bl-none tablet:text-base laptop:text-sm laptop:p-2 desktop:text-base desktop:p-2 bg-[#ACFF00]'
													: 'w-fit text-black bg-[#DCDEE1] p-2 rounded-tl-lg rounded-bl-lg font-medium text-xs tablet:mr-1  tablet:px-3  tablet:py-3 tablet:rounded-tl-lg tablet:rounded-tr-lg tablet:rounded-bl-none tablet:text-base laptop:text-sm laptop:p-2 desktop:text-base desktop:p-2 hover:bg-[#ACFF00] hover:text-black'
											}
										>

											Unstake
										</button>
										<button
											onClick={() => setTab(4)}
											className={
												Tab === 4
													? 'w-fit text-black p-2 rounded-tl-lg rounded-bl-lg font-medium text-xs tablet:mr-1 tablet:px-3  tablet:py-3 tablet:rounded-tl-lg tablet:rounded-tr-lg tablet:rounded-bl-none tablet:text-base laptop:text-sm laptop:p-2 desktop:text-base desktop:p-2 bg-[#ACFF00]'
													: 'w-fit text-black bg-[#DCDEE1] p-2 rounded-tl-lg rounded-bl-lg font-medium text-xs tablet:mr-1  tablet:px-3  tablet:py-3 tablet:rounded-tl-lg tablet:rounded-tr-lg tablet:rounded-bl-none tablet:text-base laptop:text-sm laptop:p-2 desktop:text-base desktop:p-2 hover:bg-[#ACFF00] hover:text-black'
											}
										>

											Switch
										</button>
									</ul>
								</div>
								<div className="w-full h-fit border-2 rounded-md p-4 flex-1">
									{Tab === 0 ? (
										<TabMint market={mktTitl} />
									) : Tab === 1 ? (
										<TabWithdraw market={mktTitl} />
									) : Tab === 2 ? (
										<TabStake market={mktTitl} />
									) : Tab === 3 ? (
										<TabUnstake market={mktTitl} />
									) : Tab === 4 ? (
										<TabSwitch market={mktTitl} />
									) : (
										<></>
									)}
								</div>
							</div>

							<div className="flex flex-col bg-white rounded-lg font-SG p-1 laptop:w-[60%]  justify-center items-center text-[#0C1615]">
								<h1>{mktTitl}Price</h1>
								<MarketLineGraph />
							</div>
						</div>
					</div>
					<div className="flex flex-col  space-y-4 laptop:flex-row laptop:space-y-0 laptop:space-x-4  text-[#0C1615] w-full">
						<div className="bg-white rounded-lg font-SG p-4 tablet:p-4 flex-1 flex-col justify-center items-center text-left laptop:w-[40%] w-full ">
							<span className="font-bold laptop:text-2xl">{mktTitl}</span>
							<p className="laptop:text-xl mt-5">
								The Culture Index is a basket of the top 30 streetwear items
								represented by their resale value. This index was designed to
								give maximum diversity across streetwear.
							</p>
						</div>
						<div className="w-full laptop:w-[60%] ">
							<MarketTreeMap />
						</div>
					</div>
				</div>
			</main>

			<div className="mobile:px-5 laptop:px-40 w-full items-center justify-center text-[#0C1615] ">
				<LayoutFooter />
			</div>
		</div>
	);
};

export default MarketByTitle;
