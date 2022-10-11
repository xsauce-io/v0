import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { ethers, BigNumber, utils } from 'ethers';
import { ExpandImageModal } from './expandImageModal';
import {
	$tableAddress,
	Mockaddress,
	OrderBookAddressGit,
	OrderBookGit,
	OrderBookFactoryGit,
} from '../services/constants';
import { useRouter } from 'next/router';
import { useGetMarketBySku } from '../services/useRequests';
// import AspectRatio from '@mui/joy/AspectRatio';

export const WagerCard = ({ cardObject }) => {
	const router = useRouter();
	const { sku } = router.query;

	const [orderBookFactoryAbi, setOrderBookFactoryAbi] = useState();
	const [orderBookAddress, setOrderBookAddress] = useState();
	const [orderBookFactoryAddress, setOrderBookFactoryAddress] = useState();

	const [isLoaded, Loading] = useState(false);
	const [currentMarket, setCurrentMarket] = useState();
	const [expiration, setExpiration] = useState();

	const explorer =
		'https://goerli.etherscan.io/address/' + currentMarket?.address;

	const grabData = async () => {
		const requestOrderBook = axios.get(OrderBookGit);
		const requestOrderBookFactoryAbi = axios.get(OrderBookFactoryGit);
		const requestOrderBookAddress = axios.get(OrderBookAddressGit);
		axios
			.all([
				requestOrderBook,
				requestOrderBookAddress,
				requestOrderBookFactoryAbi,
			])
			.then(
				axios.spread((...responses) => {
					setOrderBookAbi(responses[0].data);

					setOrderBookAddress(responses[1].data[4].OrderBook20.address);
					// TODO fetch object based on chainID now is only Rinkeby
					setOrderBookFactoryAddress(
						responses[1].data[4].OrderBookFactory20.address
					);
					setOrderBookFactoryAbi(responses[2].data);

					Loading(true);
				})
			)
			.catch((errors) => {
				console.log(errors);
			});
	};

	const tokenAddress = '0x9B2BC1c778051870767bE3d8b8d6b714Fc0E4967';
	const market1Add = '0x44A5cE34F2997091De32F1eC7f552c3FC175869d';

	const market1OrderBook = '0xbB311A5025bF1f5900Bf70e9a69cE961BD09d371';

	const getBookInfo = async (e) => {
		e.preventDefault();
		// const data = new FormData(e.target);
		// const Toke2 = data.get("Token2");
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send('eth_requestAccounts', []);
		const signer = provider.getSigner();
		const OrderBookFactory = new ethers.Contract(
			orderBookFactoryAddress,
			orderBookFactoryAbi,
			signer
		);
		const NewBook = await OrderBookFactory.getBook(
			tokenAddress,
			market1Add,
			100
		);

		console.log(NewBook);

		// const newMarket = await create.allMarkets(-1);

		// alert(`market created at ${newMarket}!`)
	};

	useEffect(() => {
		const loader = async () => {
			await grabData();
			getMarketbySku();
		};
		loader();
	}, []);

	const getMarketbySku = () => {
		const req = axios.get(
			'https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json'
		);
		req.then((res) => {
			const test = res.data[3][cardObject.sku];
			setCurrentMarket(test);
			const expires = new Date(test?.expiration * 1000).toLocaleDateString(
				'en-US'
			);
			setExpiration(expires);
			console.log({ testing: test });
		});
	};

	return (
		<React.Fragment>
			<div className=" ">
				{cardObject === undefined ? (
					<React.Fragment>
						<Skeleton variant="text" />
						<Skeleton variant="text" />
						<Skeleton variant="rectangular" className={'h-[257px]'} />
					</React.Fragment>
				) : (
					<React.Fragment>
						<div className="text-3xl py-4 text-left mb-10 text-[#0C1615]">
							{' '}
							{cardObject.name}
						</div>

						<grid className="bg-white w-full grid  text-[#0C1615] grid-rows-[repeat(16, minmax(0, 1fr))]  grid-cols-2 flex justify-center rounded-xl border-[1px] border-[#0C1615]">
							<div className="col-span-2 row-span-6 flex justify-center relative ">
								<div className="w-[70%] py-4 relative">
									{cardObject.image?.original === '' ||
									cardObject.image?.original ===
										'https://image.goat.com/placeholders/product_templates/original/missing.png' ? (
										<img
											className="object-cover mobile:h-[100%]  tablet:h-[80%]] laptop:h-[80%] w-[80%] m-auto desktop:h-[85%] w-[100%] rounded-lg"
											src="/hurache.svg"
										/>
									) : (
										<>
											<img
												src={cardObject.image?.original}
												className="object-cover mobile:h-[100%]  tablet:h-[80%]] laptop: w-[80%] m-auto desktop:h-[100%] w-[100%] rounded-lg "
											/>
										</>
									)}
								</div>
								<div
									className="mr-0 absolute right-3 bottom-3"
									hidden={
										cardObject.image?.original === '' ||
										cardObject.image?.original ===
											'https://image.goat.com/placeholders/product_templates/original/missing.png'
									}
								>
									<ExpandImageModal shoeImage={cardObject.image?.original} />
								</div>
							</div>
							<div className="col-span-2 row-span-6 text-left border-t-[1px] border-[#0C1615] px-6 py-10">
								<p className="text-xl font-medium font-SG py-4">
									Product Description
								</p>
								{cardObject.story}
							</div>

							<div className="col-span-1 row-span-3 border-t-[1px] border-[#0C1615] text-left px-6 py-3 border-r-[1px]">
								<p className="py-2">Shoe information</p>
								<p className="text-xs"> Release Date</p>
								<p>{cardObject.releaseDate}</p>
							</div>
							<div className="col-span-1 row-span-3 border-t-[1px] border-[#0C1615] text-left px-6 py-3 ">
								<p className="py-2">Market information</p>
								<p className="text-xs"> Release Date</p>
								<p>10-23-2022</p>
							</div>
							<div className="col-span-1 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 border-r-[1px]">
								<p className="text-xs"> Sku </p>
								<p>{cardObject.sku}</p>
							</div>
              <div className="col-span-1 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 ">
								<p className="text-xs"> Closes </p>
								<p>{expiration}</p>
							</div>
							<div className="col-span-1 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 border-r-[1px]">
								<p className="text-xs"> Retail price </p>
								<p>${cardObject.retailPrice}</p>
							</div>
							<div className="col-span-1 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 ">
								<p className="text-xs"> Estimated resell price</p>
								<p>${cardObject.estimatedMarketValue}</p>
							</div>
							<div className="col-span-2 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 ">
								<p className="text-xs"> Wager </p>
								<p>
									{' '}
									Resell Price {'>'} ${currentMarket?.prediction}
								</p>
							</div>
						
							<div className="col-span-2 row-span-2 border-t-[1px] rounded-bl-xl rounded-br-xl border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 ">
								<p className="text-xs"> Contract</p>

								<a
									className="flex flex-row space-x-[2px] truncate"
									target="blank"
									rel="noreferrer"
									href={explorer}
									onClick={() =>
										mixpanelTrackProps('View Contract', {
											address: currentMarket?.address,
										})
									}
								>
									<p className="underline"> {currentMarket?.address}</p>
								</a>
							</div>
						</grid>

						{/* <div className="mobile:flex flex-col text-center desktop:bg-white text-black rounded-lg px-16 py-6 ">
              <div className="mobile:flex flex-col laptop:flex flex-row items-center justify-center">
                <div className="mobile:flex flex-col items-center desktop:pt-6 space-y-4">
                  <h3 className="font-bold font-SG mobile:text-center laptop:text-[35px] desktop:text-[24px]">
                    {cardObject.name}
                  </h3>
                  <p className="font-normal font-Inter mobile:text-center laptop:text-[25px] desktop:text-[20px]">
                    ID:{cardObject.sku}
                  </p>
                  <h3 className="font-Inter mobile:text-[18px] font-medium">
                    Wager: Resell Price {">"} $400<br></br> Closes:
                    09.05.2022 12:00 PM EST
                  </h3>
                  <h3 className="font-Inter mobile:text-[25px] font-medium flex flex-row justify-center">
                    Price : {currentQuote}
                    <Tooltip
                      title="Price is dynamic and will adjust in response to buys/sells in the market. Buy price will always show the lowest asking price in the orderbook."
                      arrow
                    >
                      <InfoIcon sx={{ fontSize: "18px" }} />
                    </Tooltip>
                    <button onClick={quote} className="bg-black text-white p-3 text-[12px]">Update Quote</button>
                  </h3>
                </div>
                <img
                  src={cardObject.image?.original}
                  className="object-cover mobile:h-[200px] mb-4 tablet:h-[250px] laptop:h-[200px] m-0 desktop:h-[250px] w-[330px] rounded-lg"
                />
              </div>
            </div> */}
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	);
};
