import type { NextPage } from 'next';
import { Nav } from '../../../components/nav';
// import { Card } from '../components/card'
import { Wagerbtn } from '../../../components/button';
import { Wagerinput } from '../../../components/wagerinput';
import { Announcement } from '../../../components/announcement';
import { WagerCard } from '../../../components/wagerCard';
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip } from '@mui/material';
import {Countdown} from '../../../components/countdown'
import InfoIcon from '@mui/icons-material/Info';
import Head from 'next/head';

const WagerPage: NextPage = (cardObject) => {

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
				
				{/* <Durationtabs /> */}
        <h3 className="flex flex-row items-center justify-center text-left p-4 text-[25px] font-medium">
         
					🏁 Pre-Release Auction
					</h3>
          <Countdown/>
				<div className="p-5">
        {response.map((el: any) => (
            <WagerCard  cardObject={el}/>
            ))
        }
					
					<div className='mobile:flex flex-col space-y-6 justify-center items-middle pt-6'>
        <h3 className="mobile:text-[18px] font-medium text-center">
					Condition: Resell Price {'>'} $400<br></br> Closes: 08/20/2022 12:00 PM EST
					</h3>
          <h3 className="mobile:text-[25px] font-medium flex flex-row justify-center">
          Price : 50¢
          <Tooltip
            title="Pre-Release contracts are 50¢ regardless of direction" arrow>
          <InfoIcon sx={{fontSize:'18px'}}/>
          </Tooltip>
          </h3>
          
			
					<Wagerinput />
          </div>
				</div>
			</main>

			{/* <footer className="flex h-24 w-full items-center justify-center border-t">
			</footer> */}
		</div>
	);
};

export default WagerPage;
