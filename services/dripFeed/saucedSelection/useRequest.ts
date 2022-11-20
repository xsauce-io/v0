import { useEffect, useState } from 'react';
import { useGetSneakersByDisplayGroupQuery, DisplayGroup } from "../../generated/graphql";
import { formatSaucedSelectionResponse } from './helpers';

export type saucedSelection = {

}

export const useGetSauceSelection = () => {

    const { data, error, loading } =  useGetSneakersByDisplayGroupQuery({
		variables: {
		   displayGroup: DisplayGroup.SaucedSelection,
		 },
    });

    useEffect(() => {

    }, [data, error, loading])

    if (data) {
        const formattedSaucedSelectionSneakersData = formatSaucedSelectionResponse(data);
        return {saucedSelectionSneakersData: formattedSaucedSelectionSneakersData, saucedSelectionSneakersDataError: undefined, saucedSelectionSneakersDataLoading: undefined }
    } else if ( error) {
        return {saucedSelectionSneakersData: undefined, saucedSelectionSneakersDataError: error , saucedSelectionSneakersDataLoading: undefined }

    } else if (loading) {
        return {saucedSelectionSneakersData: undefined, saucedSelectionSneakersDataError: undefined, saucedSelectionSneakersDataLoading: true }

    } else {
        return {saucedSelectionSneakersData: undefined, saucedSelectionSneakersDataError: undefined, saucedSelectionSneakersDataLoading: false }
    }

}