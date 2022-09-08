import React from "react";
import { Skeleton } from "@mui/material";
import Link from 'next/link'
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import mock1155 from "../abi/mock1155.json";
import axios from "axios";


export const Card = ({ cardObject }) => {
  const cardObjectHref = "/live-market/" + cardObject.sku


  const getMarketbySku = async () => {
    const req = axios.get('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json');
  req.then(res => {
    const test = res.data[3]["384664-023"]
    setCurrentMarket(test)
    const expires = (new Date((test?.expiration) * 1000)).toLocaleDateString("en-US")
    setExpiration(expires)
    console.log({testing:test})
  })
     
    // setCurrentMarket()
  }


  const calculations = () => {

    if (No < Yes) {
      setFavored(true)
    } else {
      setFavored(false)
    }

  }

  const ratios = async () => {
    if (currentMarket !== undefined) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(currentMarket?.address, mock1155, signer);
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

  const [No,setNo] = useState();
  const [Yes,setYes] = useState();
  const [currentMarket, setCurrentMarket] = useState()
  const [expiration, setExpiration] = useState();

  let [favored, setFavored] = useState()


  useEffect(() => {
    getMarketbySku();
  }, []);


  useEffect(() => {
    ratios();
    calculations();
  }, [currentMarket]);

  return (
    <Link href={cardObjectHref}>
      <a className="transition duration-500 bg-black rounded-md shadow-md shadow-black text-black hover:shadow-2xl flex flex-col 
 laptop: w-full items-start text-left font-inter max-h-fit">

        {cardObject === undefined ?
          <React.Fragment>
            <Skeleton variant="rectangular" sx={{ backgroundColor: 'white', height: '450px' }} />
          </React.Fragment> :
          <React.Fragment>
            <div className="flex flex-row items-left laptop:flex-col laptop:space-y-3 laptop:justify-center  w-full h-full">

              {cardObject.image?.original === '' || cardObject.image?.original === 'https://image.goat.com/placeholders/product_templates/original/missing.png' ?

                <div className="w-full h-1/4 bg-white justify-center items-center border-black border-[1px] rounded-tl-md rounded-tr-md">
                  <img className='object-cover mobile:h-[30px] laptop:w-[40%] m-auto laptop:h-[100%] scale-125' src='/hurache.svg' />
                </div>
                :

                <div className="w-full h-1/4 bg-white justify-center items-center border-black border-[1px] rounded-tl-md rounded-tr-md">
                  {/* Information in this div will be fed by the contract. Can grab it on load in the main index and pass it as another object */}

                  <img className='object-cover mobile:h-[70px] laptop:w-[40%] m-auto laptop:h-[100%] scale-150' src={cardObject.image?.original}></img>
                </div>

              }

              <div className=" h-full">
                <div className="px-8 pt-4 " >
                  <h1 className="text-2xl font-normal text-white h-[22%] w-full line-clamp-2 font-SG  ">{cardObject.name}</h1>
                  <h2 className=" text-lg font-light text-left w-full text-white py-4 font-inter">Retail Price &ensp;  &ensp; &ensp; ${cardObject.retailPrice}</h2>

                </div>
                <div className="border-b-[1px] border-[#30403F]"></div>
                <div className="px-8 ">
                  <div className="flex flex-col w-full py-4 space-y-3 font-light">
                    <h1 className="text-[14px] text-white font-inter ">Will the price be over $300?
                    </h1>

                    <div className="space-y-3">
                      <div className='flex flex-row items-center border-[#30403F] border-[1px] rounded-[40px]  w-[80%] h-[50%] py-2 px-4 space-x-2 items-center font-inter'>

                        <p className={favored == true ? "bg-[#ACFF00] text-black  text-[14px] font-normal rounded-[40px]  flex flex-row justify-center   py-1 border-[1px] border-[#30403F] h-full w-full" : "text-white  text-sm font-normal  rounded-[40px] flex flex-row justify-center  border-[1px] py-1 border-[#30403F] h-full w-full"} >No - {No} %</p>

                        <p className={favored == false ? "bg-[#ACFF00] text-black  text-[14px] font-normal  rounded-[40px]  flex flex-row justify-center  py-1 border-[1px] border-[#30403F] h-full w-full" : "text-white text-sm font-normal  rounded-[40px] flex flex-row justify-center  border-[1px] py-1 border-[#30403F] h-full w-full"}>Yes - {Yes} %</p>
                      </div>
                      <button className='flex flex-row items-center text-white text-[14px]  border-[#30403F] border-[1px] rounded-[40px]  w-[80%] h-[30%] py-2 px-4 items-center hover:bg-[#ACFF00] hover:text-black '> <p> Place a bet on this sneaker</p> <img className="ml-3 text-white" src="/slimRightArrowWhite.svg"/></button>

                    </div>


                    <div className=" w-full">

                      <h2 className="text-[14px] text-[#748282]">This wager expires {expiration}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        }
      </a>
    </Link>

  )
}