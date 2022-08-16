import type { NextPage } from "next";
import { Nav } from "../components/nav";
import { Card } from "../components/cardWager";
import { CardPreMarket } from "../components/cardPreMarket";
import { Feed } from "../components/feed";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { RepeatOneSharp } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from "react";
import CasinoIcon from "@mui/icons-material/Casino";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

const Home: NextPage = () => {
  let [premarketResponse, setAuctionResponse] = useState([] as any);
  let [marketResponse, setMarketResponse] = useState([] as any);

  // fetch sneaker data
  const getSneaker2 = async () => {
    Promise.all([
      axios.get(
        "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&brand=nike&name=air-max-patta&gender=men"
      ),
      axios.get(
        "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&brand=nike&name=air-max-patta&gender=men"
      ),
    ])

      .then(
        axios.spread((obj1, obj2) => {
          setAuctionResponse([
            obj1.data.results[0],
            obj1.data.results[1],
            obj1.data.results[2],
          ]);
          setMarketResponse([
            obj2.data.results[0],
            obj2.data.results[1],
            obj2.data.results[2],
          ]);

          console.log({ obj1 });
          console.log({ obj2 });
        })
      )
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getSneaker2();
  }, []);

  return (
    //#F5DEB3 - Vanilla
    //#E5E5E5 - Gray

    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#E5E5E5] ">
      <Head>
        <title>Xsauce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col text-center mb-20">
        <Nav />
        {/* <div className='flex flex-row p-0 m-0 items-middle justify-center'>
       <h1 className='text-[20px] pl-6 pt-6 font-bold text-left'>
       Welcome, </h1> <h2 className='text-left pl-6 pr-6 text-[12px] '>to the world’s first prediction market for 👟s </h2>
       </div> */}

        <div className="flex flex-row items-center pt-4 pl-20 space-x-2">
          <h1 className="text-[50px] underline underline-offset-8 decoration-[#ACFF00]">
            Dashboard
          </h1>
        </div>

        <Feed />
        <div className="flex flex-row items-center pl-20 pb-6 space-x-2">
          <SportsScoreIcon />
          <h3 className="text-[25px] text-left font-semibold">Pre-Market</h3>
        </div>
        <div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-[1300px]">
          <div className="mobile:flex w-full flex-1 flex-col laptop:grid grid-cols-3 grid-rows-1 gap-4 laptop:w-[1252px]">
            {premarketResponse.map((el: any) => (
              <CardPreMarket cardObject={el} />
            ))}
          </div>
        </div>
        <div className="flex flex-row items-center pl-20 pb-6 pt-6 space-x-2">
          <CasinoIcon />
          <h3 className="text-[25px] text-left font-semibold">Wagers</h3>
          <a
            href="/markets"
            className="rounded ml-8 text-black font-light text-[23px] hover:bg-gray px-4 underline underline-offset-2"
          >
            see all &#8594;
          </a>
        </div>
        <div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-[1300px]">
          <div className="mobile:flex w-full flex-1 flex-col laptop:grid grid-cols-3 grid-rows-1 gap-4 laptop:w-[1252px]">
            {marketResponse.map((el: any) => (
              <Card cardObject={el} />
            ))}
          </div>
        </div>
      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
