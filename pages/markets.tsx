import type { NextPage } from 'next';
import { Layout } from '../components/layout/layout';
import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';

import React from 'react';
import { FreePrediction } from '../components/freePlay/freePrediction';
import { useGetMarketBySku, useGetSneaker } from '../services/useRequests';
import { Banner } from '../components/freePlay/banner';

// Here we have used react-icons package for the icons
// And react-slick as our Carousel Lib

import { ContentHeader } from '../components/layout/contentHeader';
import { Skeleton } from '@mui/material';
import toast from 'react-hot-toast';
import { ToastNotification } from '../components/common/toast';
import {
	marketsUseGetSneakerSku1,
	marketsUseGetSneakerSku2,
	marketsUseGetSneakerSku3,
} from '../services/dataVariables';

const Markets: NextPage = () => {
	// ------------------- Constants ---------------------
	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};
	const SORT_BY_STATES = {
		RELEASE_DATE: 'releaseDate',
		NAME: 'name',
		RETAIL_PRICE: 'retailPrice',
	};

	const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];

	// ------------------- State Variable --------------------
	const { data: s1, error: e1 } = useGetSneaker(marketsUseGetSneakerSku1);
	const { data: s2, error: e2 } = useGetSneaker(marketsUseGetSneakerSku2);
	const { data: s3, error: e3 } = useGetSneaker(marketsUseGetSneakerSku3);

	const [response, setResponse] = useState([] as any);
	const [storedPersistentResponse, setStoredPersistentResponse] = useState(
		[] as any[]
	);

	//filter state mana
	const [isAscending, setIsAscending] = useState(true);
	const [sortBy, setSortBy] = useState({ state: SORT_BY_STATES.RELEASE_DATE });

	// -------------------- Data Fetching ------------------

	//------------------ Use Effect / Use memo ------------------
	useEffect(() => {
		setResponse([s1, s2, s3]);
		setStoredPersistentResponse([s1, s2, s3]);
	}, [s1, s2, s3]);

	useEffect(() => {
		if (e1 || e2 || e3) {
			toast.custom(
				(t) => (
					<ToastNotification
						message={'An Internal Error has Occurred'}
						subMessage={
							'The data cannot be currently loaded. Please try again later.'
						}
						icon={<img src="/alertCircle.svg" />}
						t={t}
					/>
				),
				{ duration: 7000, id: 'data-not-loading-live' }
			);
		}
	}, [e1, e2, e3]);

	return (
		<div>
			<Head>
				<title>Xsauce | Markets</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" type="favicon" href="/greenDrop.svg" />
			</Head>

			<Layout
				headerSubtitle={'INVEST'}
				headerTitle={'Markets'}
				showHowItWorksButton={true}
				showFinancialOverview={false}
				logoColor={'#FFFFFF'}
			>
				<>
					<div className="w-full mt-10">
						<FreePrediction />
					</div>
				</>
			</Layout>
		</div>
	);
};

export default Markets;
