/**
 * @Notice this function is specifically configured to format the response of the query sneakerBy title
 * @param data data should be the unmodified response of the request
 * @returns formatted data ready to use my the view
 */

 export function formatHighlighSneaker(data: any) {
	const formattedHighlightSneakerData = data.values.sneaker.results[0]
	console.log("formatted", formattedHighlightSneakerData)
	return formattedHighlightSneakerData;
}