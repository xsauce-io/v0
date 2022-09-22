import React from "react";
import { Skeleton } from "@mui/material";
import Link from 'next/link'
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import marketAbi from "../abi/markets.json";
import axios from "axios";


export const CalendarCard = ({ cardObject }) => {
  const cardObjectHref = "/live-market/" + cardObject?.sku


  const getMarketbySku = async () => {
    const req = axios.get('https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json');
    req.then(res => {
      const test = res.data[3][cardObject?.sku]
      setCurrentMarket(test)
      const expires = (new Date((test?.expiration) * 1000)).toLocaleDateString("en-US")
      setExpiration(expires)
      console.log({ testing: test })
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
      const contract = new ethers.Contract(currentMarket?.address, marketAbi, signer);
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

  const [No, setNo] = useState();
  const [Yes, setYes] = useState();
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
      <a className="flex flex-col transition duration-500 bg-black rounded-md shadow-md shadow-black text-black hover:shadow-2xl laptop: w-full items-start text-left font-inter min-h-full 	">

        {cardObject === undefined ?
          <React.Fragment>
            <Skeleton variant="rectangular" sx={{ backgroundColor: 'white', height: '450px' }} />
          </React.Fragment> :
          <React.Fragment>
            <div className="flex items-left flex-col space-y-3 justify-center w-full h-full ">

              {cardObject.image?.original === '' || cardObject.image?.original === 'https://image.goat.com/placeholders/product_templates/original/missing.png' ?

                <div className="w-full h-1/4 bg-white justify-center items-center border-black border-[1px] rounded-tl-md rounded-tr-md">
                  <img className='object-cover mobile:w-[40%]  m-auto mobile:h-[100%] scale-100' src='/hurache.svg' />
                </div>
                :

                <div className="w-full h-1/4 bg-white justify-center items-center border-black border-[1px] rounded-tl-md rounded-tr-md ">
                  {/* Information in this div will be fed by the contract. Can grab it on load in the main index and pass it as another object */}

                  <img className='object-contain mobile:w-[40%]  m-auto mobile:h-[100%] scale-110' src={cardObject.image?.original}></img>
                </div>

              }

              <div className="h-full">
                <div className="px-8  " >
                  <h1 className="text-2xl font-normal text-white h-[22%] w-full line-clamp-2 font-SG  ">{cardObject.name}</h1>
                  <h2 className=" text-lg font-light text-left w-full text-white py-4 font-Inter">Retail Price &ensp;  &ensp; &ensp; ${cardObject.retailPrice}</h2>

                </div>
                <div className="border-b-[1px] border-[#30403F]"></div>
                <div className="px-8 ">
                  <div className="flex flex-col w-full py-4 space-y-3 font-light">
                  

                  


                    <div className="w-full">

                      <h2 className="text-[14px] text-[#748282] font-Inter">Release Date: {cardObject.releaseDate}</h2>
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