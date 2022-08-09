import type { NextPage } from 'next';
import { Nav } from '../../../components/nav';
// import { Card } from '../components/card'
import { Wagerbtn } from '../../../components/button';
import { Wagerinput } from '../../../components/wagerinput';
import { Announcement } from '../../../components/announcement';
import { Durationtabs } from '../../../components/durationtabs';
import { WagerCard } from '../../../components/wagerCard';
import { useRouter } from 'next/router'
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from "react";
import axios from "axios";

const WagerPage: NextPage = ({cardObject}) => {

  const router = useRouter()

  const {sku}= router.query

  console.log(sku)

  const skuUrl = 'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=' + sku

  const options = {
    method: "GET",
    url: skuUrl
};

const [response, setResponse] = useState([] as any);

// fetch sneaker data
const getSneaker = async () => {
    axios
        .request(options)
        .then(function (response) {
          const array: any[] = response.data.results
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
        {response.map((el: any) => (
            <WagerCard  cardObject={el}/>
            ))
        }
					
					
        <h3 className="text-left pb-4 text-xl font-medium">
						1.) Confirm Wager Conditions
					</h3>
          <h2 className='font-bold text-lg text-left'> Hourly Wager: Price {'>'} $400</h2>
          
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

export default WagerPage;
