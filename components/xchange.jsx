import React from "react"
import { BigNumber, ethers, utils } from 'ethers'
import erc1155abi from '../abi/erc1155.json';
import marketabi from '../abi/markets.json';
import { useState, useEffect } from "react";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import {useToast} from '@chakra-ui/react';


export const Xchange = ({cardObject}) => {
    const toast = useToast();


    const erc20Git = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/ERC20.json'
    const OrderBookGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/OrderBook20.json'
    const OrderBookAddressGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/deployments.json'
    const Token1 = "0x0163f21F8AcB86564491676C21Ca235cb9ddbFcD"
    const Token2 = "0xEAAC1924EDC605928C106C74932387d37B2387Aa"
    const market1OrderBook = "0x632f332B9B212A6462717ad34CBBB61a55dcBe69";

    const getMarketbySku = () => {
      const req = axios.get('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json');
      req.then(res => {
        const test = res.data[3][cardObject]
        setCurrentMarket(test)
        const expires = (new Date((test?.expiration) * 1000)).toLocaleDateString("en-US")
        setExpiration(expires)
       
      })
    }


    const handleTransfer = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      console.log(data.get("Amount") * data.get("LimitPrice"));
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const orderBook = new ethers.Contract(market1OrderBook, orderBookAbi, signer);
      let signedContract = orderBook.connect(signer);
      setSignedContract(signedContract)
      let fromToken;
      if (isBuy === true) {
        fromToken = Token1;
      } else { fromToken = Token2};
   console.log(fromToken);
      const order = await signedContract.limitOrder(
          fromToken,
          ethers.utils.parseUnits("200", 18),
          ethers.utils.parseUnits("500", 18),
          ethers.utils.parseUnits("5",18),

          //data.get("LimitPrice")

          // ethers.utils.parseUnits(data.get("Amount"))
          // data.get("LimitPrice") * data.get("Amount") 
          // makerOnly
          false,
          // takerOnly
          false,
      )

      }

    

    const quote = async (e) => {
      e.preventDefault();
      // const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const orderBook = new ethers.Contract(market1OrderBook, orderBookAbi, signer);
      signedContract = orderBook.connect(signer);
      setSignedContract(signedContract)
      let fromToken;
      if (isBuy === true) {
        fromToken = Token1;
      } else { fromToken = Token2}
      const LowestAsk = await orderBook.quoteMarketPrice(fromToken);
      setCurrentQuote((LowestAsk/(10**18)).toString());
  
  
      console.log((LowestAsk/(10**18)).toString())
    }

  
    const requestOrderBook = axios.get(OrderBookGit);
    const requestOrderBookAddress = axios.get(OrderBookAddressGit);
  

    const Mockaddress = "0xac9BD2821B4296ea92b716DB8D841e46cd1f2F71"
  
    // const dai = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa"

    const [alignment, setAlignment] = useState();
    const [isYes, setIsYes] = useState();
    const [No, setNo] = useState();
    const [Yes, setYes] = useState();
    const [order, setOrder] = useState();

    const [isBuy, setIsBuy] = useState();
    const [currentQuote, setCurrentQuote] = useState()
    const [orderBookAbi, setOrderBookAbi] = useState(null)
    const [orderBookAddress, setOrderBookAddress] = useState(null)
    const [signedContract, setSignedContract] = useState(null)
    const [tokenA, setTokenA] = useState(null)
    const [currentMarket, setCurrentMarket] = useState()
    const [expiration, setExpiration] = useState();


    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        if (event.target.value === "1") {
            setIsYes(true);

        } else if (event.target.value === "2") {
            setIsYes(false);

        }
    };

    const handleChange1 = (event, newOrder) => {
        setOrder(newOrder);
        if (event.target.value === "1") {
            setIsBuy(true);
        } else if (event.target.value === "2") {
            setIsBuy(false);
        }

    }

    const grabData = async () => {
        axios.all([requestOrderBook, requestOrderBookAddress]).then(axios.spread((...responses) => {
            setOrderBookAbi(responses[0].data)
            // TODO fetch object based on chainID now is only Rinkeby
            setOrderBookAddress(responses[1].data[4].OrderBook20.address)
           

        })).catch(errors => {
            console.log(errors)
        })

    }

    const ratios = async () => {
      if (currentMarket !== undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(currentMarket?.address, marketabi, signer);
        const getYes = await contract.totalSupply(
          1
        )
        const getNo = await contract.totalSupply(
          2
        )
  
  
  
        let NoRatio = (getNo.toNumber() / (getYes.toNumber() + getNo.toNumber())) * 100
  
  
        let YesRatio = (getYes.toNumber() / (getYes.toNumber() + getNo.toNumber())) * 100
        console.log(YesRatio)
  
        setYes(YesRatio.toFixed(0))
        setNo(NoRatio.toFixed(0))
  
      }
    }

    useEffect(() => {
      // ratios();
      // calculations();
    }, [currentMarket]);

    useEffect(() => {
        grabData();
        getMarketbySku();
    }, []);



    useEffect(() => {

        if (isYes === true) {
            setAlignment('1');
        } else {
            setAlignment('2');
        }
    }, [isYes])


    useEffect(() => {

        if (isBuy === true) {
            setOrder('1');
        } else {
            setOrder('2');
        }
    }, [isBuy])


    return (



        <div className="flex flex-col justify-start border-[1px] border-[#0C1615] rounded-[10px] text-black">
            <div className='bg-[#ACFF00]  rounded-t-[10px] border-b-[1px] p-2  w-[100%]  border-[#0C1615]' />
        
            <form onSubmit={handleTransfer} className="flex flex-col justify-center items-center mobile:w-full laptop:w-full">

                <div className='bg-white items-center text-left border-b-[1px] p-4   space-y-4 border-[#0C1615] w-full '>
                    <did>
                        <p className="font-SG text-md text-center ">House OrderBook / Open OrderBook</p>
                    </did>


                    <div class="bg-white items-center p-3  px-5 text-left w-[100%] border-[1px] rounded-3xl border-[#0C1615]  dropdown dropdown-end  ">

                        <label tabindex="0" class="flex items-center hover:opacity-60 ">
                            <p className="text-left text-sm ">
                                Select the Wager
                            </p>
                            <div class="flex-1"></div>
                            {isYes === true ? (
                                <>
                                    <span className="text-black">Yes</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-black">No</span>
                                </>

                            )}

                        </label>
                        <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-[#EFF1F3] rounded-box w-[25%] mt-4    ">
                            <li><a onClick={() => { setIsYes(true) }} className="flex justify-right">Yes</a></li>
                            <li><a onClick={() => { setIsYes(false) }}>No</a></li>
                        </ul>
                    </div>



                    <div className='bg-white items-center p-3  px-5 text-left w-[100%] border-[1px] rounded-3xl border-[#0C1615] flex' >
                        <p className="text-left text-sm ">
                            Buy or Sell
                        </p>
                        <div class="flex-1"></div>
                        <div class="dropdown dropdown-end ">
                            <label tabindex="0" class="flex items-center">
                                {isBuy === true ? (
                                    <>
                                        <span className="text-black">Buy</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-black">Sell</span>
                                    </>

                                )}

                            </label>
                            <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-[#EFF1F3] rounded-box w-52 mt-4">
                                <li><a onClick={() => { setIsBuy(true) }}>Buy</a></li>
                                <li><a onClick={() => { setIsBuy(false) }}>Sell</a></li>
                            </ul>
                        </div>


                    </div>
                </div>

                <div className='bg-white items-center text-left border-b-[1px] p-4 space-y-4 border-[#0C1615] w-full '>

                    <div className='bg-white items-center p-3 px-5 text-left w-[100%] border-[1px] rounded-3xl border-[#0C1615] flex focus:outline-2 focus:outline-offset-2  hover:outline-1'   >
                        <p className="text-left text-sm pr-1 ">
                            Limit Price:
                        </p>
                        <input
                            className="flex-1 text-right mobile:text-sm laptop:text-md appearance-none focus:none focus:outline-none "
                            name="LimitPrice"
                            type="number"
                            placeholder="100"
                            required
                        />
                        <p className="text-sm ml-1"> USDC</p>
                    </div>
                    <div className='bg-white items-center p-3 px-5 text-left w-[100%] border-[1px] rounded-3xl border-[#0C1615] flex focus:outline-2 focus:outline-offset-2 hover:outline-1' >
                        <p className="text-left text-sm inline-block pr-1 ">
                            Amount:
                        </p>
                        <input
                            className="flex-1 text-right mobile:text-sm laptop:text-md  inline-block appearance-none focus:none focus:outline-none "
                            name="Amount"
                            type="number"
                            placeholder="# of Contracts"
                            required
                        />
                    </div>
                </div>

                <div className='bg-[#ACFF00] items-center text-left  p-4 space-y-4  w-full border-b-[1px] border-b-[#0C1615]'>
                    <div className="font-Inter mobile:text-lg font-medium flex flex-row justify-center items-center">
                
                    <Tooltip
                      title="Price is dynamic and will adjust in response to buys/sells in the market. Buy price will always show the lowest asking price in the orderbook."
                      arrow
                      className="self-start mr-2"
                    >
                      <InfoIcon sx={{ fontSize: "18px" }} />
                    </Tooltip>
                     <p className="pr-4 " >Price : ${currentQuote} </p>
                    <button onClick={quote} className="bg-black text-white p-3 text-xs rounded-3xl">Update Quote</button>
                  </div>
                 </div>

                <div className='bg-white items-center text-left  p-4 space-y-4 rounded-bl-lg rounded-br-lg  w-full'>

                    <button type="submit" id='mint' className={isBuy == undefined ? " w-full font-medium  text-xl py-4  text-[#0C1615] bg-[#DCDEE1] rounded-[80px] hover:opacity-60" : isBuy == true ? "w-full font-medium  text-xl py-4  text-[#0C1615] rounded-[80px] hover:opacity-60text-black bg-[#ACFF00] " : " w-full font-medium  text-xl py-4  text-white bg-[#0C1615] rounded-[80px] hover:opacity-60 "}>
                        {isBuy == undefined ? 'Select Order Type' : isBuy === true ? 'Place Buy Order' : 'Place Sell Order'}
                    </button>
                   
                </div>

                


                



            </form>
        </div>

    )

}