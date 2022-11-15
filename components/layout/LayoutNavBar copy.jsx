import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { ethers, utils } from 'ethers';
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';
import { LayoutDrawer } from '/components/layout/LayoutDrawer';
import SauceTokenABI from '../../abi/$tableSauce.json';
import toast from 'react-hot-toast';

import { useRouter } from 'next/router';
import { ToastNotificationActionBar } from '../common/ToastActionBar';

export const LayoutNavBar = ({ logoColor }) => {
	// ----------------------------------------------------
	// ----------------------  Variables and Constants ------------------------
	// ----------------------------------------------------
	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};
	const SauceTokenAddress = '0x12d9dda76a85E503A9eBc0b265Ef51e4aa90CD7D';

	// ----------------------------------------------------
	// ----------------------  States ------------------------
	// ----------------------------------------------------
	const { width } = useWindowDimensions();
	const router = useRouter();
	const currentPath = router.pathname;

	let [accounts, setAccount] = useState(null);
	const [toggle, setToggle] = useState();
	const [current, setCurrent] = useState();
	const [isCopied, setIsCopied] = useState(false);
	const [fullLengthAccount, setFullLengthAccount] = useState(null);
	const [
		openWalletNotConnectedModal,
		setOpenWalletNotConnectedModal,
	] = useState(false);

	// ----------------------------------------------------
	// ----------------------Function------------------------
	// ----------------------------------------------------

	const getWallet = async (clicked = false) => {
		const hasConnectedWalletBefore = localStorage.getItem(
			'hasConnectedWalletBefore'
		);
		console.log(hasConnectedWalletBefore);

		if (hasConnectedWalletBefore != null || clicked === true) {
			console.log(hasConnectedWalletBefore);
			console.log(clicked);
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
					console.log({ chainzsid: chainId });

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
				if (error.code == -32002) {
					if (!clicked) {
						toast.custom(
							(t) => (
								<ToastNotificationActionBar
									message={'Your wallet is not connected'}
									subMessage={
										'To see market statistics, connect your Metamask wallet and refresh the page.'
									}
									icon={<img src="/alertTriangle.svg" />}
									t={t}
									href="https://geekflare.com/finance/beginners-guide-to-metamask/"
								/>
							),
							{ duration: Infinity }
						);
						console.log('error wallet not connected', error);
					} else if (error) {
						toast.custom(
							(t) => (
								<ToastNotificationActionBar
									message={
										'Your Metamask wallet is currently busy with another request'
									}
									subMessage={
										'Open your Metamask to manage your current requests and refresh the page.'
									}
									icon={<img src="/alertCircle.svg" />}
									t={t}
									href="https://geekflare.com/finance/beginners-guide-to-metamask/"
								/>
							),
							{ duration: Infinity }
						);
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
		console.log(fullLengthAccount);
		console.log(accounts);

		await navigator.clipboard
			.writeText(fullLengthAccount)
			.then(setIsCopied(true));
		navigator.clipboard.readText().then((text) => {
			console.log('copied text', text);
		});
		setTimeout(() => {
			setIsCopied(false);
			console.log('done timer');
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
			console.log('was added', wasAdded);
			if (wasAdded) {
				mixpanelTrackProps('Get Test Tokens', {
					token: 'Xsauce',
					result: 'completed',
				});
				console.log('Now you are official!');
			} else {
				mixpanelTrackProps('Get TestTokens', {
					token: 'Xsauce',
					result: 'cancelled',
				});
				console.log('All good');
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

	useEffect(() => {
		getWallet();
		localStorage.getItem('network');
	}, [openWalletNotConnectedModal]);

	// ----------------------------------------------------
	// ---------------------- Render ------------------------
	// ----------------------------------------------------

	return (
		<header className=" sticky top-0 z-20 ">
			<div className="flex items-center h-20 w-full gap-8 px-0 bg-[#0C1615]">
				<div className="basis-1/3">
					<a className="block" href="/">
						<span className="sr-only">Home</span>
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

				<div className="flex flex-row justify-center basis-1/3 "></div>

				{width >= screens.smlaptop ? (
					<div className="flex flex-row  basis-1/3  justify-end items-center space-x-4 font-Inter">
						<div className="dropdown dropdown-end   ">
							<label
								tabindex="0"
								className="text-[14px] flex flex-row  justify-center items-center px-4 py-2 w-[130px] bg-white text-[#0C1615] space-x-2 rounded-[40px]"
							>
								{toggle === 421613 ? (
									<>
										<img className="h-[15%] w-[15%]" src="/arbitrum.svg" />
										<span className="text-black">Arbitrum</span>
									</>
								) : toggle === 80001 ? (
									<>
										<img className="h-[15%] w-[15%]" src="/polygon.svg" />
										<span className="text-[black]">Polygon</span>
									</>
								) : toggle === 41 ? (
									<>
										<img className="h-[15%] w-[15%]" src="/telos.png" />
										<span className="text-[black]">Telos</span>
									</>
								) : (
									<>
										<img className="h-[12%] w-[12%]" src="/eth.png" />
										<span className="text-[black] text-[14px]">Goerli</span>
									</>
								)}
								<img src="/downArrow.svg" />
							</label>
							<ul
								tabindex="0"
								className="menu dropdown-content bg-white text-[#0C1615] text-white p-2 shadow rounded-box w-52 mt-4"
							>
								<li className=" bg-white text-[#0C1615]">
									<a onClick={() => setState(421613)}>
										<img className="h-[30%] w-[30%]" src="/arbitrum.svg" />
										Arbitrum
									</a>
								</li>
								<li className=" bg-white text-[#0C1615]">
									<a>
										<img className="h-[30%] w-[30%]" src="/fuel.png" />
										Fuel
									</a>
								</li>
							</ul>
						</div>

						<button
							className="text-[14px] flex flex-row justify-center  font-Inter items-center  bg-white text-[#0C1615]  rounded-[40px] space-x-2 py-2  w-[175px] hover:opacity-60"
							onClick={() => getWallet(true)}
						>
							<span className="truncate">
								{accounts == null ? 'Connect Wallet' : accounts}
							</span>
							<a
								onClick={() => copyAddressToClipboard()}
								className={'relative'}
							>
								<img
									className={
										accounts == null
											? 'hidden'
											: 'visible hover:scale-110 active:scale-125 text-white'
									}
									src="/Images.svg"
								/>
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

						<div className="dropdown dropdown-end">
							<label tabindex="0" className="text-lg text-white">
								<img className="w-[37px]" src="/menulight.svg" />
							</label>
							<ul
								tabindex="0"
								className="menu dropdown-content bg-white text-[#0C1615] p-2 shadow rounded-box w-[250px] mt-4 z-10"
							>
								<li>
									<button
										onClick={() => {
											faucet();
											mixpanelTrackProps('Get Test Tokens', { token: '$auce' });
										}}
									>
										<img className="h-[10%] w-[10%]" src="/icon.svg" />
										Get Test Tokens
									</button>
								</li>
								<li>
									<a
										className="active:bg-[#ACFF00] bg-white text-[#0C1615]"
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
					</div>
				) : (
					<></>
				)}

				<LayoutDrawer backgroundColor='#0C1615' >

					<div className="flex flex-col flex-1 justify-center items-center  font-Inter  mt-4 ">
						<div className='my-10 border-[1px] border-white w-full' />

						<div className="dropdown dropdown-end ">
							<label
								tabindex="0"
								className="text-[14px] flex flex-row text-black justify-center items-center px-4 py-3 w-[175px]  bg-[#DCDEE1] space-x-6 rounded-[40px]"
							>
								{toggle === 421613 ? (
									<>
										<img className="h-auto w-[10%]" src="/arbitrum.svg" />
										<span className="text-[14px]">Arbitrum</span>
									</>
								) : toggle === 80001 ? (
									<>
										<img className="h-auto w-[10%]" src="/polygon.svg" />
										<span className=" text-[14px]">Polygon</span>
									</>
								) : toggle === 41 ? (
									<>
										<img
											className="h-auto w-[10%]text-[14px]"
											src="/telos.png"
										/>
										<span className=" text-[14px]">Telos</span>
									</>
								) : (
									<>
										<img className="h-auto w-[9%]" src="/eth.png" />
										<span className=" text-[14px]">Goerli</span>
									</>
								)}
								<img src="/caretDown.svg" className="h-auto w-[20px]" />
							</label>
							<ul
								tabindex="0"
								className="menu dropdown-content bg-[#DCDEE1] text-black p-2 shadow rounded-box w-52 mt-4"
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
							className="text-[14px] flex flex-row justify-center font-Inter items-center mt-4  bg-[#DCDEE1] text-black rounded-[40px] space-x-2 py-3  w-[175px] hover:opacity-60"
							onClick={() => getWallet(true)}
						>
							<span className="truncate">
								{accounts == null ? 'Connect Wallet' : accounts}
							</span>
							<a
								onClick={() => copyAddressToClipboard()}
								className={'relative'}
							>
								<img
									className={
										accounts == null
											? 'hidden'
											: 'visible hover:scale-110 active:scale-125'
									}
									src="/Images2.svg"
								/>
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

						<div className='my-10 border-[1px] border-white w-full'></div>

						<button
							className="text-[14px] flex flex-row justify-center  font-Inter items-center bg-[#DCDEE1] text-black rounded-[40px] space-x-2 py-3  w-[175px] hover:opacity-60"
							onClick={() => {
								faucet();
								mixpanelTrackProps('Get Test Tokens', { token: '$auce' });
							}}
						>
							<img className="h-auto w-[10%]" src="/icon.svg" />
							<text>Get Test Tokens </text>
						</button>

						<a
							className="text-[14px] flex flex-row justify-center  font-Inter items-center mt-4 bg-[#DCDEE1] text-black rounded-[40px] space-x-2 py-3  w-[175px] hover:opacity-60"
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
						<div className='my-10 border-[1px] border-white w-full'></div>

					</div>
				</LayoutDrawer>
			</div>
		</header>
	);
};
