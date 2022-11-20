import type { NextPage } from 'next';
import { Layout } from '../components/layout/Layout';
import Head from 'next/head';
import React from 'react';
import { DripFeedTopStories } from '../components/dripFeed/DripFeedTopStories';
import { DripFeedCardList } from '../components/dripFeed/DripFeedCardList';
import { ContentHeader } from '../components/common/ContentHeader';
import { gql } from "@apollo/client";
import client from "../lib/apollo-client";

// export const getServerSideProps = async () => {


// 	try {
// 		const { data: saucedSelectionSneakersData, error: saucedSelectionSneakerDataError, loading: loading } =  useGetSneakersByDisplayGroupQuery({
// 			  variables: {
// 			     displayGroup: DisplayGroup.SaucedSelection,
// 			   },
// 		});
// 		while (loading) {
// 			//
// 		}
// 		if (saucedSelectionSneakersData ) {
// 			const formattedSaucedSelectionSneakersData = saucedSelectionSneakersData.values.map((el: any) => {
// 				return el.sneaker.results[0]
// 			})
// 			console.log("formatted",formattedSaucedSelectionSneakersData)
// 			return {

// 				props: {
// 					_saucedSelectionSneakersData: formattedSaucedSelectionSneakersData,
// 					_saucedSelectionSneakerDataError: saucedSelectionSneakerDataError
// 				},
// 			}
// 		} else {
// 			throw("Sauced Selection Failed to Fetch")
// 		}

// 	} catch (error: any) {
// 		return {
// 			//TODO: Handle fetching errors separately
// 			props: {
// 				_saucedSelectionDataError: error.message,
// 			},
// 		}
// 	}


// }

// type PageProps = {
// 	_saucedSelectionSneakersData: any,
// 	_saucedSelectionSneakersDataError: any,
// }

const DripFeed: NextPage = ({ }) => {
	// -------------------- Rendered Content ------------------



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
					<DripFeedCardList  />
				</>
			</Layout>
		</div>
	);
};

export default DripFeed;
