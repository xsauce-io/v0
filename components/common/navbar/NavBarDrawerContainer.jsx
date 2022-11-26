import React from 'react';
import { useRouter } from 'next/router';
import { Drawer, Box } from '@mui/material';
import { useState } from 'react';
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';
import { useWeb3React } from '@web3-react/core';
import { SelectWalletModal } from './SelectWalletModal';
import { CopyAddressButton } from './CopyAddressButton'
import { theme } from '@chakra-ui/react';

export const NavBarDrawerContainer = ({ themeObject }) => {

	// ----------------------------------------------------
	// ----------------------  Constants -------------------
	// ----------------------------------------------------

	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};


	const defaultChainId = 5 //goerli

	const SauceTokenAddress = '0x12d9dda76a85E503A9eBc0b265Ef51e4aa90CD7D';


	// ----------------------------------------------------
	// ----------------------  States ---------------------
	// ----------------------------------------------------
	const { width } = useWindowDimensions();
	const { library, active, chainId, account, deactivate } = useWeb3React();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const router = useRouter();
	const [toggle, setToggle] = useState();
	const [current, setCurrent] = useState();
	const [isSelectWalletOpen, setIsSelectWalletOpen] = useState(false);

	// ----------------------------------------------------
	// ----------------------Function------------------------
	// ----------------------------------------------------

	const onSelectWalletClose = () => {
		setIsSelectWalletOpen(false);
	};

	const handleDisconnect = () => {
		deactivate();
	};

	const switchNetwork = async () => {

		try {
			await library.provider.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: `0x${defaultChainId}` }]
			})
		} catch (error) {
			if (error.code === 4902) {
				try {
					let id = ethers.utils.hexValue(41);
					await window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [
							networks.goerli
						],
					});
				} catch (addError) {
					console.error(addError);
				}
			}
		}
	}

	const faucet = async () => {
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			let requestor = (
				await provider.send('eth_requestAccounts', [0])
			).toString();
			const signer = provider.getSigner();
			const SauceToken = new ethers.Contract(
				SauceTokenAddress,
				SauceTokenABI,
				signer
			);
			await SauceToken.sendSauce(requestor);

			const tokenSymbol = '$';
			const tokenImage = 'https://i.postimg.cc/15tqGBct/emblem.jpg';

			//TO FIX: this try catch does not work

			const wasAdded = await ethereum.request({
				method: 'wallet_watchAsset',
				params: {
					type: 'ERC20',
					options: {
						address: SauceTokenAddress, // The address that the token is at.
						symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
						decimals: 18, // The number of decimals in the token
						image: tokenImage, // A string url of the token logo
					},
				},
			});
			if (wasAdded) {
				mixpanelTrackProps('Get Test Tokens', {
					token: 'Xsauce',
					result: 'completed',
				});
			} else {
				mixpanelTrackProps('Get TestTokens', {
					token: 'Xsauce',
					result: 'cancelled',
				});
			}
		} catch (error) {
			console.log(error);
			mixpanelTrackProps('Get Test Tokens', {
				token: 'Xsauce',
				result: 'failed',
			});
		}
	};

	return (
		<>
			{width < screens.smlaptop ? (
				<div className="basis-1/3 flex justify-end">
					<button
						className="mobile:block p-2 tablet:p-5 text-white bg-[inherit] rounded hover:text-[#ACFF00]/75 transition"
						onClick={() => setIsDrawerOpen(true)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-5 h-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke={themeObject.drawerIconColor ? themeObject.drawerIconColor : '#FFFFFF'}
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			) : (
				<></>
			)}
			<Drawer
				PaperProps={{ backgroundColor: '#000' }}
				anchor="right"
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
			>
				<Box
					p={4}
					width="280px"
					textAlign="left"
					role="presentation"
					backgroundColor="#fff"
					sx={{ height: '100%' }}
				>
					<div className="flex flex-col basis-1/3 justify-end items-center space-x-4 font-Inter">
						{!active ? (
							<>
								<button
									className={`text-[14px] flex flex-row justify-center font-Inter items-center mt-4 bg-[#0C1615] text-white rounded-[40px] py-2  w-[175px] w-full hover:opacity-60`}
									onClick={() => {
										setIsSelectWalletOpen(true);
									}}
								>
									Connect
								</button>
							</>
						) : (chainId == defaultChainId) ?
							<div className='flex flex-col space-y-4 justify-center items-center'>
								<div className={`text-[14px] flex flex-row justify-center font-Inter items-center mt-4 bg-[#0C1615] text-white rounded-[40px] py-2  w-[175px] w-full hover:opacity-60`}
								>
									<img className="h-[10px] w-[10px]" src="/goerli-eth-icon-png.png" />
									<span className="text-[14px] px-2">Goerli</span>
								</div>

								<CopyAddressButton account={account} themeObject={themeObject} />

								<div className="dropdown">
									<label
										tabindex="0"
										className={`text-[14px] text-black`}
									>
										<div className={`text-[14px] flex flex-row justify-center font-Inter items-center bg-[#0C1615] text-white rounded-[40px] py-2  w-[175px] w-full hover:opacity-60`}>
											<svg
												width="20"
												height="20"
												viewBox="0 0 32 32"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>

												<path
													d="M22 17C22.5523 17 23 16.5523 23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16C21 16.5523 21.4477 17 22 17Z"
													fill="#fff"
												/>
												<path
													d="M16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17Z"
													fill="#fff"
												/>
												<path
													d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44771 15 9 15.4477 9 16C9 16.5523 9.44771 17 10 17Z"
													fill="#fff"
												/>
											</svg>
										</div>
									</label>
									<ul
										tabindex="0"
										className={`menu dropdown-content bg-[#0C1615] text-white p-1 shadow rounded-box w-[175px] z-10 mt-1`}
									>
										<li>
											<button
												className={`active:bg-[#ACFF00] bg-[#0C1615] text-white text-left`}
												onClick={() => {
													faucet();
													mixpanelTrackProps('Get Test Tokens', {
														token: '$auce',
													});
												}}
											>
												<img className="h-[15px] w-[12px]" src="/xsauce-icon-svg.svg" />
												Get Test Tokens
											</button>
										</li>
										<li>
											<a
												className={`active:bg-[#ACFF00] bg-[#0C1615] text-white flex flex-row justify-start items-center`}
												target="blank"
												href="https://goerli-faucet.pk910.de/"
												onClick={() =>
													mixpanelTrackProps('Get Test Tokens', {
														token: 'ETHGoerli',
													})
												}
											>
												<img className="h-[15px] w-[12px]" src="/goerli-eth-icon-png.png" />
												Get Test ETH(Goerli)
											</a>
										</li>
									</ul>
								</div>
							</div>
							: (
								<div className='flex flex-col space-y-4 justify-center items-center'>
									<button
										className={`text-[14px] flex flex-row justify-center font-Inter items-center  text-black bg-[yellow] rounded-[40px] space-x-2 py-2  w-[175px] hover:opacity-60`}
										onClick={() => switchNetwork()}
									>
										Switch Network
									</button>
									<CopyAddressButton account={account} themeObject={themeObject} />
								</div>

							)}
					</div>


					<SelectWalletModal
						isOpen={isSelectWalletOpen}
						closeModal={onSelectWalletClose}
					/>

				</Box>
			</Drawer>

		</>
	);
};
