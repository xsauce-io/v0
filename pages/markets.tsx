import type { NextPage } from 'next';
import { Layout } from '../components/layout/Layout';
import Head from 'next/head';
import React from 'react';
import { MarketsContent } from '../components/markets/MarketsContent';

const Markets: NextPage = () => {
	//------------------ Rendered Content ------------------

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
						<MarketsContent />
					</div>
				</>
			</Layout>
		</div>
	);
};

export default Markets;
