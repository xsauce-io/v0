import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export const ExpandImageModal = ({ shoeImage }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div>

            <button className='text-[1rem] text-black font-SG border-2 p-1.5 px-2.5 border-black rounded-md hover:scale-105 ' variant="contained" onClick={handleClickOpen}>
                <img src="/expandIcon.svg" />
            </button>

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                PaperProps={{
                    style: { borderRadius: 20 }

                }}
            >
                <Box sx={{ bgcolor: 'white' }}>
                    <DialogActions>
                        <Button sx={{ color: '#0C1615', fontSize: '20px' }} onClick={handleClose}>&#10005;</Button>
                    </DialogActions>
                    <DialogContent >

                        <DialogContentText >

                            <img
                                src={shoeImage}
                                className="object-cover w-full h-full"
                            />

                        </DialogContentText>
                    </DialogContent>
                </Box>
            </Dialog>
        </div>
    );
}
