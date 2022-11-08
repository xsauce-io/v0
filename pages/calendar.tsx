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

	const SORT_BY_STATES = {
		RELEASE_DATE: 'releaseDate',
		NAME: 'name',
		RETAIL_PRICE: 'retailPrice',
	};

	const FILTER_BY_STATES = {
		LIVE: 'live',
		EXPIRED: 'expired',
		NONE: 'none',
	};

	const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	// -------------------- Data Fetching ------------------

	const { data: highlightSneaker, error } = useGetSneaker(
		calendarUseGetSneakerSku
	);
	const { data: sneakersData, error: sneakersDataError } = useGetSneakerByLimit(
		calendarUseGetSneakerByLimit
	);

	// ------------------- State Variable --------------------

	const [response, setResponse] = useState(sneakersData);
	const [responseError, setResponseError] = useState(sneakersDataError);
	const [highlight, setHighlight] = useState(highlightSneaker);
	const [sortBy, setSortBy] = useState({ state: SORT_BY_STATES.RELEASE_DATE });
	const [filterBy, setFilterBy] = useState({
		state: FILTER_BY_STATES.NONE,
	});

	const [isAscending, setIsAscending] = useState(true);

	//------------------ Use Effect / Use memo ------------------

	useEffect(() => {
		setResponse(sneakersData);
		setHighlight(highlightSneaker);
	}, [sneakersData, highlightSneaker, sneakersDataError]);

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
						<CalendarHighlight index={1} cardObject={highlight} />
						<CalendarCardList />
					</div>
				</main>
			</Layout>
		</div>
	);
};

export default Markets;
