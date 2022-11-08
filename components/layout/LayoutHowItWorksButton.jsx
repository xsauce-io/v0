import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { LayoutHowItWorksSlideshow } from './LayoutHowItWorksSlideshow';

export const Images = [
	{
		href: '/hand.png',
		header: 'Welcome to the Xchange',
		text:
			'Culture is now in your hands. Before you get started, we need to explain a few things.',
	},
	{
		href: '/basics.png',
		header: 'The Basics',
		text:
			'1.) Select a market in the Live Markets tab to place a wager on. \n2.) Choose either YES or NO to represent which side you are on. \n3.) Select how many tickets you want to buy and submit your transaction!',
	},
	{
		href: '/magglass.png',
		header: 'Tune In',
		text:
			'Watch the live market for price updates and news. The buy-in price is dynamic and is determined by previous buys.',
	},
	{
		href: '/money.png',
		header: 'Cash Out',
		text:
			'If you are on the winning side of a wager when it resolves you will receive back what you put in + your share of the winnings.',
	},
];

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const LayoutHowItWorksButton = ({ title }) => {
	const [open, setOpen] = React.useState(false);
	const [resetSlideshow, setResetSlideshow] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
		mixpanelTrackProps('Learn How it Works', { type: 'Contemplation' });
		setResetSlideshow(false);
	};

	const handleClose = () => {
		setOpen(false);
		setResetSlideshow(true);
	};

	return (
		<div className="flex flex-col h-full  tablet:w-[50%] laptop:w-[45%]  mobile:w-full rounded-[10px] text-black">
			<button
				className="bg-white rounded-[10px] py-5 pr-10 pl-5 w-full border-b-[1px] border-[#0C1615] hover:opacity-40 flex  items-center "
				onClick={handleClickOpen}
			>
				<img className="flex-2" src="/openbook.svg" />

				<p className="px-2 text-sm flex-1 font-Inter">
					Learn how the Xchange works
				</p>

				<img className="flex-2" src="/slimRightArrow.svg" />
			</button>

			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				PaperProps={{
					style: {
						borderRadius: 30,
						width: '100%',
						height: 'fit-content',
						overflow: 'clip',
					},
				}}
				maxWidth="sm"
			>
				<Box sx={{ bgcolor: '#0C1615' }} width={'100%'} height={'100%'}>
					<DialogActions
						sx={{
							display: 'flex',

							padding: 0,
						}}
					>
						<Button
							sx={{
								color: '#ACFF00',
								fontSize: '20px',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'right',
								paddingRight: '18px',
							}}
							onClick={handleClose}
						>
							&#10005;
						</Button>
					</DialogActions>
					<DialogContent
						sx={{
							padding: '15px',
							display: 'flex',
						}}
					>
						<LayoutHowItWorksSlideshow content={Images} reset={resetSlideshow} />
					</DialogContent>
				</Box>
			</Dialog>

		</div>
	);
};
