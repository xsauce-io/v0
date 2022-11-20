/**
 * @Notice this function is specifically configured to format the response of the query sneakerBy title
 * @param data data should be the unmodified response of the request
 * @returns formatted data ready to use my the view
 */

 export function formatCalendarSneakerList(data: any) {
	const formattedCalendarSneakerList = data.values.sneakers.results
	console.log("formatted", formattedCalendarSneakerList)
	return formattedCalendarSneakerList;
}