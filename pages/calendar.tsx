import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../components/layout/Layout';
import { ContentHeader } from '../components/common/ContentHeader';
import { CalendarCardList } from '../components/calendar/CalendarCardList';
import { CalendarHighlight } from '../components/calendar/CalendarHighlight';


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
						icon={<img className={'h-[30px] w-[30px]'} src="/calendar-black-icon-svg.svg" />}
					/>

					<div className="space-y-10 mb-20">
						 <CalendarHighlight/>
						 <CalendarCardList />
					</div>
				</main>
			</Layout>
		</div>
	);
};

export default Calendar;
