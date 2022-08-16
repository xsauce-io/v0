import React from "react"
import NewspaperIcon from '@mui/icons-material/Newspaper';
export const Feed = () => {

return (
  <React.Fragment>
  <div className="mobile:flex flex-col items-center rounded-lg laptop:hidden">
    <iframe className="w-[360px] h-[440px]" src="https://rss.app/embed/v1/carousel/_fEQCslhUMqqVu26n" frameborder="0"></iframe>
  </div>
  <div className='mobile:hidden laptop:flex flex-col items-center h-[70vh] pt-5 w-[1200px] m-auto space-y-5' >
  {/* <NewspaperIcon/>
       <h1 className='text-[25px] text-left font-semibold'>News</h1> */}
<div className="flex flex-row space-x-4 w-full justify-center">
<div className="w-1/2 h-[25vh] bg-white rounded-md shadow-lg">
<h1>Wallet Info</h1>

</div>
<div className="w-1/4 h-[25vh] text-white bg-black rounded-md shadow-lg">
<h1>Click for onboarding</h1>
</div>
</div>
<div className="flex flex-row space-x-4 w-full justify-center">
<div className="w-1/3 h-[35vh] text-white bg-black rounded-md shadow-lg">
<h1>Release Calender</h1>
</div>
<div className="w-1/3 h-[35vh] text-white bg-black rounded-md shadow-lg">
<h1>Click for onboarding</h1>
</div>
</div>
</div>
</React.Fragment>
  )
}
