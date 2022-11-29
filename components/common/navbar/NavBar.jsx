import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { ethers, utils } from 'ethers';
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';
import { NavBarDrawerContainer } from './DrawerContainer';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { SelectWalletModal } from './SelectWalletModal';
import { networks } from '/utils/networks.js';
import { CopyAddressButton } from '/components/common/navbar/CopyAddressButton'
import { NavBarTheme, THEME_TYPE} from './navbar.theme.js';


export const NavBar = ({themeType, padding}) => {
	// ----------------------------------------------------
	// ----------  Variables and Constants ----------------
	// ----------------------------------------------------
	let theme = themeType === THEME_TYPE.dark ? NavBarTheme.dark : NavBarTheme.light;

	const defaultChainId = 5 //goerli

	const SauceTokenAddress = '0x12d9dda76a85E503A9eBc0b265Ef51e4aa90CD7D';

	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};

	// ----------------------------------------------------
	// ----------------------  States ------------------------
	// ----------------------------------------------------
	const { width } = useWindowDimensions();
	const router = useRouter();
	const { library, active, chainId, account, deactivate } = useWeb3React();
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
			let requestor = (
				await library.provider.send('eth_requestAccounts', [0])
			).toString();
			const signer = library.provider.getSigner();
			const SauceToken = new ethers.Contract(
				SauceTokenAddress,
				SauceTokenABI,
				signer
			);
			await SauceToken.sendSauce(requestor);

			const tokenSymbol = '$';
			const tokenImage = 'https://i.postimg.cc/15tqGBct/emblem.jpg';

			//TO FIX: this try catch does not work

			const wasAdded = await library.provider.request({
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
	// ----------------------------------------------------
	// ---------------------- Use Effect ------------------
	// ----------------------------------------------------

	useEffect(() => {
		// Dismiss all active toasts on page change
		toast.remove();
	}, [router.events]);

	// ----------------------------------------------------
	// ---------------------- Render ----------------------
	// ----------------------------------------------------

	return (
		<header className="sticky top-0 z-20 ">
			<div
				className={`flex items-center h-20 ${theme.twBgColor} w-full gap-8 ${padding ? 'mobile:px-5 laptop:px-40' : ''}`}
			>
				<div className="basis-1/3">
					<a className="block" href="/">
						<span className="sr-only">navbar</span>
						<div className="mobile:text-[12px] tablet:text-[14px] h-20 flex flex-row items-center">
							<svg
								width="42"
								height="38"
								viewBox="0 0 42 38"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M29.501 23.2074L40.4906 32.8571C42.8185 34.9069 42.4876 37.9996 39.2617 37.9996H33.1878C32.2307 37.9996 31.3089 37.652 30.6354 37.0167L22.2454 29.213C21.8319 28.8294 21.1583 28.8294 20.7447 29.213L12.2957 37.0167C11.6221 37.64 10.7122 37.9876 9.75507 37.9876H3.58669C0.384333 37.9876 -1.21094 34.4154 1.08153 32.3536L11.3385 23.1115C12.0003 22.5121 11.9884 21.5291 11.3149 20.9538L1.9087 12.8743C-0.478294 10.8485 1.09334 7.19238 4.34297 7.19238H9.9205C10.854 7.19238 11.7521 7.52803 12.4139 8.12739L20.7329 15.5715L29.501 23.2074Z"
									fill={theme.logoColor}
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M25.0014 11.8361C25.0005 11.8902 25 11.9448 25 12L25.0068 12C25.1753 15.7255 28.4671 18.7 32.5 18.7C36.5376 18.7 39.8323 15.7187 39.9938 11.9871L40 11.9871C40 11.9328 39.9996 11.8791 39.9988 11.8258C39.9996 11.784 40 11.742 40 11.7H39.9962C39.9168 8.75634 38.6098 7.40441 36.9633 5.70147C35.7001 4.39492 34.2372 2.88175 32.9757 0.284562C32.7932 -0.103367 32.2198 -0.0904358 32.0374 0.297493C30.798 2.96578 29.3006 4.53646 28.0062 5.8942C26.3913 7.58821 25.0924 8.95074 25.0047 11.7H25C25 11.7455 25.0005 11.7908 25.0014 11.8361Z"
									fill={theme.logoColor}
								/>
							</svg>
						</div>
					</a>
				</div>

				<div className="flex flex-row justify-center basis-1/3"></div>

				{width >= screens.smlaptop ? (
					<div className="flex flex-row basis-1/3 justify-end items-center space-x-4 font-Inter">
						{!active ? (
							<>
								<button
									className={`text-[14px] flex flex-row justify-center font-Inter items-center ${theme.twButtonColor} ${theme.twTextColor} rounded-[40px] space-x-2 py-2  w-[175px] hover:opacity-60`}
									onClick={() => {
										setIsSelectWalletOpen(true);
									}}
								>
									Connect
								</button>
							</>
						) : (chainId == defaultChainId) ?
							<>
								<div className={`flex flex-row flex-1 justify-center  font-Inter items-center ${theme.twButtonColor} ${theme.twTextColor} rounded-[40px] py-2 `}>
									<img className="h-[15px] w-[10px]" src="/goerli-eth-icon-png.png" />
									<span className="text-[14px] px-2">Goerli</span>
								</div>

								<CopyAddressButton account={account} themeType={themeType} />

								<div className="dropdown dropdown-end">
									<label
										tabindex="0"
										className={`text-lg ${theme.twTextColor}`}
									>
										<div className="w-[37px]">
											<svg
												width="32"
												height="32"
												viewBox="0 0 32 32"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<circle
													cx="16"
													cy="16"
													r="16"
													fill={theme.menuButtonColor}
												/>
												<path
													d="M22 17C22.5523 17 23 16.5523 23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16C21 16.5523 21.4477 17 22 17Z"
													fill={theme.iconTextColor}
												/>
												<path
													d="M16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17Z"
													fill={theme.iconTextColor}
												/>
												<path
													d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44771 15 9 15.4477 9 16C9 16.5523 9.44771 17 10 17Z"
													fill={theme.iconTextColor}
												/>
											</svg>
										</div>
									</label>
									<ul
										tabindex="0"
										className={`menu dropdown-content ${theme.twButtonColor} ${theme.twTextColor} p-2 shadow rounded-box w-[250px] mt-4 z-10`}
									>
										<li>
												<button
												className={`active:bg-[#ACFF00] ${theme.twTextColor}`}

												onClick={() => {
													faucet();
													mixpanelTrackProps('Get Test Tokens', {
														token: '$auce',
													});
												}}
											>
												<img className="h-[10%] w-[10%]" src="/xsauce-icon-svg.svg" />
												Get Test Tokens
											</button>
										</li>
										<li>
											<a
												className={`active:bg-[#ACFF00] ${theme.twTextColor}`}
												target="blank"
												href="https://goerli-faucet.pk910.de/"
												onClick={() =>
													mixpanelTrackProps('Get Test Tokens', {
														token: 'ETHGoerli',
													})
												}
											>
												<img className="h-[7%] w-[7%]" src="/goerli-eth-icon-png.png" />
												Get Test ETH(Goerli)
											</a>
										</li>
									</ul>
								</div>
							</>
							: (
								<>
									<button
										className={`text-[14px] flex flex-row justify-center  font-Inter items-center ${theme.twButtonColor} ${theme.twTextColor} bg-[yellow] rounded-[40px] space-x-2 py-2  w-[175px] hover:opacity-60`}
										onClick={() => switchNetwork()}
									>
										Switch Network
									</button>
									<CopyAddressButton account={account} themeType={themeType} />
								</>

							)}
					</div>
				) : (
					<></>
				)}
				<NavBarDrawerContainer themeType={themeType} />
			</div>
			<SelectWalletModal
				isOpen={isSelectWalletOpen}
				closeModal={onSelectWalletClose}
			/>
		</header>
	);
};
