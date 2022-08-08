import React from "react"
export const Feed = () => {

return (
  <React.Fragment>
  <div className="mobile:flex flex-col items-center rounded-lg laptop:hidden">
    <iframe className="w-[360px] h-[440px]" src="https://rss.app/embed/v1/carousel/_fEQCslhUMqqVu26n" frameborder="0"></iframe>
  </div>
  <div className='mobile:hidden laptop:flex flex-col items-center' >
  <iframe width="1400" height="500" src="https://rss.app/embed/v1/imageboard/_fEQCslhUMqqVu26n" frameborder="0"></iframe>
 </div>
</React.Fragment>
  )
}
