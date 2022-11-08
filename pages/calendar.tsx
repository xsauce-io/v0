import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import { Skeleton } from '@mui/material';
import { Layout } from '../components/layout/layout';
import { ContentHeader } from '../components/layout/contentHeader';
import { CalendarCardList } from '../components/calendar/CalendarCardList';
import { CalendarHighlight } from '../components/calendar/CalendarHighlight';
import {
	useGetMarketBySku,
	useGetSneaker,
	useGetSneakerByLimit,
} from '../services/useRequests';
import {
	calendarUseGetSneakerByLimit,
	calendarUseGetSneakerSku,
} from '../services/dataVariables';

const Markets: NextPage = () => {
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
				showFinancialOverview={false}
				headerTitle={'Calendar'}
				logoColor={'#ffffff'}
			>
				<main className="flex w-full flex-1 flex-col text-center">
					{/*Sorting */}
					<ContentHeader
						title={'Upcoming Sneaker Drops'}
						icon={<img className={'h-[30px] w-[30px]'} src="/calendar.svg" />}
					/>

					<div className="space-y-10 mb-20">
						<CalendarHighlight />
						<CalendarCardList />
					</div>
				</main>
			</Layout>
		</div>
	);
};

export default Markets;
