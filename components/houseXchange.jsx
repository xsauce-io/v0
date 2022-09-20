import React from "react"
import { BigNumber, ethers, utils } from 'ethers'
import marketabi from '../abi/markets.json';
import $tableABI from '../abi/$tableSauce.json'
import { useState, useEffect } from "react";
import axios from 'axios';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useToast } from '@chakra-ui/react';
import { parseEther } from "ethers/lib/utils";


export const HouseXchange = ({ cardObject }) => {
    const toast = useToast();


    const erc20Git = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/ERC20.json'
    const OrderBookGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/abis/OrderBook20.json'
    const OrderBookAddressGit = 'https://raw.githubusercontent.com/poolsharks-protocol/orderbook-metadata/main/deployments.json'
    const $tableAddress = "0x12d9dda76a85E503A9eBc0b265Ef51e4aa90CD7D"
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





    const approve$auce = async () => {

      if (approvalCheck == true) {}
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const address = (await provider.send('eth_requestAccounts', [])).toString();
      const signer = provider.getSigner();
      const $table = new ethers.Contract($tableAddress, $tableABI, signer);
      console.log(address)
      const allowance = (await $table.allowance(address, currentMarket.address))
  
  if (allowance > (100000 * 10**18) ) {
    setapprovalCheck(true);
  }
  
  else {

    const approvedAmount = BigNumber.from("2").pow(BigNumber.from("256")).sub("1")
    console.log(approvedAmount)
  
      await $table.approve(currentMarket.address, BigNumber.from(approvedAmount))
      setapprovalCheck(true);
  
  }
  } 
    


    const mint = async (e) => {
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
        const order = await signedContract.mint(BigNumber.from(position), BigNumber.from(data.get("Amount")))

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
    const [currentMarket, setCurrentMarket] = useState()
    const [expiration, setExpiration] = useState();
    const [approvalCheck, setapprovalCheck] = useState(false);


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
            const signer = provider.getSigner();
            const contract = new ethers.Contract(currentMarket?.address, marketabi, signer);
            const getYes = await contract.totalSupply(
                1
            )

            console.log(getYes.toString())
            const getNo = await contract.totalSupply(
                2
            )
            console.log(getNo.toString())

            let NoRatio = (getNo.toNumber() / (getYes.toNumber() + getNo.toNumber())) * 100

            console.log(NoRatio)


            let YesRatio = (getYes.toNumber() / (getYes.toNumber() + getNo.toNumber())) * 100
            console.log(YesRatio)

            setYes(YesRatio.toFixed(0))
            setNo(NoRatio.toFixed(0))

        }
    }

    useEffect(() => {
        ratios();
        if (currentMarket !== undefined) {
        approve$auce()}
        
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
            
            <div className='bg-white p-4 text-left w-[100%] rounded-tl-xl rounded-tr-xl border-b-[1px] border-[#0C1615]'>
                <flex className="flex flex-rows space-x-2 justify-center items-center">
                    <p className=" mr-1 text-xs  ">Market Statistics</p>
                    <div className="text-xs w-1/4 bg-[#0C1615] p-2 rounded-2xl text-center text-white">No - {No}%</div>
                    <div className="text-xs   w-1/4 bg-[#ACFF00] p-2 rounded-2xl text-center">Yes - {Yes}%</div>

                </flex>
            </div>
            <form onSubmit={xchange} className="flex flex-col justify-center items-center mobile:w-full laptop:w-full">

                <div className='bg-white items-center text-left  p-4   space-y-4 border-[#0C1615] w-full '>
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
                            <li className=" rounded-box "><a onClick={() => { setIsYes(true) }} className="flex justify-right active:bg-[#ACFF00]">Yes</a></li>
                            <li className=" rounded-box"><a className="flex justify-right active:bg-[#ACFF00]" onClick={() => { setIsYes(false) }}>No</a></li>
                        </ul>
                    </div>


                </div>

                <div className='bg-white items-center text-left border-b-[1px] px-4 pb-4 space-y-4 border-[#0C1615] w-full '>


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

                    </div>
                </div>

                <div className='bg-white items-center text-left  p-4 space-y-4  w-full border-b-[1px] border-b-[#0C1615]'>

                    <button type="submit" id='mint' className="w-full font-medium  text-xl py-4  text-white bg-[#0C1615] rounded-[80px] hover:opacity-60">
                       Xchange
                    </button>
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





            </form>
        </div>

    )

}