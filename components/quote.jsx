import React, { useEffect } from 'react';
import { useState } from 'react';

export const Quote = () => {
	const [currentQuote, setCurrentQuote] = useState(0);
	const [orderBookAbi, setOrderBookAbi] = useState();

	const grabData = async () => {
		axios
			.all([requestOrderBook])
			.then(
				axios.spread((...responses) => {
					setOrderBookAbi(responses[0].data);
				})
			)
			.catch((errors) => {
				console.log(errors);
			});
	};

	const quote = async () => {
		// e.preventDefault();
		// const data = new FormData(e.target);
		// console.log(data.get("contractNumber"));
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send('eth_requestAccounts', []);
			const signer = provider.getSigner();
			const orderBook = new ethers.Contract(
				market1OrderBook,
				orderBookAbi,
				signer
			);
			signedContract = orderBook.connect(signer);
			setSignedContract(signedContract);
			const quote = await orderBook.quoteExactAmountOut(
				market1Add,
				BigNumber.from('500'),
				BigNumber.from('1000000000000000000')
			);
			setCurrentQuote(quote[0].toString());

			console.log(quote[0].toNumber());
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		grabData();
	}, []);

	return (
		<div className="flex flex-col justify-start border-[1px] border-[#0C1615]  rounded-[10px] text-black mb-4">
			<div className="bg-[#ACFF00]  rounded-t-[10px] border-b-[1px] p-2  w-[100%]  border-[#0C1615]" />
			<div className="bg-white p-4 text-left w-[100%] border-[#0C1615] rounded-[10px]">
				<flex className="flex flex-rows justify-center items-center space-x-1">
					<div className="col-span-2 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 rounded-b-xl space-x-4">
						Price : {currentQuote}
						<Tooltip
							title="Price is dynamic and will adjust in response to buys/sells in the market. Buy price will always show the lowest asking price in the orderbook."
							arrow
						>
							<InfoIcon sx={{ fontSize: '18px' }} />
						</Tooltip>
						<button
							onClick={quote}
							className="bg-black text-white p-3 text-[12px] rounded-2xl hover:opacity-60"
						>
							Update Quote
						</button>
					</div>
				</flex>
			</div>
		</div>
	);
};
