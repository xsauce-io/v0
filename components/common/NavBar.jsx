import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { ethers, utils } from 'ethers';
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';
import { NavBarDrawerContainer } from './NavBarDrawerContainer';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { ToastNotificationActionBar } from './ToastActionBar';
import { useWeb3React } from '@web3-react/core';
import { truncateText } from '/utils/truncate.js'
import { SelectWalletModal } from '/components/common/SelectWalletModal';
import {networks} from '/utils/networks.js'

export const NAVBAR_THEME = {
	light: 'light',
	dark: 'dark',
};

export const NavBar = ({ padding, theme }) => {
	// ----------------------------------------------------
	// ----------  Variables and Constants ----------------
	// ----------------------------------------------------
	let themeObject;

	const defaultChainId = 5 //goerli

	const SauceTokenAddress = '0x12d9dda76a85E503A9eBc0b265Ef51e4aa90CD7D';

	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};

	//theme setting
	//TODO: export these themes
	if (theme === NAVBAR_THEME.dark) {
		themeObject = {
			name: 'darkTheme',
			logoColor: '#fff',
			textColor: 'text-[#0C1615]',
			buttonColor: 'bg-white',
			menuButtonColor: 'white',
			bgColor: 'bg-[#0C1615]',
			iconTextColor: '#0C1615',
			drawerIconColor: '#fff',
			drawerIconAsText: '#fff',
			drawerButtonColor: 'bg-[#0C1615]',
			drawerTextColor: 'text-[#fff]',
			drawerBackgroundColor: '#0C1615',
		};
	} else if (theme == NAVBAR_THEME.light) {
		themeObject = {
			name: 'lightTheme',
			logoColor: '#0C1615',
			textColor: 'text-white',
			buttonColor: 'bg-[#0C1615]',
			menuButtonColor: '#0C1615',
			bgColor: 'bg-white',
			iconTextColor: '#fff',
			drawerIconColor: '#000',
			drawerIconAsText: '#000',
			drawerButtonColor: 'bg-[#fff]',
			drawerTextColor: 'text-[#0C1615]',
			drawerBackgroundColor: '#fff',
		};
	} else {
		themeObject = {
			name: 'darkTheme',
			logoColor: '#fff',
			textColor: 'text-[#0C1615]',
			buttonColor: 'bg-white',
			menuButtonColor: 'white',
			bgColor: 'bg-[#0C1615]',
			iconTextColor: '#0C1615',
			drawerIconColor: '#fff',
			drawerIconAsText: '#fff',
			drawerButtonColor: 'bg-[#0C1615]',
			drawerTextColor: 'text-[#fff]',
			drawerBackgroundColor: '#0C1615',
		};
	}

	// ----------------------------------------------------
	// ----------------------  States ------------------------
	// ----------------------------------------------------
	const { width } = useWindowDimensions();
	const router = useRouter();
	const [toggle, setToggle] = useState();
	const [current, setCurrent] = useState();
	const [isCopied, setIsCopied] = useState(false);
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

	const getWallet = async (clicked = false) => {
		const hasConnectedWalletBefore = localStorage.getItem(
			'hasConnectedWalletBefore'
		);

		if (hasConnectedWalletBefore != null || clicked === true) {
			try {
				if (hasConnectedWalletBefore != null || clicked === true) {
					if (localStorage.getItem('network') === 'arbitrum') {
						setToggle(421613);
					}

					if (localStorage.getItem('network') === 'mumbai') {
						setToggle(80001);
					}

					if (localStorage.getItem('network') === 'telos') {
						setToggle(41);
					}

					if (localStorage.getItem('network') === 'unknown') {
						setToggle(null);
					}

					const provider = new ethers.providers.Web3Provider(window.ethereum);
					const network = await provider.getNetwork();
					const chainId = network.chainId;
					if (chainId !== 421613 || chainId !== 80001 || chainId !== 41) {
						localStorage.setItem('network', 'unknown');
					}
					setCurrent(chainId);
					chains(chainId);

					let wallet = await provider.send('eth_requestAccounts', [0]);
					accounts = wallet.toString();
					setFullLengthAccount(wallet.toString());
					let truncateAccountName =
						accounts.substring(0, 4) + '...' + accounts.slice(-4);
					setAccount(truncateAccountName);

					if (wallet) {
						localStorage.setItem('hasConnectedWalletBefore', '1');

						mixpanelTrackProps('Connect Wallet', {
							result: 'successful',
							automaticConnection: !clicked,
							chainId: chainId,
						});
					}
				} else {
					throw Error('Not Connected');
				}
				//setOpenWalletNotConnectedModal(false);
			} catch (error) {
				//No toasts shall display on index
				if (error.code == -32002) {
					if (!clicked) {
						// toast.custom(
						// 	(t) => (
						// 		<ToastNotificationActionBar
						// 			message={'Your wallet is not connected'}
						// 			subMessage={
						// 				'To see market statistics, connect your Metamask wallet and refresh the page.'
						// 			}
						// 			icon={<img src="/alertTriangle.svg" />}
						// 			t={t}
						// 			href="https://geekflare.com/finance/beginners-guide-to-metamask/"
						// 		/>
						// 	),
						// 	{ duration: Infinity }
						// );
						console.log('error wallet not connected', error);
					} else if (error) {
						// toast.custom(
						// 	(t) => (
						// 		<ToastNotificationActionBar
						// 			message={
						// 				'Your Metamask wallet is currently busy with another request'
						// 			}
						// 			subMessage={
						// 				'Open your Metamask to manage your current requests and refresh the page.'
						// 			}
						// 			icon={<img src="/alertCircle.svg" />}
						// 			t={t}
						// 			href="https://geekflare.com/finance/beginners-guide-to-metamask/"
						// 		/>
						// 	),
						// 	{ duration: Infinity }
						// );
					}
				}
				mixpanelTrackProps('Connect Wallet', {
					result: 'unsuccessful',
					automaticConnection: !clicked,
					//chainId: chainId,
				});
			}
		} else {
			toast.custom(
				(t) => (
					<ToastNotificationActionBar
						message={'Your wallet is not connected'}
						subMessage={
							"Click the 'Connect Wallet' button in the menu and refresh the page."
						}
						icon={<img src="/alertTriangle.svg" />}
						t={t}
						href="https://geekflare.com/finance/beginners-guide-to-metamask/"
					/>
				),
				{ duration: Infinity }
			);
		}
	};

	const copyAddressToClipboard = async () => {
		await navigator.clipboard
			.writeText(account.toString())
			.then(setIsCopied(true));
		navigator.clipboard.readText();
		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	const setState = (NetworkIndex) => {
		setToggle(NetworkIndex);
		chains(NetworkIndex);
		console.log({ setState: NetworkIndex });
	};

	const chains = async (NetworkIndex) => {
		if (NetworkIndex === 421613) {
			try {
				let id = ethers.utils.hexValue(421613);
				// check if the chain to connect to is installed
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: id }], // chainId must be in hexadecimal numbers
				});
				setCurrent(NetworkIndex);
				localStorage.setItem('network', 'arbitrum');
			} catch (error) {
				// This error code indicates that the chain has not been added to MetaMask
				// if it is not, then install it into the user MetaMask
				if (error.code === 4001) {
					setToggle(current);
					console.log({ catch: current });
				}

				if (error.code === 4902) {
					try {
						let id = ethers.utils.hexValue(421613);
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{
									chainName: 'Arbitrum Nitro Rollup Testnet',
									chainId: id,
									rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
									blockExplorerUrls: [
										'https://goerli-rollup-explorer.arbitrum.io/',
									],
									nativeCurrency: {
										name: 'Ethereum',
										symbol: 'ETH',
										decimals: 18,
									},
								},
							],
						});
					} catch (addError) {
						console.error(addError);
					}
				}
				console.error(error);
			}
		} else if (NetworkIndex === 80001) {
			try {
				let id = ethers.utils.hexValue(80001);
				// check if the chain to connect to is installed
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: id }], // chainId must be in hexadecimal numbers
				});
				setCurrent(NetworkIndex);
				localStorage.setItem('network', 'mumbai');
			} catch (error) {
				if (error.code === 4001) {
					setToggle(current);
					console.log({ catch: current });
				}

				// This error code indicates that the chain has not been added to MetaMask
				// if it is not, then install it into the user MetaMask
				if (error.code === 4902) {
					try {
						let id = ethers.utils.hexValue(80001);
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{
									chainName: 'Mumbai Testnet',
									chainId: id,
									rpcUrls: ['https://rpc-mumbai.matic.today/'],
									blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
									nativeCurrency: {
										name: 'Matic',
										symbol: 'MATIC',
										decimals: 18,
									},
								},
							],
						});
					} catch (addError) {
						console.error(addError);
					}
				}
				console.error(error);
			}
		} else if (NetworkIndex === 41) {
			//  {  if (localStorage.getItem('network') === 'N/A') {return localStorage.setItem('network','telos')}
			//  else {
			//     if (window.ethereum) {
			try {
				let id = ethers.utils.hexValue(41);
				// check if the chain to connect to is installed
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: id }], // chainId must be in hexadecimal numbers
				});
				setCurrent(NetworkIndex);
				localStorage.setItem('network', 'telos');
			} catch (error) {
				if (error.code === 4001) {
					setToggle(current);
					console.log({ catch: current });
				}
				// This error code indicates that the chain has not been added to MetaMask
				// if it is not, then install it into the user MetaMask
				if (error.code === 4902) {
					try {
						let id = ethers.utils.hexValue(41);
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{
									chainName: 'Telos Testnet',
									chainId: id,
									rpcUrls: ['https://testnet.telos.net/evm'],
									blockExplorerUrls: ['https://testnet.teloscan.io'],
									nativeCurrency: {
										name: 'Telos',
										symbol: 'TLOS',
										decimals: 18,
									},
								},
							],
						});
					} catch (addError) {
						console.error(addError);
					}
				}
				console.error(error);
			}
		} else {
			// if no window.ethereum then MetaMask is not installed
			toggle = null;
		}

		// localStorage.setItem('network', 'telos');
		// localStorage.setItem('networkNum', '3');
	};

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

	// ----------------------------------------------------
	// ---------------------- Use Effect ------------------
	// ----------------------------------------------------

	useEffect(() => {
		// Dismiss all active toasts on page change
		toast.remove();
	}, [router.events]);

	// ----------------------------------------------------
	// ---------------------- Render ------------------------
	// ----------------------------------------------------

	return (
		<header className="sticky top-0 z-20 ">
			<div
				className={`flex items-center h-20 ${themeObject.bgColor
					} w-full gap-8 ${padding ? 'mobile:px-5 laptop:px-40' : ''}`}
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
									fill={themeObject.logoColor}
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M25.0014 11.8361C25.0005 11.8902 25 11.9448 25 12L25.0068 12C25.1753 15.7255 28.4671 18.7 32.5 18.7C36.5376 18.7 39.8323 15.7187 39.9938 11.9871L40 11.9871C40 11.9328 39.9996 11.8791 39.9988 11.8258C39.9996 11.784 40 11.742 40 11.7H39.9962C39.9168 8.75634 38.6098 7.40441 36.9633 5.70147C35.7001 4.39492 34.2372 2.88175 32.9757 0.284562C32.7932 -0.103367 32.2198 -0.0904358 32.0374 0.297493C30.798 2.96578 29.3006 4.53646 28.0062 5.8942C26.3913 7.58821 25.0924 8.95074 25.0047 11.7H25C25 11.7455 25.0005 11.7908 25.0014 11.8361Z"
									fill={themeObject.logoColor}
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
									className={`text-[14px] flex flex-row justify-center ${themeObject.textColor} font-Inter items-center ${themeObject.buttonColor} rounded-[40px] space-x-2 py-2  w-[175px] hover:opacity-60`}
									onClick={() => {
										setIsSelectWalletOpen(true);
										switchNetwork()
									}}
								>
									Connect Wallet
								</button>
							</>
						) : (chainId == defaultChainId) ?
							<>
								{/* <div className="dropdown dropdown-end ">
                                    <label
                                        tabindex="0"
                                        className={`text-[14px] flex flex-row ${themeObject.textColor} justify-center items-center px-4 py-2 w-[130px] ${themeObject.buttonColor} space-x-2 rounded-[40px]`}
                                    >
                                        {toggle === 421613 ? (
                                            <>
                                                <img className="h-[15%] w-[15%]" src="/arbitrum.svg" />
                                                <span className="">Arbitrum</span>
                                            </>
                                        ) : toggle === 80001 ? (
                                            <>
                                                <img className="h-[15%] w-[15%]" src="/polygon.svg" />
                                                <span className="">Polygon</span>
                                            </>
                                        ) : toggle === 41 ? (
                                            <>
                                                <img className="h-[15%] w-[15%]" src="/telos.png" />
                                                <span className="">Telos</span>
                                            </>
                                        ) : (
                                            <>
                                                <img className="h-[12%] w-[12%]" src="/eth.png" />
                                                <span className="text-[14px]">Goerli</span>
                                            </>
                                        )}
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.6666 6.66666L7.8382 9.49508L5.00977 6.66666" stroke={themeObject.iconTextColor} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </label>
                                    <ul
                                        tabindex="0"
                                        className={`menu dropdown-content ${themeObject.buttonColor} ${themeObject.textColor} p-2 shadow rounded-box w-52 mt-4`}
                                    >
                                        <li>
                                            <a onClick={() => setState(421613)}>
                                                <img className="h-[30%] w-[30%]" src="/arbitrum.svg" />
                                                Arbitrum
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <img className="h-[30%] w-[30%]" src="/fuel.png" />
                                                Fuel
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
								<div className={ `flex flex-row flex-1 justify-center ${themeObject.textColor} font-Inter items-center ${themeObject.buttonColor}  rounded-[40px]  py-2  hover:opacity-60`}>
									<img className="h-[15px] w-[10px]" src="/eth.png" />
									<span className="text-[14px] px-2">Goerli</span>
								</div>

								<button
									className={`text-[14px] flex flex-row flex-1 justify-center ${themeObject.textColor} font-Inter items-center ${themeObject.buttonColor} rounded-[40px] space-x-2 py-2  w-[175px] hover:opacity-60`}
									onClick={() => {
										console.log("will open dropdown ")
									}}
								>
									<span className="truncate">{truncateText(account)}</span>
									<a
										onClick={() => copyAddressToClipboard()}
										className={'relative'}
									>
										<div className={`visible hover:scale-110 active:scale-125`}>
											<svg
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M12.4733 14.1667H5.6533C4.71997 14.1667 3.95996 13.4067 3.95996 12.4733V5.65336C3.95996 4.72003 4.71997 3.96002 5.6533 3.96002H12.4733C13.4066 3.96002 14.1666 4.72003 14.1666 5.65336V12.4733C14.1666 13.4067 13.4066 14.1667 12.4733 14.1667Z"
													stroke={themeObject.iconTextColor}
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
												<path
													d="M2.32682 11.5463C2.02016 11.2397 1.8335 10.813 1.8335 10.3463V3.52635C1.8335 2.59301 2.5935 1.83301 3.52684 1.83301H10.3468C10.8735 1.83301 11.3468 2.073 11.6602 2.453"
													stroke={themeObject.iconTextColor}
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</div>
										<p
											className={
												isCopied == false
													? 'hidden'
													: ` transition ease-in-out duration-300 delay-150 visible z-10 absolute ${themeObject.buttonColor} opacity-70 px-2 py-0.5`
											}
										>
											Copied
										</p>
									</a>
									</button>
									<div className="dropdown dropdown-end">
										<label
											tabindex="0"
											className={`text-lg ${themeObject.textColor}`}
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
														fill={themeObject.menuButtonColor}
													/>
													<path
														d="M22 17C22.5523 17 23 16.5523 23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16C21 16.5523 21.4477 17 22 17Z"
														fill={themeObject.iconTextColor}
													/>
													<path
														d="M16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17Z"
														fill={themeObject.iconTextColor}
													/>
													<path
														d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44771 15 9 15.4477 9 16C9 16.5523 9.44771 17 10 17Z"
														fill={themeObject.iconTextColor}
													/>
												</svg>
											</div>
										</label>
										<ul
											tabindex="0"
											className={`menu dropdown-content ${themeObject.textColor} ${themeObject.buttonColor}  p-2 shadow rounded-box w-[250px] mt-4 z-10`}
										>
											<li>
												<button
													onClick={() => {
														faucet();
														mixpanelTrackProps('Get Test Tokens', {
															token: '$auce',
														});
													}}
												>
													<img className="h-[10%] w-[10%]" src="/icon.svg" />
													Get Test Tokens
												</button>
											</li>
											<li>
												<a
													className={`active:bg-[#ACFF00] ${themeObject.textColor}`}
													target="blank"
													href="https://goerli-faucet.pk910.de/"
													onClick={() =>
														mixpanelTrackProps('Get Test Tokens', {
															token: 'ETHGoerli',
														})
													}
												>
													<img className="h-[7%] w-[7%]" src="/eth.png" />
													Get Test ETH(Goerli)
												</a>
											</li>
										</ul>
									</div>
							</>
							: (
								<>
									<button
										className={`text-[14px] flex flex-row justify-center ${themeObject.textColor} font-Inter items-center ${themeObject.buttonColor} bg-[yellow] rounded-[40px] space-x-2 py-2  w-[175px] hover:opacity-60`}
										onClick={() => switchNetwork()}
									>
										Switch Network
									</button>

									<button
										className={`text-[14px] flex flex-row justify-center ${themeObject.textColor} font-Inter items-center ${themeObject.buttonColor} rounded-[40px] space-x-2 py-2  w-[175px] hover:opacity-60`}
										onClick={() => {
											console.log("will open dropdown ")
										}}
									>
										<span className="truncate">{truncateText(account)}</span>
										<a
											onClick={() => copyAddressToClipboard()}
											className={'relative'}
										>
											<div className={`visible hover:scale-110 active:scale-125`}>
												<svg
													width="16"
													height="16"
													viewBox="0 0 16 16"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M12.4733 14.1667H5.6533C4.71997 14.1667 3.95996 13.4067 3.95996 12.4733V5.65336C3.95996 4.72003 4.71997 3.96002 5.6533 3.96002H12.4733C13.4066 3.96002 14.1666 4.72003 14.1666 5.65336V12.4733C14.1666 13.4067 13.4066 14.1667 12.4733 14.1667Z"
														stroke={themeObject.iconTextColor}
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
													<path
														d="M2.32682 11.5463C2.02016 11.2397 1.8335 10.813 1.8335 10.3463V3.52635C1.8335 2.59301 2.5935 1.83301 3.52684 1.83301H10.3468C10.8735 1.83301 11.3468 2.073 11.6602 2.453"
														stroke={themeObject.iconTextColor}
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</svg>
											</div>
											<p
												className={
													isCopied == false
														? 'hidden'
														: ` transition ease-in-out duration-300 delay-150 visible z-10 absolute ${themeObject.buttonColor} opacity-70 px-2 py-0.5`
												}
											>
												Copied
											</p>
										</a>
									</button>



								</>

							)}
					</div>
				) : (
					<></>
				)}
				<NavBarDrawerContainer
					drawerIconColor={themeObject.drawerIconColor}
					backgroundColor={themeObject.drawerBackgroundColor}
				>
					<div className="flex flex-col flex-1 justify-center items-center font-Inter  mt-4 ">
						<div className="dropdown dropdown-end ">
							<label
								tabindex="0"
								className={`text-lg flex flex-row  justify-start items-center p-4  w-full   ${themeObject.drawerButtonColor} ${themeObject.drawerTextColor} space-x-4  hover:opacity-60`}
							>
								{toggle === 421613 ? (
									<>
										<img className="h-auto w-[10%]" src="/arbitrum.svg" />
										<span className="text-lg">Arbitrum</span>
									</>
								) : toggle === 80001 ? (
									<>
										<img className="h-auto w-[10%]" src="/polygon.svg" />
										<span className=" text-lg">Polygon</span>
									</>
								) : toggle === 41 ? (
									<>
										<img className="h-auto w-[10%] text-lg" src="/telos.png" />
										<span className=" text-lg">Telos</span>
									</>
								) : (
									<>
										<img className="h-auto w-[9%]" src="/eth.png" />
										<span className="text-lg">Goerli</span>
									</>
								)}
								<svg
									width="25"
									height="25"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M10.6666 6.66666L7.8382 9.49508L5.00977 6.66666"
										stroke={themeObject.drawerIconAsText}
										stroke-width="1.2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</label>
							<ul
								tabindex="0"
								className={`menu dropdown-content  ${themeObject.drawerButtonColor} ${themeObject.drawerTextColor} p-4 shadow w-full mt-4`}
							>
								<li>
									<a onClick={() => setState(421613)}>
										<img className="h-[15%] w-[15%]" src="/arbitrum.svg" />
										Arbitrum
									</a>
								</li>
								<li>
									<a>
										<img className="h-[15%] w-[15%]" src="/fuel.png" />
										Fuel
									</a>
								</li>
							</ul>
						</div>

						<button
							className={`text-lg flex flex-row justify-start p-4  font-Inter items-center mt-4 ${themeObject.drawerButtonColor} ${themeObject.drawerTextColor}  space-x-4  w-full hover:opacity-60`}
							onClick={() => getWallet(true)}
						>
							<span className="truncate">
								{account}
							</span>
							<a
								onClick={() => copyAddressToClipboard()}
								className={'relative'}
							>
								<div
									className={
										account == null
											? 'hidden'
											: 'visible hover:scale-110 active:scale-125'
									}
								>
									<svg
										width="20"
										height="20"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12.4733 14.1667H5.6533C4.71997 14.1667 3.95996 13.4067 3.95996 12.4733V5.65336C3.95996 4.72003 4.71997 3.96002 5.6533 3.96002H12.4733C13.4066 3.96002 14.1666 4.72003 14.1666 5.65336V12.4733C14.1666 13.4067 13.4066 14.1667 12.4733 14.1667Z"
											stroke={themeObject.drawerIconAsText}
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M2.32682 11.5463C2.02016 11.2397 1.8335 10.813 1.8335 10.3463V3.52635C1.8335 2.59301 2.5935 1.83301 3.52684 1.83301H10.3468C10.8735 1.83301 11.3468 2.073 11.6602 2.453"
											stroke={themeObject.drawerIconAsText}
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
								<p
									className={
										isCopied == false
											? 'hidden'
											: ' transition ease-in-out duration-300 delay-150 visible z-10 absolute bg-white opacity-70 px-2 py-0.5'
									}
								>
									Copied
								</p>
							</a>
						</button>

						<button
							className={`text-lg flex flex-row justify-start  font-Inter items-center mt-4 ${themeObject.drawerButtonColor} ${themeObject.drawerTextColor}  space-x-4 p-4  w-full hover:opacity-60`}
							onClick={() => {
								faucet();
								mixpanelTrackProps('Get Test Tokens', { token: '$auce' });
							}}
						>
							<img className="h-auto w-[10%]" src="/icon.svg" />
							<text>Get Test Tokens </text>
						</button>

						<a
							className={`text-lg flex flex-row justify-start font-Inter items-center mt-4 ${themeObject.drawerButtonColor} ${themeObject.drawerTextColor}   space-x-4  p-4  w-full hover:opacity-60`}
							target="blank"
							href="https://goerli-faucet.pk910.de/"
							onClick={() =>
								mixpanelTrackProps('Get Test Tokens', {
									token: 'ETHGoerli',
								})
							}
						>
							<img className="h-auto w-[7%]" src="/eth.png" />
							<text>Get ETH(Goerli) </text>
						</a>
					</div>
				</NavBarDrawerContainer>
			</div>
			<SelectWalletModal
				isOpen={isSelectWalletOpen}
				closeModal={onSelectWalletClose}
			/>
		</header>
	);
};
