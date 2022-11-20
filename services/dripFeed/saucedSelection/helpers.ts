/**
 * @Notice this function is specifically configured to format the response of the query SneakersByDisplayName
 * @param data data should be the unmodified response of the request
 * @returns formatted data ready to use my the view
 */

export function formatSaucedSelectionResponse(data: any) {
	const formattedSaucedSelectionSneakersData = data.values.map((element: any) => {
		return element.sneaker.results[0]
	})
	console.log("formatted", formattedSaucedSelectionSneakersData)
	return formattedSaucedSelectionSneakersData;
}