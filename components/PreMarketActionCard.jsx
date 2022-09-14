import React from "react"
import { BigNumber, ethers, utils } from 'ethers'
import erc1155abi from '../abi/erc1155.json';
import marketabi from '../abi/markets.json';
import { useState, useEffect } from "react";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import {useToasts} from 'react-toast-notifications';




export const PreMarketActionCard = ({cardObject}) => {

  const {addToast} = useToasts();

    const erc20Git = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/ERC20.json'
    const OrderBookGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/OrderBook20.json'
    const OrderBookAddressGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/deployments.json'
    const TokenA = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/deployments.json'


    


    const requestERC20 = axios.get(erc20Git);
    const requestOrderBook = axios.get(OrderBookGit);
    const requestOrderBookAddress = axios.get(OrderBookAddressGit);
    const requestTokenA = axios.get(TokenA);

    const Mockaddress = "0xac9BD2821B4296ea92b716DB8D841e46cd1f2F71"
    // const addressRink ="0x360b9D17f8546941208085C045871E2a318117Ba"
    // const dai = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa"
    let fix = "0x44A5cE34F2997091De32F1eC7f552c3FC175869d"





    const [alignment, setAlignment] = useState();
    const [isYes, setIsYes] = useState();
    const [No, setNo] = useState();
    const [Yes, setYes] = useState();
    const [order, setOrder] = useState();

    const [isBuy, setIsBuy] = useState();
    const [ERC20Abi, setERC20Abi] = useState(null)
    const [orderBookAbi, setOrderBookAbi] = useState(null)
    const [orderBookAddress, setOrderBookAddress] = useState(null)
    const [signedContract, setSignedContract] = useState(null)
    const [tokenA, setTokenA] = useState(null)
    const [currentMarket, setCurrentMarket] = useState()
    const [expiration, setExpiration] = useState();

    const theme = createTheme({
        palette: {
            primary: {
                main: '#416900',

            },
            secondary: {
                main: '#BA1A1A',

            },
            action: {
                selectedOpacity: .6
            }

        }
    })


    const getMarketbySku = () => {
      const req = axios.get('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json');
      req.then(res => {
        const test = res.data[3][cardObject]
        setCurrentMarket(test)
        const expires = (new Date((test?.expiration) * 1000)).toLocaleDateString("en-US")
        setExpiration(expires)
       
      })
    }


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
        // getMarketbySku();
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



    const handleTransfer = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let position;
        if (isYes === true){ 
          position = "1"
        }
        else {position = "2"};
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
       
        const contract = new ethers.Contract("0x44A5cE34F2997091De32F1eC7f552c3FC175869d", marketabi, signer);
        let signedContract = contract.connect(signer);
        setSignedContract(signedContract)
        const {error} = await contract.mint(signer, BigNumber.from(position), BigNumber.from(data.get("contractNumber")), "0x");
        
        if (error) {
          addToast(error.message, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 2000, placement:bottom-right });
        } else {
          addToast('Order Filled', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 2000, placement:bottom-right });
        }

    }



    return (



        <div className="flex flex-col justify-start border-[1px] border-[#0C1615] rounded-[10px] text-black">
            <div className='bg-[#ACFF00]  rounded-t-[10px] border-b-[1px] p-2  w-[100%]  border-[#0C1615]' />
            <div className='bg-white p-4 text-left w-[100%] border-b-[1px] border-[#0C1615]'>
                <flex className="flex flex-rows space-x-2 justify-center items-center">
                    <p className=" mr-1 text-xs  ">Market Statistics</p>
                    <div className="text-xs w-1/4 bg-[#0C1615] p-2 rounded-2xl text-center text-white">No - {No}%</div>
                    <div className="text-xs   w-1/4 bg-[#ACFF00] p-2 rounded-2xl text-center">Yes - {Yes}%</div>

                </flex>
            </div>
            <form onSubmit={handleTransfer} className="flex flex-col justify-center items-center mobile:w-full laptop:w-full">

                <div className='bg-white items-center text-left border-b-[1px] p-4   space-y-4 border-[#0C1615] w-full '>
                    <did>
                        <p className="font-SG text-md text-start ">Will the Resell Price be over ${currentMarket?.prediction}</p>
                        <p className="font-SG text-xs text-left opacity-70 mt-2">Wager Expires: {expiration}</p>
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



                  
                <div className='bg-white items-center text-left border-b-[1px] p-4 space-y-4 border-[#0C1615] w-full '>

                   
                    <div className='bg-white items-center p-3 px-5 text-left w-[100%] border-[1px] rounded-3xl border-[#0C1615] flex' >
                        <p className="text-left text-sm inline-block pr-1 ">
                            Contract Number:
                        </p>
                        <input
                            className="flex-1 text-right mobile:text-sm laptop:text-md  inline-block appearance-none focus:none focus:outline-none hover:underline"
                            name="contractNumber"
                            type="text"
                            placeholder="# of Contracts"
                            required
                        />
                    </div>
                </div>


                <div className='bg-white items-center text-left  p-4 space-y-4  w-full border-b-[1px] border-b-[#0C1615]'>

                    <button id='mint' className={isBuy == undefined ? " w-full font-medium  text-xl py-4  text-[#0C1615] bg-[#DCDEE1] rounded-[80px] hover:opacity-60" : isBuy == true ? "w-full font-medium  text-xl py-4  text-[#0C1615] rounded-[80px] hover:opacity-60text-black bg-[#ACFF00] " : " w-full font-medium  text-xl py-4  text-white bg-[#0C1615] rounded-[80px] hover:opacity-60 "} type="submit">
                        {isBuy == undefined ? 'Select Order Type' : isBuy === true ? 'Place Buy Order' : 'Place Sell Order'}
                    </button>
                    <div className="w-full px-5 flex">
                        <p className="text-left text-sm font-medium">
                            Wager Total Cost
                        </p>
                        <div className="flex-1 font-medium" />
                        <p className="text-left text-sm  font-medium">
                            $2,000.00
                        </p>
                    </div>
                </div>

                <div className='bg-[#DCDEE1] items-center text-left rounded-b-[10px] p-3  space-y-4  w-full '>
                    <div className="w-full  flex px-5 items-center">
                        <p className="text-left text-sm font-medium">
                            Total possible winnings
                        </p>
                        <div className="flex-1 " />
                        <p className="text-left text-sm font-medium p-2 rounded-2xl text-center bg-[#ACFF00] mobile:text-xs">
                            $2,000.00
                        </p>
                    </div>
                </div>
                </div>


            </form>
            
        </div>

    )

}