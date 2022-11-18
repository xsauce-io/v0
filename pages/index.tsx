import type { NextPage } from 'next';
import { Layout } from '../components/layout/Layout';
import Head from 'next/head';
import React from 'react';
import { DripFeedTopStories } from '../components/dripFeed/DripFeedTopStories';
import { DripFeedCardList } from '../components/dripFeed/DripFeedCardList';
import { ContentHeader } from '../components/common/ContentHeader';
import { gql } from "@apollo/client";
import client from "../lib/apollo-client";

export const getServerSideProps = async () => {

	try {
		const { data: saucedSelectionSneakersData } = await client.query({
			query: gql`
				query getSneakersByDisplayGroup($displayGroup: DisplayGroup) {
					values: sneakers(where: {displayGroup: $displayGroup}, stage: PUBLISHED) {
						sneaker {
						results
						{
							brand
							name
							sku
							gender
							releaseDate
							colorway
							name
							retailPrice
							releaseYear
							retailPrice
							estimatedMarketValue
							image {
							original
							}
							links {
							stockX
							stadiumGoods
							flightClub
							}
						}
						}
					}
					}

			`,
			variables: {
				displayGroup: "saucedSelection"
			}
		});

		const formattedSaucedSelectionSneakersData = saucedSelectionSneakersData.values.map((el: any) => {
			return el.sneaker.results[0]
		})
		console.log("formatted",formattedSaucedSelectionSneakersData)
		return {

			props: {
				_saucedSelectionSneakersData: formattedSaucedSelectionSneakersData,
			},
		}
	} catch (error: any) {
		return {
			//TODO: Handle fetching errors separately
			props: {
				_saucedSelectionDataError: error.message,
			},
		}
	}


}

type PageProps = {
	_saucedSelectionSneakersData: any,
	_saucedSelectionSneakersDataError: any,
}

const DripFeed: NextPage<PageProps> = ({_saucedSelectionSneakersData, _saucedSelectionSneakersDataError }) => {
	// -------------------- Rendered Content ------------------

	console.log("sauced baby", _saucedSelectionSneakersData)
	console.log("sauced error baby",_saucedSelectionSneakersDataError )

	return (
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

			<Layout
				headerSubtitle={'GET THE XSAUCE'}
				headerTitle={'Market News'}
				showHowItWorksButton={true}
			>
				<>
					<ContentHeader
						title={'Top Stories'}
						icon={<img src="/news.svg" />}
						flexColumn
					/>
					<div className="divide-y-2 divide-black">
						<DripFeedTopStories  />
						<ContentHeader
							title={'Sauced Selections'}
							flexColumn
							icon={<img src="/greenDrop.svg" />}
						/>
					</div>
					<DripFeedCardList saucedSelectionSneakersData={_saucedSelectionSneakersData} saucedSelectionSneakersDataError={_saucedSelectionSneakersDataError} />
				</>
			</Layout>
		</div>
	);
};

export default DripFeed;
