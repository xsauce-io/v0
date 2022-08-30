export const ProductDetails = ({cardObject}) => {


return (
<div className="laptop:flex flex-col w-1/2 p-8 text-left text-white font-SG justify-between space-y-4 rounded-lg mobile:hidden">
  <p>The Story: {cardObject.story}</p>
  <p>Release Date: {cardObject.releaseDate}</p>
<p>Retail Price: ${cardObject.retailPrice}</p>
<p>Silhouette: {cardObject.silhouette}</p>
</div>


)

}