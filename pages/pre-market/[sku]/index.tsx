import type { NextPage } from "next";
import { Nav } from "../../../components/nav";
// import { Card } from '../components/card'
import { ProductDetails } from "../../../components/productDetails";
import { Wagerinput } from "../../../components/wagerinput";
import { Announcement } from "../../../components/announcement";
import { PreCard } from "../../../components/preCard";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { Countdown } from "../../../components/countdown";
import InfoIcon from "@mui/icons-material/Info";
import Head from "next/head";

const PreMarket: NextPage = () => {
  const router = useRouter();

  const { sku } = router.query;

  console.log(sku);

  const skuUrl =
    "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=" +
    sku;

  const options = {
    method: "GET",
    url: skuUrl,
  };

  const [response, setResponse] = useState([] as any);

  // fetch sneaker data
  const getSneaker = async () => {
    axios
      .request(options)
      .then(function (response) {
        const array: any[] = response.data.results;
        setResponse(array);
        console.log(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!router.isReady) return;
    getSneaker();
  }, [router.isReady]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#E5E5E5]">
      <Head>
        <title>Xsauce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        id="tester"
        className="flex w-full h-full flex-1 flex-col text-center"
      >
        <Announcement />
        <Nav />
        <Countdown />

        {/* <h3 className="flex flex-row items-center justify-center text-left pt-2 pb-2 mt-2 text-[25px] font-medium">
        🏁 Pre-Market
					</h3>
          */}

        <div className=" laptop:flex flex-row laptop:h-[calc(100%-160px)] justify-center">
          <div className="laptop:flex flex-col w-1/2 pl-5 justify-center">
            {response.map((el: any) => (
              <PreCard cardObject={el} />
            ))}
          </div>
          <div className="mobile:flex flex-col space-y-6 justify-center items-center laptop:flex laptop:flex-col laptop:w-1/2 justify-center items-center">
            <div className="flex flex-col bg-white rounded-lg shadow-md  pt-5 pb-8 space-y-2 w-3/4 h-full my-8 items-center justify-center">
              <div className="flex flex-row items-left w-full h-[20%] py-2 px-6 items-center">
                <p className="text-[10px] bg-[#630606] text-white rounded-l-[25px]  flex flex-col justify-center laptop:text-[14px]   border-black h-full   w-[75%]">
                  🧊 No - 40%
                </p>

                <p className="text-[10px] bg-[#099309] text-white rounded-r-[25px] flex flex-col justify-center laptop:text-[14px]   border-black h-full w-[25%]">
                  🔥 Yes - 60%
                </p>
              </div>

              <h3 className="mobile:text-[18px] font-semibold font-SG w-full">
                Wager: Resell Price is {">"} $400
              </h3>

              <Wagerinput />
              <h3 className="font-SG pt-10 mobile:text-[18px] font-medium flex flex-row justify-center">
              Closes: 09.10.2022 @ 12:00 PM EST 
            </h3>
            </div>
          </div>
        </div>

        {/* <h3 className="font-Inter mobile:text-[25px] font-medium flex flex-row justify-center">
                    Price : {currentQuote}
                    <Tooltip
                      title="Price is dynamic and will adjust in response to buys/sells in the market. Buy price will always show the lowest asking price in the orderbook."
                      arrow
                    >
                      <InfoIcon sx={{ fontSize: "18px" }} />
                    </Tooltip>
                  </h3> */}
      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
			</footer> */}
    </div>
  );
};

export default PreMarket;
