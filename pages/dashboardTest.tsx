import type { NextPage } from 'next';
import { Dashboard } from '../components/dashboard';
import {Layout } from '../components/layout'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';

import React from 'react';


const Home: NextPage = () => {
	let [premarketResponse, setAuctionResponse] = useState([] as any);
	let [isLoading, setisLoading] = useState(true as boolean);
	let [toggled, setisToggled] = useState(true as boolean);


	const getSneaker2 = async () => {
		Promise.all([
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=B75571'
			),
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=AO4606-001'
			),

			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DR9654-100'
			),
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DV2122-400'
			),
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=HP7870'
			),
			axios.get(
				'https://7004dufqxk.execute-api.us-east-1.amazonaws.com/v2/sneakers?limit=10&sku=DH7138-006'
			),
		])

			.then(
				axios.spread((obj1, obj2, obj3, obj4, obj5, obj6) => {
					setAuctionResponse([
						obj1.data.results[0],
						obj2.data.results[0],
						obj3.data.results[0],
						obj4.data.results[0],
						obj5.data.results[0],
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
		<div>
			<Head>
				<title>Xsauce</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<Layout>
      <div className="flex flex-col w-full">
      <div className="flex flex-row py-4 text-[14px] font-Inter items-center w-full">
          <div className="flex flex-row pl-4 w-[30%]">
            Position
            <img className="w-[3.4%]" src="up-down.svg"/>
        
          </div>

          <div className="flex flex-row w-[18.5%]">
            Shares
            <img className="w-[5%]" src="up-down.svg"/>
          </div>

          <div className="flex flex-row w-[21.5%]">
            Total Price
            <img className="w-[5%]" src="up-down.svg"/>
          </div>

          <div className="flex flex-row w-[20%]">
            Return
            <img className="w-[5%]" src="up-down.svg"/>
          </div>


          <div className="flex flex-row w-[10%] pr-4">
            Contract
            <img className="w-[10%]" src="up-down.svg"/>
          </div>

          </div>
      {premarketResponse.map((el: []) => <Dashboard positions= {el}/>) }
      
       </div>
			
			</Layout>
		</div>
	);
};

export default Home;
