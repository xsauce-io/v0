import type { NextPage } from 'next';
import { Layout } from '../../layout/layout';
import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import { FreePrediction } from '../../freePlay-components/freePrediction';
import {
	useGetMarketBySku,
	useGetSneaker,
} from '../../../services/useRequests';
import { Banner } from '../../freePlay-components/Banner';

// Here we have used react-icons package for the icons
// And react-slick as our Carousel Lib
import { ContentHeader } from '../../layout/contentHeader';
import toast from 'react-hot-toast';
import { ToastNotification } from '../../common/Toast';
const FreePlay: NextPage = () => {
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
	const { data: s1, error: e1 } = useGetSneaker('DH7138-006');
	const { data: s2, error: e2 } = useGetSneaker('DR8869-200');
	const { data: s3, error: e3 } = useGetSneaker('DR0501-101');
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
				<title>Xsauce | Free Play</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" type="favicon" href="/greenDrop.svg" />
			</Head>
			<Layout
				headerSubtitle={'PREDICT'}
				headerTitle={'Free Play'}
				showHowItWorksButton={true}
				showFinancialOverview={false}
			>
				<>
					<Banner />
					<ContentHeader
						title={'Free Play'}
						icon={<img src="/greenDrop.svg" />}
					/>
					<div className="w-full">
						<FreePrediction />
					</div>
				</>
			</Layout>
		</div>
	);
};
export default FreePlay;
