import React from "react";
import { Onboard } from "./onBoardingModal";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide';
import { Slideshow } from "./slideshow";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const HowItWorksButton = ({ title }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className="flex flex-col h-full  tablet:w-[50%] laptop:w-[45%]  mobile:w-full rounded-[10px] text-black">

            <button className='bg-white rounded-t-[10px] py-5 pr-10 pl-5 w-full border-b-[1px] border-[#0C1615] hover:opacity-40 flex  items-center ' onClick={handleClickOpen}>
                <img className="flex-2" src="/openbook.svg" />

                <p className="px-2 text-sm flex-1 font-Inter">Learn how the Xchange works</p>

                <img className="flex-2" src="/slimRightArrow.svg" />
            </button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                PaperProps={{
                    style: { borderRadius: 30, width: '100%', height: 'fit-content' }

                }}
                maxWidth='sm'
            >
                <Box sx={{ bgcolor: 'black' }} width={'100%'} height={'100%'} >
                    <DialogActions>
                        <Button sx={{ color: '#ACFF00', fontSize: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'right', paddingRight: '18px' }} onClick={handleClose}>&#10005;</Button>
                    </DialogActions>
                    <DialogContent sx={{ padding: '18px' }} >
                        <Slideshow />
                    </DialogContent>
                </Box>
            </Dialog>

            <div className='bg-[#DCDEE1] rounded-b-[10px] p-4 text-left w-[100%] space-y-2 '>
                <div className="py-2 flex space-x-2 text-sm">
                    <h1 className=" text-sm font-Inter">FINANCIAL OVERVIEW </h1>
                    <button className="rounded-2xl px-3 bg-[#ACFF00] text-xs hover:opacity-60 font-Inter">Redeem</button>

                </div>
                <grid className="grid grid-cols-2">
                    <div className="grid grid-rows-2">
                        <div className=" flex ">
                            <p className="inline-block mr-1 text-xs font-Inter">Positions</p>

                        </div>
                        <div className=" text-sm font-Inter">12 positions</div>
                    </div>
                    <div className="grid grid-rows-2">
                        <div className=" text-xs font-Inter">Xsauce tokens</div>
                        <div className=" text-sm font-Inter">3,702 $SAUX</div>
                    </div>
                </grid>
                <grid className="grid grid-cols-2">
                    <div className="grid grid-rows-2">
                        <div className=" flex ">
                            <p className="inline-block mr-1 text-xs font-Inter">Positions</p>
                        </div>
                        <div className=" text-sm font-Inter">12 positions</div>
                    </div>
                    <div className="grid grid-rows-2">
                        <div className=" text-xs font-Inter">Xsauce tokens</div>
                        <div className=" text-sm font-Inter"> 3,702 $SAUX</div>
                    </div>
                </grid>
            </div>

        </div>

    )
};