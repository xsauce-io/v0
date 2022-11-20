export function dataFormatter(data: any) {
    const formattedSaucedSelectionSneakersData = data.values.map((el: any) => {
        				return el.sneaker.results[0]
        			})
	console.log("formatted", formattedSaucedSelectionSneakersData)
	return formattedSaucedSelectionSneakersData

}