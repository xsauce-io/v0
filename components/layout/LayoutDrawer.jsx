import React, { useEffect, useMemo } from 'react';
import { Drawer, Box, Typography } from '@mui/material';
import { useState } from 'react';

import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';

export const LayoutDrawer = ({ children, drawerIconColor, backgroundColor }) => {
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
							stroke={drawerIconColor ? drawerIconColor : '#FFFFFF'}
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
				PaperProps={{ backgroundColor: '#000' }}
				anchor="right"
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
			>
				<Box
					p={4}
					width="250px"

					textAlign="left"
					role="presentation"
					backgroundColor={backgroundColor ? backgroundColor : "#fff"}
					sx={{ height: '100%' }}
				>



					{children}
				</Box>
			</Drawer>
		</>
	);
};
