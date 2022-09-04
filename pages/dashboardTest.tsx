import type { NextPage } from 'next';
import { Nav } from '../components/nav';
import { Card } from '../components/cardWager';
import { Layout } from '../components/layout';
import { CardPreMarket } from '../components/cardPreMarket';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import React from 'react';
import CasinoIcon from '@mui/icons-material/Casino';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { Announcement } from '../components/announcement';
import {
	Box,
	IconButton,
	useBreakpointValue,
	Stack,
	Heading,
	Text,
	Container,
	Link,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { Tabs } from '../components/tabs';

const DashboardTest: NextPage = () => {
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

			{/* Example of layout Prop */}
			<Layout
				headerBg={'#0C1615'}
				headerColor={'white'}
				headerTitle={'$130 000'}
				tabHeader={'Positions'}
				logoColor={'#ACFF00'}
				showFinancialOverview={false}
			>
				<h1> Content</h1>
			</Layout>
		</div>
	);
};

export default DashboardTest;
