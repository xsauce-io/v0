import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Carousel  from 'nuka-carousel';



export const Onboard = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>How it works</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}

      style={{  position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100vw',
      height: '100vh',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,}}
      >
       
        <Fade in={open}>
        <Box>
        <Carousel
       slidesToShow={1}
       style={{height:'800px', backgroundColor:'black',}}
       >
       <img src="/sneakericon.png" />
      <img src="/logo.svg" />
      <img src="/sneakericon.png" />
     <img src="/logo.svg" />
     <img src="/sneakericon.png" />
       </Carousel>
       </Box>
        </Fade>
      
      </Modal>
    </div>
  );
}
