import { useEffect, useState } from 'react';
import { useGetSneakersByDisplayGroupQuery, DisplayGroup } from "../generated/graphql";
import { formatSaucedSelectionResponse } from './helpers';

export type saucedSelection = {

}

export const useGetSauceSelection = () => {

    const { data: saucedSelectionSneakersData, error: saucedSelectionSneakersDataError, loading: saucedSelectionSneakersDataLoading } =  useGetSneakersByDisplayGroupQuery({
		variables: {
		   displayGroup: DisplayGroup.SaucedSelection,
		 },
    });

    useEffect(() => {
        console.log("saucedSelectionSneakersData", saucedSelectionSneakersData)
        console.log("saucedSelectionSneakersDataError", saucedSelectionSneakersDataError)
        console.log("saucedSelectionSneakersDataLoading", saucedSelectionSneakersDataLoading)

    }, [saucedSelectionSneakersData, saucedSelectionSneakersDataError, saucedSelectionSneakersDataLoading])

    if (saucedSelectionSneakersData) {
        const formattedSaucedSelectionSneakersData = formatSaucedSelectionResponse(saucedSelectionSneakersData);
        return {saucedSelectionSneakersData: formattedSaucedSelectionSneakersData, saucedSelectionSneakersDataError: undefined, saucedSelectionSneakersDataLoading: undefined }
    } else if ( saucedSelectionSneakersDataError) {
        return {saucedSelectionSneakersData: undefined, saucedSelectionSneakersDataError, saucedSelectionSneakersDataLoading: undefined }

    } else if (saucedSelectionSneakersDataLoading) {
        return {saucedSelectionSneakersData: undefined, saucedSelectionSneakersDataError: undefined, saucedSelectionSneakersDataLoading: true }

    } else {
        return {saucedSelectionSneakersData: undefined, saucedSelectionSneakersDataError: undefined, saucedSelectionSneakersDataLoading: false }
    }

}