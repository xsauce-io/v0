import React from 'react';
import { BigNumber, ethers } from 'ethers';
import erc1155abi from '../abi/erc1155.json';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';

export const WagerConfig = () => {
	const address = '0xb16a791282B604120E28e703C56D9Cb6E3C776b1';

	const handleTransfer = async (e) => {
		e.preventDefault();
		const hasConnectedWalletBefore = localStorage.getItem(
			'hasConnectedWalletBefore'
		);

		if (hasConnectedWalletBefore != null) {
			try {
				const data = new FormData(e.target);
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await provider.send('eth_requestAccounts', []);
				const signer = await provider.getSigner();
				const erc1155 = new ethers.Contract(address, erc1155abi, signer);
				await erc1155.mint(
					BigNumber.from(data.get('prediction')),
					BigNumber.from(data.get('contractNumber')),
					{
						value: ethers.utils.parseEther(
							(0.05 * BigNumber.from(data.get('contractNumber'))).toString()
						),
					}
				);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<React.Fragment>
			<form onSubmit={handleTransfer} className="flex flex-col space-y-3">
				<div className="relative">
					<label className="sr-only" for="amount">
						{' '}
						Amount Desired
					</label>

					<input
						className="mobile:w-full py-4 pl-3 pr-55 text-[12px] border-2 border-gray-200 rounded-lg appearance-none focus:ring focus:outline-none focus:ring-black"
						name="contractNumber"
						type="number"
						placeholder="Limit Price"
					/>
				</div>
				<div className="relative">
					<label className="sr-only" for="amount">
						{' '}
						Amount Desired
					</label>

					<input
						className="mobile:w-full py-4 pl-3 pr-55 text-[12px] border-2 border-gray-200 rounded-lg appearance-none focus:ring focus:outline-none focus:ring-black"
						name="contractNumber"
						type="number"
						placeholder="# of Contracts"
					/>
				</div>

				<button
					id="mint"
					className="mobile:py-3 m-20 outline text-black bg-[#D8E9BC] rounded-lg"
					type="submit"
				>
					Buy
				</button>
			</form>
		</React.Fragment>
	);
};
