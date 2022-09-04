

import React, { useEffect } from "react";
import { Drawer, Box, Typography } from "@mui/material";
import { useState } from "react";
import { ethers, utils } from 'ethers';
import { Onboard } from "../components/onBoardingModal";
import PropTypes from 'prop-types';


export const Nav = ({ logoColor }) => {

  let [toggled, setisToggled] = useState('1');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let [accounts, setAccount] = useState(null);
  const fullLengthAccount = ''

  const getWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let wallet = await provider.send("eth_requestAccounts", [0]);
    accounts = wallet.toString();
    fullLengthAccount = wallet.toString();

    let truncateAccountName = accounts.substring(0, 4) + '...' + accounts.slice(-4);
    setAccount(truncateAccountName);
  }

  const copyAddress = () => {


    /* Copy the text inside the text field */
    navigator.clipboard.writeText(fullLengthAccount);

    /* Alert the copied text */
    alert("Copied Address: " + fullLengthAccount);
  }


  const handleChange = (event) => {
    if (event.target.value === '1') {
      //ethers call
    }

    else if (event.target.value === '2') {
      setisToggled('2')

    }

    else if (event.target.value === '3') {
      setisToggled('3')

    }
  }

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    const chains = async () => {
      if (toggled === '1') {
        if (window.ethereum) {
          try {
            let id = ethers.utils.hexValue(421613)
            // check if the chain to connect to is installed
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: id }], // chainId must be in hexadecimal numbers
            });
          } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
              try {
                let id = ethers.utils.hexValue(421613)
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainName: 'Arbitrum Nitro Rollup Testnet',
                      chainId: id,
                      rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
                      blockExplorerUrls: ['https://goerli-rollup-explorer.arbitrum.io/'],
                      nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 }

                    },
                  ],
                });
              } catch (addError) {
                console.error(addError);
              }
            }
            console.error(error);
          }
        }
      } else if (toggled === '2') {
        if (window.ethereum) {

          try {
            let id = ethers.utils.hexValue(80001)
            // check if the chain to connect to is installed
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: id }], // chainId must be in hexadecimal numbers
            });
          } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
              try {
                let id = ethers.utils.hexValue(80001)
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainName: 'Mumbai Testnet',
                      chainId: id,
                      rpcUrls: ['https://rpc-mumbai.matic.today/'],
                      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                      nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 }
                    },
                  ],
                });
              } catch (addError) {
                console.error(addError);
              }
            }
            console.error(error);
          }
        }

      } else if (toggled === '3') {
        if (window.ethereum) {
          try {
            let id = ethers.utils.hexValue(41)
            // check if the chain to connect to is installed
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: id }], // chainId must be in hexadecimal numbers
            });
          } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
              try {
                let id = ethers.utils.hexValue(41)
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainName: 'Telos Testnet',
                      chainId: id,
                      rpcUrls: ['https://testnet.telos.net/evm'],
                      blockExplorerUrls: ['https://testnet.teloscan.io'],
                      nativeCurrency: { name: 'Telos', symbol: 'TLOS', decimals: 18 }
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
          alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
        }

      }

    }
    chains();
  }, [toggled]);




  return (
    <header className="bg-inherit sticky top-0 z-20 w-full border-b-[1px] border-t-[1px] border-inherit">
      <div className="flex flex-row items-center h-20 w-full gap-8 px-4 mx-auto mobile:px-6 laptop:px-8">
        <div className="flex-1">
          <a className="block" href="/">
            <span className="sr-only">Home</span>
            <div className="text-[14px] h-20 flex flex-row items-center">

              <h1 className="font-Inter pr-2">Xchange</h1>
              <div className="bg-black text-[10px] font-Inter text-white rounded-[40px] py-2 px-4">Beta</div>
            </div>
          </a>
        </div>

        <div className="flex flex-row flex-1 justify-center">

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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.2002 4.42065C19.9736 5.73654 18.9956 6.78574 18.9956 9L19.6487 8.99942C19.903 11.6696 22.1342 13.759 24.8469 13.759C27.73 13.759 30.0691 11.3988 30.0691 8.48961H29.9799C29.8495 6.47727 28.9228 5.49696 27.7687 4.2761C26.8424 3.29619 25.7695 2.16131 24.8444 0.213421C24.7106 -0.0775251 24.2901 -0.0678269 24.1563 0.223119C23.2474 2.22434 22.1494 3.40235 21.2002 4.42065Z"
              fill={logoColor}
            />
          </svg>

        </div>


        <div className="flex flex-row flex-1 justify-end items-center space-x-4 font-Inter">
          <div className="dropdown dropdown-end">
            <label tabindex="0" className="text-[14px] flex flex-row justify-center items-center px-4 py-2 w-[130px] bg-[#DCDEE1] space-x-2 rounded-[40px]">
              {toggled === '1' ?
                <>
                  <img className="h-[15%] w-[15%]" src="arbitrum.svg" />
                  <span className="text-black">Arbitrum</span>
                </> : toggled === '2' ?
                  <>
                    <img className="h-[15%] w-[15%]" src="polygon.svg" />
                    <span className="text-black">Polygon</span>
                  </> :
                  <>
                    <img className="h-[15%] w-[15%]" src="telos.png" />
                    <span className="text-black">Telos</span>
                  </>
              }
              <img src="dropdown.png" />

            </label>
            <ul tabindex="0" className="menu dropdown-content bg-[#DCDEE1] p-2 shadow rounded-box w-52 mt-4">

              <li><a onClick={() => setisToggled('1')}><img className="h-[30%] w-[30%]" src="arbitrum.svg" />Arbitrum</a></li>
              <li><a onClick={() => setisToggled('2')}><img className="h-[30%] w-[30%]" src="polygon.svg" />Polygon</a></li>

              <li><a onClick={() => setisToggled('3')}><img className="h-[30%] w-[30%]" src="telos.png" />Telos</a></li>

            </ul>
          </div>

          <button className="text-[14px] flex flex-row justify-center text-black  items-center bg-[#DCDEE1] rounded-[40px] space-x-2 py-2  w-[175px]" onClick={() => getWallet()}>
            <span className="truncate">
              {accounts == null ?
                'Connect Wallet' :
                accounts}</span>
            <a onClick={() => copyAddress()}>
              <img className={accounts == null ? "hidden" : "visible"} src="/copy.png" />
            </a>
          </button>
        </div>

        <button
          className="mobile:block p-2.5 text-black bg-white rounded hover:text-[#D9CE3F]/75 transition laptop:hidden"
          onClick={() => setIsDrawerOpen(true)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#EFF1F3",
            },
          }}
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Box
            p={2}
            width="250px"
            textAlign="center"
            role="presentation"
            sx={{ backgroundColor: "#EFF1F3", height: "100" }}
          >
            <Typography component="div">
              <ul className="space-y-16 pl-1 text-[27px] font-SG">
                <li>
                  <a
                    className="text-black transition hover:text-[#D9CE3F]/75"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-black transition hover:text-[#D9CE3F]/75"
                    href="/premarkets"
                  >
                    Pre-Market
                  </a>
                </li>

                <li>
                  <a
                    className="text-black transition hover:text-[#D9CE3F]/75"
                    href="/markets"
                  >
                    Live Market
                  </a>
                </li>

                <li>
                  <a
                    className="text-black transition hover:text-[#D9CE3F]/75"
                    href="/redeem"
                  >
                    Redeem
                  </a>
                </li>



                <li>
                  <a
                    className="text-black transition hover:text-[#D9CE3F]/75"
                    href="/https://twitter.com/xsauce_io"
                  >
                    Contact Us
                  </a>
                </li>


                <li>
                  <div className="grid grid-cols-1 divide-y place-items-stretch	 ">
                    <div>
                      <Onboard />
                    </div>
                    {/* <div className="mt-6 text-black text-lg  bg-[#D9CE3F] p-1.5 px-0.5 transition rounded-md hover:scale-105 ">
                          <ConnectButton />
                        </div> */}

                  </div>

                </li>
              </ul>
            </Typography>
          </Box>
        </Drawer>
      </div>
    </header>
  );
};
