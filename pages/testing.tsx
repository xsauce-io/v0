import type { NextPage } from 'next'
import { Nav } from '../components/nav'
import { Card } from '../components/cardWager'
import { Announcement } from '../components/announcement'
import Head from 'next/head'
import {Onboard} from '../components/onBoardingModal'
import Carousel from 'nuka-carousel'



const Markets: NextPage = () => {




  return (

    //#F5DEB3 - Vanilla
    //#E5E5E5 - Gray
    
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#E5E5E5]">
      <Head>
        <title>Xsauce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col text-center">
      <Announcement/>
       <Nav/>

      
       {/* <Onboard/> */}
      


       
      </main>

      
    </div>
  )
}

export default Markets
