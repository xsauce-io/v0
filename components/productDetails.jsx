export const ProductDetails = ({cardObject}) => {


return (
<div className="laptop:flex flex-col w-3/4 mx-auto mb-8 text-left space-y-4 justify-center outline p-4 rounded-lg mobile:hidden">
  <p>Description: {cardObject.story}</p>
  <p>Release Date: {cardObject.releaseDate}</p>
<p>Retail Price: ${cardObject.retailPrice}</p>
<p>Silhouette: {cardObject.silhouette}</p>
</div>


)

}