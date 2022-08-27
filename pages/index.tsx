import type { NextPage } from "next";
import { Nav } from "../components/nav";
import { Card } from "../components/cardWager";
import { CardPreMarket } from "../components/cardPreMarket";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { RepeatOneSharp } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from "react";
import CasinoIcon from "@mui/icons-material/Casino";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import Carousel from "nuka-carousel/lib/carousel";
import { Announcement } from "../components/announcement";

const Home: NextPage = () => {
  let [premarketResponse, setAuctionResponse] = useState([] as any);
  let [marketResponse, setMarketResponse] = useState([] as any);
  let [isLoading, setisLoading] = useState(true as boolean);
  let [toggled, setisToggled] = useState(true as boolean);

  // fetch sneaker data
  const getSneaker2 = async () => {
    Promise.all([
      axios.get(
        "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=394805-100"
      ),
      axios.get(
        "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=AR9880-023"
      ),

      axios.get(
        "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=AA7293-200"
      ),
    ])

      .then(
        axios.spread((obj1, obj2, obj3) => {
          setAuctionResponse([
            obj1.data.results[0],
            obj2.data.results[0],
            obj3.data.results[0],
          ]);
          setMarketResponse([
            obj1.data.results[0],
            obj2.data.results[0],
            obj3.data.results[0],
          ]);

          setisLoading(false);

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

    <div className="flex w-screen flex-col items-center justify-center bg-[#1B1C18]">
      <Head>
        <title>Xsauce</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="flex flex-col w-full text-center mb-20 font-SG">
        <Announcement/>
        <Nav />

        {/* <div className='flex flex-row p-0 m-0 items-middle justify-center'>
       <h1 className='text-[20px] pl-6 pt-6 font-bold text-left'>
       Welcome, </h1> <h2 className='text-left pl-6 pr-6 text-[12px] '>to the world’s first prediction market for 👟s </h2>
       </div> */}
<div className="m-auto outline-4 outline-[#8F9285] mobile:hidden tablet:flex w-[700px] laptop:w-[1100px] desktop:w-[1300px]">
        <Carousel
          wrapAround
          speed={600}
          style={{  
            height: "1/3vh",
            width: "100%",
        
            borderRadius: "20px",
            margin: "auto",
            marginTop:'50px'
          }}
          defaultControlsConfig={{
            nextButtonStyle: {
              display: "none",
            },
            prevButtonStyle: {
              display: "none",
            },
            pagingDotsStyle: {
              fill: "white",
              padding: "10px",
            },
          }}
        >
          <img src="/Slide1.png" />
          <img src="/Slide2.png" />
          <img src="/Slide3.png" />
          <img src="/Slide4.png" />
          
        </Carousel>
        </div>
        
        <div className="flex flex-row items-center pl-18 pb-8 pt-8">
          <div className="flex flex-row items-center justify-between w-[1300px] m-auto">
            <div className='flex flex-row items-center space-x-4'>
            <h3 className="text-[22px] text-[white] text-left font-bold font-SG">
                Filter:
              </h3>
            <button onClick={() => setisToggled(true)} className={toggled == true ? "laptop:flex flex-row items-center rounded-xl text-[black] transition duration-500 bg-[#ACFF00] p-2" : "laptop:flex flex-row items-center rounded-xl transition duration-500 bg-inherit p-2 text-[white]" }>
              <SportsScoreIcon />
              <h3 className="text-[17px] text-left font-normal font-Inter">
                Pre-Market
              </h3>
            </button>
            <button onClick={() => setisToggled(false)} className={toggled == false ? "laptop:flex flex-row items-center text-[black] rounded-xl transition duration-200 bg-[#ACFF00] p-2" : "laptop:flex flex-row items-center text-[white] rounded-xl transition duration-500 bg-inherit p-2" }>
               <CasinoIcon />
              <h3 className="text-[17px] text-left font-normal font-Inter">
                Live Market
              </h3>
            </button>
            </div>
            <a
              href="/markets"
              className="rounded ml-8 text-black font-light text-[16px] hover:bg-gray px-4 underline underline-offset-2 font-Inter"
            >
              see all &#8594;
            </a>
          </div>
        </div>
        {toggled === true ? (
        <div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-[1300px] font-SG">
          <div className="mobile:flex w-full flex-1 flex-col laptop:grid grid-cols-3 grid-rows-1 gap-4 laptop:w-[1300px] ">
            {isLoading === true ? (
              <React.Fragment>
                <div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "12px",
                    }}
                    width={400}
                    height={300}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={400}
                    height={30}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={300}
                    height={30}
                  />
                </div>
                <div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "12px",
                    }}
                    width={400}
                    height={300}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={400}
                    height={30}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={300}
                    height={30}
                  />
                </div>
                <div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "12px",
                    }}
                    width={400}
                    height={300}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={400}
                    height={30}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={300}
                    height={30}
                  />
                </div>
              </React.Fragment>
            ) : (
              premarketResponse.map((el: any) => (
                <CardPreMarket cardObject={el} />
              ))
            )}
          </div>
        </div>
            ) : (

        <div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-[1300px]">
          <div className="mobile:flex w-full flex-1 flex-col laptop:grid grid-cols-3 grid-rows-1 gap-4 laptop:w-[1300px]">
            {isLoading === true ? (
              <React.Fragment>
                <div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "12px",
                    }}
                    width={400}
                    height={300}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={400}
                    height={30}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={300}
                    height={30}
                  />
                </div>
                <div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "12px",
                    }}
                    width={400}
                    height={300}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={400}
                    height={30}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={300}
                    height={30}
                  />
                </div>
                <div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3">
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "12px",
                    }}
                    width={400}
                    height={300}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={400}
                    height={30}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      zIndex: "2",
                      backgroundColor: "gray",
                      borderRadius: "8px",
                    }}
                    width={300}
                    height={30}
                  />
                </div>
              </React.Fragment>
            ) : (
              marketResponse.map((el: any) => <Card cardObject={el} />)
            )}
          </div>
        </div>
)}
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
