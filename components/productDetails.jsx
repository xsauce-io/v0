export const ProductDetails = ({cardObject}) => {


return (
<div className="flex flex-col m-auto w-[1250px] text-left space-y-4 justify-center outline p-4 rounded-lg">
  <p>Description: {cardObject.story}</p>
  <p>Release Date: {cardObject.releaseDate}</p>
<p>Retail Price: ${cardObject.retailPrice}</p>
<p>Silhouette: {cardObject.silhouette}</p>
</div>


)

}