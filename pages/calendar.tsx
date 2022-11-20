import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Layout } from '../components/layout/Layout';
import { ContentHeader } from '../components/common/ContentHeader';
import { CalendarCardList } from '../components/calendar/CalendarCardList';
import { CalendarHighlight } from '../components/calendar/CalendarHighlight';
import { gql } from "@apollo/client";
import client from "../lib/apollo-client";

// export const getServerSideProps = async () => {

// 	try {
// 		const { data: highlightSneakerData } = await client.query({
// 			query: gql`
// 				query getSneakerByTitle($title: String!) {
// 					values: sneaker(where: {title: $title}, stage: PUBLISHED) {
// 						sneaker {
// 						count
// 						results
// 						{
// 							brand
// 							name
// 							sku
// 							gender
// 							releaseDate
// 							colorway
// 							name
// 							retailPrice
// 							releaseYear
// 							retailPrice
// 							estimatedMarketValue
// 							image {
// 							original
// 							}
// 							links {
// 							stockX
// 							stadiumGoods
// 							flightClub
// 							}

// 						}
// 					}
// 					}
// 				}
// 			`,
// 			variables: {
// 				title: "CalendarHighlightSneaker"
// 			}
// 		});

// 		const { data: calendarSneakerCollectionData } = await client.query({
// 			query: gql`
// 				query getSneakerCollectionByTitle($title: String!) {
// 					values: sneakerCollection(where: { title: $title}, stage:  PUBLISHED) {
// 						sneakers {
// 						count
// 						results{
// 							brand
// 							name
// 							sku
// 							gender
// 							releaseDate
// 							colorway
// 							name
// 							retailPrice
// 							releaseYear
// 							retailPrice
// 							estimatedMarketValue
// 							image {
// 							original
// 							}
// 							links {
// 							stockX
// 							stadiumGoods
// 							flightClub
// 							}
// 						}
// 						}
// 					}
// 					}

// 			`,
// 			variables: {
// 				title: "CalendarSneakerCollection"
// 			}
// 		});

// 		return {
// 			props: {
// 				_highlightSneakerData: highlightSneakerData.values.sneaker.results[0],
// 				_calendarSneakerCollectionData: calendarSneakerCollectionData.values.sneakers.results
// 			},
// 		}
// 	} catch (error: any) {
// 		return {
// 			//TODO: Handle fetching errors separately
// 			props: {
// 				_highlightSneakerDataError: error.message,
// 				_calendarSneakerCollectionDataError: error.message
// 			},
// 		}
// 	}


// }

// type PageProps = {
// 	_highlightSneakerData: any,
// 	_highlightSneakerDataError: any,
// 	_calendarSneakerCollectionData: any,
// 	_calendarSneakerCollectionDataError: any,
// }


const Calendar: NextPage = () => {

	return (
		<div>
			<Head>
				<title>Xsauce | Calendar </title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" type="favicon" href="/greenDrop.svg" />
			</Head>

			<Layout
				headerSubtitle={'RELEASE SCHEDULE'}
				showHowItWorksButton={true}
				headerTitle={'Calendar'}

			>
				<main className="flex w-full flex-1 flex-col text-center">
					{/*Sorting */}
					<ContentHeader
						title={'Upcoming Sneaker Drops'}
						icon={<img className={'h-[30px] w-[30px]'} src="/calendar.svg" />}
					/>

					<div className="space-y-10 mb-20">
						{/* <CalendarHighlight highlightSneakerData={_highlightSneakerData} highlightSneakerDataError={_highlightSneakerDataError} />
						<CalendarCardList calendarSneakerCollectionData={_calendarSneakerCollectionData} calendarSneakerCollectionDataError={_calendarSneakerCollectionDataError} />
					*/}</div>
				</main>
			</Layout>
		</div>
	);
};

export default Calendar;
