import type { NextPage } from 'next';
import { Layout } from '../components/layout/layout';
import Head from 'next/head';
import React from 'react';
import { DripFeedTopStories } from '../components/dripFeed/DripFeedTopStories';
import { DripFeedCardList } from '../components/dripFeed/DripFeedCardList';
// Here we have used react-icons package for the icons
// And react-slick as our Carousel Lib
import { ContentHeader } from '../components/layout/contentHeader';

const DripFeed: NextPage = () => {
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
				showFinancialOverview={false}
				logoColor={'#FFFFFF'}
			>
				<>
					<ContentHeader
						title={'Top Stories'}
						icon={<img src="/news.svg" />}
						flexColumn
					/>
					<div className="divide-y-2 divide-black">
						<DripFeedTopStories />
						<ContentHeader
							title={'Sauced Selections'}
							flexColumn
							icon={<img src="/greenDrop.svg" />}
						/>
					</div>
					<DripFeedCardList />
				</>
			</Layout>
		</div>
	);
};

export default DripFeed;
