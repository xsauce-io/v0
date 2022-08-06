import type { NextPage } from 'next'
import { Nav } from '../components/nav'
import { Card } from '../components/card'
import { Announcement } from '../components/announcement'
import Head from 'next/head'
import Image from 'next/image'


const Home: NextPage = () => {
  return (
    
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#E5E5E5]">
      <Head>
        <title>Xsauce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col text-center">
       <Nav/>
       <Announcement/>
       <div className="sm:w-full p-[30px]">
        <div className="flex w-full flex-1 flex-col">
       <Card/>
       <Card/>
       </div>

       </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
