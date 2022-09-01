import type { NextPage } from 'next'
import { Nav } from '../components/nav'
import { LiveMarketCard } from '../components/liveMarketsCard'
import { Announcement } from '../components/announcement'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from "react";
import axios from "axios";
import { RepeatOneSharp } from "@mui/icons-material";
import { Skeleton } from "@mui/material";


const Markets: NextPage = () => {

  const options = {
    method: "GET",
    url: "https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&brand=adidas&name=yeezy-350&gender=men",
};

const [response, setResponse] = useState([]);

// fetch sneaker data
const getSneaker = async () => {
    axios
        .request(options)
        .then(function (response) {
            setResponse(response.data.results);
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
    
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#F8F8F8]">
      <Head>
        <title>Xsauce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col text-center">
      <Announcement/>
       <Nav/>
  
       <div className='flex flex-row  w-full bg-[#8B8B8B] bg-opacity-20 space-x-14 justify-center pb-14 pt-14'>
        
       <div className='flex flex-col font-SG items-center py-3 h-[350px] w-[290px] rounded-md bg-[#F9F9F9] shadow-[8px_12px_18px_17px_rgba(0,0,0,0.3)]'>
        <img src='/jordansvg.svg' className='h-[120px] bg-[#EAEAEA] w-[130px] my-4 p-4 rounded-full'></img>
        <h1 className='text-[25px]'> Total Live <br/> Markets </h1>
        <h1 className='text-[60px] text-[#630606] m-0 flex flex-col items-center'>3</h1>
       
        </div>
        <div className='flex flex-col font-SG items-center py-3 h-[350px] w-[290px] rounded-md bg-[#F9F9F9] shadow-[8px_12px_18px_17px_rgba(0,0,0,0.3)]'>
        <img src='/octobers.svg' className='h-[120px] bg-[#EAEAEA] w-[130px] my-4 p-4 rounded-full'></img>
        <h1 className='text-[25px]'> Total <br/>Markets Value</h1>
        <h1 className='text-[60px] text-[#630606] m-0 flex flex-col items-center'>$1.5 M</h1>
       
        </div>
        <div className='flex flex-col font-SG items-center py-3 h-[350px] w-[290px] rounded-md bg-[#F9F9F9] shadow-[8px_12px_18px_17px_rgba(0,0,0,0.3)]'>
        <img src='/jordansvg.svg' className='h-[120px] bg-[#EAEAEA] w-[130px] my-4 p-4 rounded-full'></img>
        <h1 className='text-[25px]'> Total <br/> Trades </h1>
        <h1 className='text-[60px] text-[#630606] m-0 flex flex-col items-center'>420</h1>
       
        </div>

        <div className='flex flex-col font-SG items-center py-3 h-[350px] w-[290px] text-[#FED955] rounded-md bg-[#251E1E] shadow-[8px_12px_18px_17px_rgba(0,0,0,0.3)]'>
        <img src='/11s.svg' className='h-[120px] bg-[#EAEAEA] w-[130px] my-4 p-4 rounded-full'></img>
        <h1 className='text-[25px]'> Total <br/> Redeemed </h1>
        <h1 className='text-[60px] text-[#EAEAEA] m-0 flex flex-col items-center'>300</h1>
       
        </div>



       </div>
       
       <h1 className='text-[40px] font-SG font-semibold p-4'>Live <span className='text-[#630606]'>Markets</span></h1>
     
        <div className="laptop:grid grid-cols-3 grid-rows-1 gap-y-14 place-items-center gap-x-1 mb-10 pt-10">

          {response.map(el => (
            <LiveMarketCard cardObject={el}/>
            ))
          }

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

export default Markets
