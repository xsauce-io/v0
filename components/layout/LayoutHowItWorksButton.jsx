import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { LayoutHowItWorksSlideshow } from './LayoutHowItWorksSlideshow';

const Images = [
	{
		href: '/hand.png',
		header: 'Welcome to the Xchange',
		text: 'Culture is now in your hands. Before you get started, we need to explain a few things.\nThe Xchange requires a web3 wallet to hold your funds. If you don’t have one yet, you’ll need to set one up. ',
	},
	{
		href: '/basics.png',
		header: 'The Basics',
		text: '1.) Connect your preferred web3 wallet \n2.) Select an index under the “Markets” tab. \n3.) Decide whether you think the price of the index will go up (Choose Go Long) or if the price of the index will go down (Choose Go Short)',
	},
	{
		href: '/magglass.png',
		header: 'Tune In',
		text: 'Watch for new drops, collabs or other news regarding the markets. It’s likely that this information will impact resale prices and the value of each index.',
	},
	{
		href: '/money.png',
		header: 'Cash Out',
		text: 'Choose “Withdraw” to close your position and redeem your profits',
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
								color: 'white',
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
