import React, { useEffect, useMemo } from 'react';
import { Drawer, Box, Typography } from '@mui/material';
import { useState } from 'react';

import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';
import {
	Laptop,
	ScreenRotationAltSharp,
	Screenshot,
} from '@mui/icons-material';

export const LocalDrawer = ({ children }) => {
	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};

	const { width } = useWindowDimensions();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<>
			{width < screens.smlaptop ? (
				<div className="basis-1/3 flex justify-end">
					<button
						className="mobile:block p-2 tablet:p-5 text-white bg-[inherit] rounded hover:text-[#ACFF00]/75 transition"
						onClick={() => setIsDrawerOpen(true)}
					>
						<span className="sr-only">Toggle menu</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-5 h-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="#000000"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			) : (
				<></>
			)}
			<Drawer
				PaperProps={{
					sx: {
						backgroundColor: '#0C1615',
					},
				}}
				anchor="right"
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
			>
				<div className="h-20 border-b-[1px] border-white  mx-8 "></div>
				<Box
					p={4}
					width="250px"
					textAlign="left"
					role="presentation"
					sx={{ backgroundColor: '#0C1615', height: '100' }}
				>
					<ul className="space-y-8 text-l font-SG pb-6">
						<li>
							<a
								className="text-white transition hover:text-[#ACFF00]"
								href="/"
							>
								Home
							</a>
						</li>

						<li>
							<a
								className="text-white transition hover:text-[#ACFF00]"
								href="/calendar"
							>
								Calendar
							</a>
						</li>

						<li>
							<a
								className="text-white transition hover:text-[#ACFF00]"
								href="/livemarkets"
							>
								Live Market
							</a>
						</li>

						<li>
							<a
								className="text-white transition hover:text-[#ACFF00]"
								href="/redeem"
							>
								Cash Out
							</a>
						</li>
						<li>
							<a
								className="text-white transition hover:text-[#ACFF00]"
								href="/portfolio"
							>
								Portfolio
							</a>
						</li>
					</ul>

					{children}
				</Box>
			</Drawer>
		</>
	);
};
