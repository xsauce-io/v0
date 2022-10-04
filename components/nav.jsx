import React, { useEffect, useMemo } from 'react';

import { useState } from 'react';
import { ethers, utils } from 'ethers';

import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';

import { LocalDrawer } from '../components/drawer';
import SauceTokenABI from '../abi/$tableSauce.json';
import toast from 'react-hot-toast';
import { ToastNotification } from './toast';
import { WalletNotConnectedModal } from './walletNotConnectedModal';

export const Nav = ({ logoColor }) => {
	// let [network, setNetwork] = useState();
	const screens = {
		mobile: '300',
		tablet: '640',
		laptop: '1200',
		desktop: '1400',
	};

	const { width } = useWindowDimensions();

	let [accounts, setAccount] = useState(null);
	const [toggle, setToggle] = useState();
	const [current, setCurrent] = useState();
	const [isCopied, setIsCopied] = useState(false);
	const [fullLengthAccount, setFullLengthAccount] = useState(null);
	const [openWalletNotConnectedModal, setOpenWalletNotConnectedModal] =
		useState(false);

	const getWallet = async (clicked = false) => {
		try {
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
			console.log('nice', isConnected);

			if (wallet) {
				mixpanelTrackProps('Connect Wallet', {
					result: 'successful',
					automaticConnection: !clicked,
					chainId: chainId,
				});
			}
			setOpenWalletNotConnectedModal(false);
		} catch (error) {
			if (error.code == -32002) {
				setOpenWalletNotConnectedModal(true);
				console.log('error wallet not connected', error);
			}
			mixpanelTrackProps('Connect Wallet', {
				result: 'unsuccessful',
				automaticConnection: !clicked,
				//chainId: chainId,
			});
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

	const SauceTokenAddress = '0x12d9dda76a85E503A9eBc0b265Ef51e4aa90CD7D';

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

	useEffect(() => {
		getWallet();
		localStorage.getItem('network');
	}, [openWalletNotConnectedModal]);

	return (
		<header className="bg-inherit sticky top-0 z-20  border-b-[1px] border-inherit ">
			<WalletNotConnectedModal open={openWalletNotConnectedModal} />

			<div className="flex items-center h-20 w-full gap-8   ">
				<div className="flex-1">
					<a className="block" href="/">
						<span className="sr-only">Home</span>
						<div className="text-[14px] h-20 flex flex-row items-center">
							<h1 className="font-Inter pr-2 mobile:pl-5">Xchange</h1>
							{width >= screens.laptop ? (
								<div className="bg-white text-[10px] font-Inter text-black rounded-[40px] py-1 px-2 mobile:invisible tablet:visible">
									Beta
								</div>
							) : (
								<></>
							)}
						</div>
					</a>
				</div>

				<div className="flex flex-row justify-center flex-1 ">
					<svg
						width="33"
						height="32"
						viewBox="0 0 33 29"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22.6347 17.7117L31.0665 25.0761C32.8526 26.6404 32.5987 29.0007 30.1236 29.0007H25.4634C24.729 29.0007 24.0218 28.7354 23.505 28.2505L17.0678 22.295C16.7505 22.0022 16.2337 22.0022 15.9164 22.295L9.43388 28.2505C8.91709 28.7262 8.21897 28.9915 7.48459 28.9915H2.75189C0.29488 28.9915 -0.929093 26.2653 0.829802 24.6918L8.6995 17.6385C9.20722 17.1811 9.19815 16.4309 8.68136 15.9918L1.46445 9.8259C-0.366972 8.27984 0.838868 5.48962 3.33215 5.48962H7.61152C8.32777 5.48962 9.01682 5.74578 9.52454 6.20319L15.9073 11.8843L22.6347 17.7117Z"
							fill={logoColor}
						/>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M21.2002 4.42065C19.9736 5.73654 18.9956 6.78574 18.9956 9L19.6487 8.99942C19.903 11.6696 22.1342 13.759 24.8469 13.759C27.73 13.759 30.0691 11.3988 30.0691 8.48961H29.9799C29.8495 6.47727 28.9228 5.49696 27.7687 4.2761C26.8424 3.29619 25.7695 2.16131 24.8444 0.213421C24.7106 -0.0775251 24.2901 -0.0678269 24.1563 0.223119C23.2474 2.22434 22.1494 3.40235 21.2002 4.42065Z"
							fill={logoColor}
						/>
					</svg>
				</div>

				{width >= screens.laptop ? (
					<div className="flex flex-row  flex-1 justify-end items-center space-x-4 font-Inter">
						<div className="dropdown dropdown-end ">
							<label
								tabindex="0"
								className="text-[14px] flex flex-row text-black justify-center items-center px-4 py-2 w-[130px] bg-[#DCDEE1] space-x-2 rounded-[40px]"
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
								className="menu dropdown-content bg-[#DCDEE1] text-black p-2 shadow rounded-box w-52 mt-4"
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
						</div>

						<button
							className="text-[14px] flex flex-row justify-center text-black font-Inter items-center bg-[#DCDEE1] rounded-[40px] space-x-2 py-2  w-[175px] hover:opacity-60"
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

						<div className="dropdown dropdown-end ">
							<label tabindex="0" className="text-lg text-black ">
								<img className="w-[37px]" src="/menu.svg" />
							</label>
							<ul
								tabindex="0"
								className="menu dropdown-content bg-[#DCDEE1] text-black p-2 shadow rounded-box w-[250px] mt-4 z-10"
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
										className="active:bg-[#ACFF00] text-black"
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

				<LocalDrawer>
					<div className="flex flex-col flex-1 justify-center items-center space-y-4 pt-8 font-Inter border-t-[1px] border-white mt-4   ">
						<div className="dropdown dropdown-end w-full">
							<label
								tabindex="0"
								className="text-lg flex flex-row text-black justify-center items-center px-4 py-2 bg-[#DCDEE1] space-x-2 rounded-3xl"
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
										<span className="text-[red] text-[14px]">Unknown</span>
									</>
								)}
								<img src="/dropdown.png" />
							</label>
							<ul
								tabindex="0"
								className="menu dropdown-content bg-[#DCDEE1] text-black p-2 shadow rounded-box w-full mt-4 z-10"
							>
								<li>
									<a onClick={() => setState(421613)}>
										<img className="h-[30%] w-[30%]" src="/arbitrum.svg" />
										Arbitrum
									</a>
								</li>
								<li>
									<a onClick={() => setState(80001)}>
										<img className="h-[30%] w-[30%]" src="/polygon.svg" />
										Polygon
									</a>
								</li>
								<li>
									<a onClick={() => setState(41)}>
										<img className="h-[30%] w-[30%]" src="/telos.png" />
										Telos
									</a>
								</li>
							</ul>
						</div>

						<button
							className="text-lg flex flex-row text-black items-center bg-[#DCDEE1] font-Inter rounded-3xl py-2 px-6 w-full hover:opacity-60"
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
										accounts == null ? 'hidden' : 'visible active:scale-125'
									}
									src="/copy.png"
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
					</div>
				</LocalDrawer>
			</div>
		</header>
	);
};
