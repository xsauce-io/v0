import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Layout } from '../components/layout/Layout';
import { ContentHeader } from '../components/common/ContentHeader';
import { CalendarCardList } from '../components/calendar/CalendarCardList';
import { CalendarHighlight } from '../components/calendar/CalendarHighlight';
import { gql } from "@apollo/client";
import client from "../lib/apollo-client";
import { interfaces } from '../typechain-types/contracts';

export const getServerSideProps = async () => {
	try {
		const { data } = await client.query({
			query: gql`
			query Sneakers {
						sneakers {
							sneaker {
							count
							results {
								brand
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
		});

		return {
			props: {
				data: data.sneakers[0].sneaker.results[0]
			},
		}
	} catch (error: any) {
		return {
			props: {
				error: error.message
			},
		}
	}


}

type PageProps = {
	data: any,
	error:any
}


const Calendar: NextPage<PageProps> = ({ data, error }) => {
	// ------------------- Constants ---------------------

	// -------------------- Data Fetching ------------------

	// ------------------- State Variable --------------------

	//------------------ Use Effect / Use memo ------------------

	return (
		<div>
			<Head>
				<title>Xsauce | Calender </title>
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
						<CalendarHighlight highlightSneakerData={data} />
						<CalendarCardList />
					</div>
				</main>
			</Layout>
		</div>
	);
};

export default Calendar;
