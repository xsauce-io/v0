import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";
import { ethers, BigNumber, utils } from "ethers";

// import AspectRatio from '@mui/joy/AspectRatio';

export const WagerCard = ({ cardObject }) => {


  const [ERC20Abi, setERC20Abi] = useState(null)
  const [orderBookAbi, setOrderBookAbi] = useState(null)
  const [orderBookAddress, setOrderBookAddress] = useState(null)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [signedContract, setSignedContract] = useState(null)
  const [tokenA, setTokenA] = useState(null)
  const [tokenB, setTokenB] = useState(null)
  const [isLoaded, Loading] = useState(false)

  const erc20Git = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/ERC20.json'
  const OrderBookGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/OrderBook20.json'
  const OrderBookAddressGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/deployments.json'
  const TokenA = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/deployments.json'
  const TokenB = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/deployments.json'

  const requestERC20 = axios.get(erc20Git);
  const requestOrderBook = axios.get(OrderBookGit);
  const requestOrderBookAddress = axios.get(OrderBookAddressGit);
  const requestTokenA = axios.get(TokenA);
  const requestTokenB = axios.get(TokenB);

  const grabData = async () => {
    axios.all([requestERC20, requestOrderBook, requestOrderBookAddress, requestTokenA, requestTokenB]).then(axios.spread((...responses) => {
      setERC20Abi(responses[0].data)
      setOrderBookAbi(responses[1].data)
      // TODO fetch object based on chainID now is only Rinkeby

      setOrderBookAddress(responses[2].data[4].OrderBook20.address)
      setTokenA(responses[2].data[4].Token20A184.address)
      setTokenB(responses[2].data[4].Token20B185.address)
      Loading(true);
    })).catch(errors => {
      console.log(errors)
    })
  }


  const quote = async () => {
    // e.preventDefault();
    // const data = new FormData(e.target);
    // console.log(data.get("contractNumber"));
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const orderBook = new ethers.Contract(orderBookAddress, orderBookAbi, signer);
    signedContract = orderBook.connect(signer);
    setSignedContract(signedContract)
    const quote = await orderBook.quoteExactAmountOut(
      tokenB,
      BigNumber.from('500'),
      BigNumber.from("1000000000000000000"),
     '5',
     '5'
    );
    setCurrentQuote(quote[0].toString());

    
    console.log(quote[0].toNumber())
  }


    useEffect(() => {
     
      const loader = async () =>{
        await grabData();
      }
      loader();
      
     },[]);
    
     useEffect(() => {
      if (isLoaded === true) {
     quote();
      } else { return }
   },[isLoaded]);
  


  return (
    <React.Fragment>
      <div className="w-[2/3] p-5 ">
        {cardObject === undefined ? (
          <React.Fragment>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" className={"h-[257px]"} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="mobile:flex flex-col text-center desktop:bg-white text-black rounded-lg px-16 py-6 ">
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
                  {/* <button onClick={quote} >Get Quote</button> */}
                </div>
                <img
                  src={cardObject.image?.original}
                  className="object-cover mobile:h-[200px] mb-4 tablet:h-[250px] laptop:h-[200px] m-0 desktop:h-[250px] w-[330px] rounded-lg"
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};