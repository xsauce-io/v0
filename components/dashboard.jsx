import React from "react"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Onboard } from './onBoardingModal'
import Carousel from "nuka-carousel/lib/carousel";
export const Dashboard = () => {

return (
  <React.Fragment>
  <div className="mobile:flex flex-col items-center rounded-lg laptop:hidden">
    <iframe className="w-[360px] h-[440px]" src="https://rss.app/embed/v1/carousel/_fEQCslhUMqqVu26n" frameborder="0"></iframe>
  </div>
  <div className='mobile:hidden laptop:flex flex-col items-center h-[100vh] pt-4 w-[1300px] m-auto space-y-5' >
  {/* <NewspaperIcon/>
       <h1 className='text-[25px] text-left font-semibold'>News</h1> */}

<div className="flex flex-row space-x-4 w-full justify-center">

<div className=" flex flex-col justify-center space-y-4 w-full h-[250px] text-[#EAF5D5] text-left p-6">
{/* <Tilt options={{speed:300 , scale:1}}>
<h1  className='text-[55px]'> Welcome to the Xchange!</h1>

<p className='text-[27px] text-left'>You can now profit off your knowledge of streetwear like never before.</p>
<Onboard/> */}
<div className="flex flex-col items-center pb-4 ">


{/* </Tilt> */}


</div>

{/* <div className="w-1/4 h-[250px] text-white bg-black  shadow-lg">
<a class="twitter-timeline" data-height="250" data-theme="dark" href="https://twitter.com/xsauce_io?ref_src=twsrc%5Etfw"></a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

</div> */}

</div>
<div className="flex flex-row space-x-4 w-[1500px] justify-center">
<div className="w-1/4 h-[275px] text-[#EAF5D5] bg-black  shadow-xl transition duration-500 hover:scale-105">

        <h1 className=" relative p-2 font-semibold">SOW: Yeezy Boost 350 V2 “Flax”</h1>
        <img className='object-cover h-[235px]  shadow-xl' src="http://justfreshkicks.com/wp-content/uploads/2020/02/5fecc506-507a738c-a782-4e5e-84a2-4254eaee3412.png" type="image/jpeg"/>
      
</div>
<div className="w-1/2 h-[35vh] text-white rounded-md">
<img className="shadow-xl transition duration-500 hover:scale-105" src="/walletPH.svg"/>
</div>
</div>
<KeyboardDoubleArrowDownIcon sx={{fontSize:'40px'}}/>
</div>
</React.Fragment>
  )
}
