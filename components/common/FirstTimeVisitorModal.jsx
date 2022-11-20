import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { FirstTimeVisitorSlideshow } from './FirstTimeVisitorSlideshow';


const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const FirstTimeVisitorModal = () => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const firstTimeVisitor = localStorage.getItem('isFirstTimeVisitor');
		if (!firstTimeVisitor) {
			setOpen(true);
			localStorage.setItem('isFirstTimeVisitor', '1');
		}
	}, []);

	return (
		<Dialog
			open={open}
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
				<DialogActions>
					<Button
						sx={{
							color: '#ACFF00',
							fontSize: '30px',
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
				<DialogContent sx={{ padding: '18px' }}>
					<FirstTimeVisitorSlideshow />
				</DialogContent>
			</Box>
		</Dialog>
	);
};
