import React from "react"

export const ProductDetails = ({cardObject}) => {


return (
  <><div className="bg-white laptop:flex flex-col text-[18px] p-4 text-left text-black font-SG justify-between rounded-lg mobile:hidden">
    <p>The Story: {cardObject.story}</p>
  </div><React.Fragment>
      <p className="bg-white">Release Date: {cardObject.releaseDate}</p>
      <p className="bg-white">Retail Price: ${cardObject.retailPrice}</p>
    </React.Fragment><React.Fragment>
    <p className="bg-white w-1/3">Silhouette: {cardObject.silhouette}</p>
    </React.Fragment></>


)

}