import type { NextPage } from 'next'
import { Nav } from '../components/nav'
import { Card } from '../components/card'
import { Feed } from '../components/feed'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from "react";
import axios from "axios";
import { RepeatOneSharp } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from 'react'
import CasinoIcon from '@mui/icons-material/Casino';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import QueryStatsIcon from '@mui/icons-material/QueryStats';


const Home: NextPage = () => {

  const options = {
    method: "GET",
    url: "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&brand=adidas&name=yeezy-350",
};

const [response, setResponse] = useState([] as any);

// fetch sneaker data
const getSneaker = async () => {
    axios
        .request(options)
        .then(function (response) {
            const array: any[] = [response.data.results[0], response.data.results[1], response.data.results[7]]
            setResponse(array);
            console.log(response.data.results);
        })
        .catch(function (error) {
            console.error(error);
        });
};

useEffect(() => {
    getSneaker();
}, []);

  return (

    //#F5DEB3 - Vanilla
    //#E5E5E5 - Gray
    
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#E5E5E5] ">
      <Head>
        <title>Xsauce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col text-center">
       <Nav/>
       <div className='flex flex-row items-center pt-4 pl-4 space-x-2'>
        <NewspaperIcon/>
       <h1 className='text-[25px] text-left font-semibold'>News</h1>
       </div>
       
       <Feed/>
       <div className='flex flex-row items-center pl-4 pb-6 space-x-2'>
       <CasinoIcon/>
       <h3 className='text-[25px] text-left font-semibold'>Wager</h3>
       </div>
       <div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-[1300px]">
        <div className="mobile:flex w-full flex-1 flex-col laptop:grid grid-cols-3 grid-rows-1 gap-4 laptop:w-[1252px]">
        {response.map((el: any) => (
            <Card cardObject={el}/>
            ))
          }
       </div>
       <a href='/markets'className='rounded bg-black text-[#ACFF00] hover:bg-gray font-bold font-xl p-3 outline'>See all &#8594;</a>
       </div>
       <div className='flex flex-row items-center pl-4 pt-4 pb-6 space-x-2'>
       <QueryStatsIcon/>
       <h1 className='text-[25px] text-left font-semibold'>Positions</h1>
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
  )
}

export default Home
