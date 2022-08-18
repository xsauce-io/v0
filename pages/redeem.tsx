import type { NextPage } from 'next'
import { Nav } from '../components/nav'
import { Card } from '../components/cardWager'
import { Announcement } from '../components/announcement'
import Head from 'next/head'
import React from 'react'
import { Skeleton } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'



const Redeem: NextPage = () => {

  let [isLoading, setisLoading] = useState(true as boolean);
  let [marketResponse1, setMarketResponse1] = useState([] as any);
  let [marketResponse2, setMarketResponse2] = useState([] as any);
  let [marketResponse3, setMarketResponse3] = useState([] as any);
  let [toggled, setisToggled] = useState('1' as string);

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
          setMarketResponse1([
            obj1.data.results[0],
          ]);
          setMarketResponse2([
            obj2.data.results[0],
          ]);
          setMarketResponse3([
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

  const handleChange = (event: any) => {
    if (event.target.value === '1') {
    setisToggled('1')
    }

    else if (event.target.value === '2') {
      setisToggled('2')

    }

    else if (event.target.value === '3') {
      setisToggled('3')

    }
  }


  useEffect(() => {
    getSneaker2();
  }, []);

 


  return (

    //#F5DEB3 - Vanilla
    //#E5E5E5 - Gray
    
    <div className="flex min-h-screen w-screen flex-col bg-gradient-to-b from-lime-400 via-gray-100 to-white">
      <Head>
        <title>Xsauce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Announcement/>
       <Nav/>
      <main className="flex w-full items-center justify-center flex-col">
      
      <form className="flex w-full items-center justify-center flex-col space-y-5">
      <div className="flex w-full items-center justify-center flex-col">
      
  <label className='font-SG text-[25px] pb-3' htmlFor="markets">Choose a market:</label>
  <select className='mobile:w-3/4 font-SG text-[15px] mb-3 p-4 rounded focus:outline-none laptop:w-1/3 font-SG text-[15px] mb-3 p-4 rounded focus:outline-none  ' onChange={handleChange} id="markets" name="markets">
    <option value="1">Nike Air Max 1 Patta Denim</option>
    <option value="2">Jordan 1 Retro High Homage to Home Chicago (Numbered)</option>
    <option value="3">Nike Air Max 90 OFF-White Desert Ore</option>
  </select>
</div>
{ toggled === '1'? (
  <div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-[1300px]">
          <div className="mobile:flex w-full flex-1 flex-col laptop:w-[500px]">
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
                </React.Fragment>
                ) : (
              marketResponse1.map((el: any) => <Card cardObject={el} />) )}
      </div>
      </div>
) : toggled == '2' ? ( 
<div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-full">
<div className="mobile:flex w-full flex-1 flex-col laptop:w-[500px]">
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
      </React.Fragment>
      ) : (
    marketResponse2.map((el: any) => <Card cardObject={el} />) )}
</div>
</div>
) : <div className="mobile:w-full px-[20px] flex flex-col space-y-4 laptop:px-[80px] flex flex-row items-center space-x-4 w-[1300px]">
<div className="mobile:flex w-full flex-1 flex-col laptop:w-[500px]">
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
      </React.Fragment>
      ) : (
    marketResponse3.map((el: any) => <Card cardObject={el} />) )}
</div>
</div>
}
      <button id='redeem' className= "h-[3rem] w-[8rem] text-[15px] px-4 text-white bg-black rounded shadow-md hover:bg-[#ACFF00] transition duration-300 hover:text-black" type="submit">
    Redeem </button>

      </form>
      
      
      </main>

      
    </div>
  )
}

export default Redeem