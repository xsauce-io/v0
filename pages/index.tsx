import type { NextPage } from "next";
import { Nav } from "../components/nav";
import { Card } from "../components/cardWager";
import { CardPreMarket } from "../components/cardPreMarket";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";
import React from "react";
import CasinoIcon from "@mui/icons-material/Casino";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { Announcement } from "../components/announcement";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Link,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from "react-slick";



const Home: NextPage = () => {
  let [premarketResponse, setAuctionResponse] = useState([] as any);
  let [marketResponse, setMarketResponse] = useState([] as any);
  let [isLoading, setisLoading] = useState(true as boolean);
  let [toggled, setisToggled] = useState(true as boolean);
  const [slider, setSlider] = React.useState<any | null>(null);


  // Settings for the slider

  // const Settings = {
  //   dots: true,
  //   arrows: false,
  //   fade: true,
  //   infinite: true,
  //   autoplay: true,
  //   speed: 500,
  //   autoplaySpeed: 5000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  // As we have used custom buttons, we need a reference variable to
  // change the state


  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  // const top = useBreakpointValue({ base: '90%', md: '50%' });
  // const side = useBreakpointValue({ base: '30%', md: '40px' });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  // const cards = [
  //   {
  //     link:'',
  //     image:
  //       'Slide1.svg' },
  //   {
  //     link:'https://linktr.ee/xsauceio',
  //    image:
  //       'Slide2.svg',
  //   },
  //   {
  //     title: 'Design Projects 3',
  //     text:
  //       "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
  //     image:
  //       'https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
  //   },
  // ];


  // fetch sneaker data
  const getSneaker2 = async () => {
    Promise.all([
      axios.get(
        "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=B75571"
      ),
      axios.get(
        "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=AO4606-001"
      ),

      axios.get(
        "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DR9654-100"
      ),
      axios.get(
        "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DV2122-400"
      ),
      axios.get(
        "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=HP7870"
      ),
      axios.get(
        "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DH7138-006"
      ),
    ])

      .then(
        axios.spread((obj1, obj2, obj3, obj4, obj5, obj6) => {
          setAuctionResponse([
            obj1.data.results[0],
            obj2.data.results[0],
            obj3.data.results[0],
            obj4.data.results[0],
    
          ]);
          setMarketResponse([
      
            obj6.data.results[0],
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

    <div className="flex w-screen flex-col items-center justify-center bg-[#E5E5E5]">
      <Head>
        <title>Xsauce</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="flex flex-col w-full text-center font-SG">
        <Announcement/>
        <Nav />

  
        {toggled === true ? (
        <div className=" mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-full font-SG border-b-0 pb-12">
          <div className="mobile:flex w-full flex-1 flex-col laptop:grid grid-cols-4 grid-rows-1 gap-2 laptop:w-full ">
            {isLoading === true ? (
              <React.Fragment>
                <div className="transition duration-500 hover:scale-105 flex flex-col overflow-hidden rounded-2xl items-left m-auto laptop:h-[400px] space-y-3 ">
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
                <Card cardObject={el} />
              ))
            )}
          </div>
        </div>
            ) : (

        <div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-full pb-12">
          <div className="mobile:flex w-full flex-1 flex-col laptop:grid grid-cols-3 grid-rows-1 gap-4 laptop:w-full">
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
