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
import { useToast } from '@chakra-ui/react';
import classNames from 'classnames';
import {HouseXchange} from '../components/houseXchange'
import {OpenXchange} from '../components/openXchange'



export const Xchange = ({ cardObject }) => {
    const toast = useToast();

    const [orderBookType, setOrderBookType] = useState('house');

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

    const xchange = async (e) => {
      e.preventDefault();
      
        
        const data = new FormData(e.target);
        console.log(data.get("Amount"));
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const market = new ethers.Contract(currentMarket.address, marketabi, signer);
        let signedContract = market.connect(signer);
        setSignedContract(signedContract)
        let position;
        if (isYes === true) {
          position = 1
        } else { position = 2 };
        console.log(position);
        const order = await signedContract.xchange(BigNumber.from(position), BigNumber.from(data.get("Amount")))

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
        } else { fromToken = Token2 };
        console.log(fromToken);
        const order = await signedContract.limitOrder(
            fromToken,
            ethers.utils.parseUnits("200", 18),
            ethers.utils.parseUnits("500", 18),
            ethers.utils.parseUnits("5", 18),

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
        } else { fromToken = Token2 }
        const LowestAsk = await orderBook.quoteMarketPrice(fromToken);
        setCurrentQuote((LowestAsk / (10 ** 18)).toString());


        console.log((LowestAsk / (10 ** 18)).toString())
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
        ratios();
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
            <div className='bg-black  rounded-t-[10px] border-b-[1px] p-2  w-[100%]  border-[#0C1615]' />

            {/* <form onSubmit={handleTransfer} className="flex flex-col justify-center items-center mobile:w-full laptop:w-full"> */}

                <div className='bg-white items-center text-left rounded-xl p-4   space-y-4 border-[#0C1615] w-full '>
                    <div className="flex flex-row justify-center rounded-2xl border-[1px]  border-black">
                        {/* <button className={classNames("flex-1 font-SG text-md text-center rounded-l-2xl p-2 ", {'bg-[#ACFF00] rounded-r-2xl' : orderBookType === 'house'} )} onClick={() => setOrderBookType('house')} >
                            House OrderBook
                        </button> */}
                        <text className={classNames(" flex-1 font-SG text-md text-center rounded-r-2xl p-2  rounded-l-2xl ")} >
                            Open OrderBook
                        </text>
                    </div>

                    {/* { orderBookType === 'house' ?

                    <HouseXchange cardObject={cardObject}/> : */}
                    <OpenXchange />

    
</div>


              
             

             







            {/* </form> */}
        </div>

    )

}