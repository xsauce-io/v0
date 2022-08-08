import type { NextPage } from 'next';
import { Nav } from '../components/nav';
// import { Card } from '../components/card'
import { Wagerbtn } from '../components/button';
import { Wagerinput } from '../components/wagerinput';
import { Announcement } from '../components/announcement';
import { Durationtabs } from '../components/durationtabs';
import { WagerCard } from '../components/wagerCard';
import Head from 'next/head';
import Image from 'next/image';

const Wager: NextPage = () => {
	return (
		<div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#E5E5E5]">
			<Head>
				<title>Xsauce</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex w-full flex-1 flex-col text-center">
      <Announcement />
				<Nav />
				
				<Durationtabs />
				<div className="p-5">
					<WagerCard />
					{/* <div className="text-left relative pb-4">
          <div className='absolute left-5 top-5'>
            <h3 className='font-bold'>Adidas Yeezy Boost 350</h3>
            <p className='font-normal'>ID:GW3773</p>
          </div>
          <img className="rounded-lg" src='https://images.stockx.com/360/adidas-Yeezy-Boost-350-V2-MX-Oat/Images/adidas-Yeezy-Boost-350-V2-MX-Oat/Lv2/img01.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635746118&h=320&q=75'/>
        </div> */}
        <h3 className="text-left pt-5 pb-3 text-xl font-medium">
						1.) Confirm Wager Conditions
					</h3>
					<h3 className="text-left pt-5 pb-3 text-xl font-medium">
						2.) Select Wager Direction
					</h3>
					<Wagerbtn />
					<h3 className="text-left pt-5 pb-2 text-xl font-medium">
						3.) Wager Amount
					</h3>
					<Wagerinput />
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
	);
};

export default Wager;
