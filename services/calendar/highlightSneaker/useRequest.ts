import { useEffect } from 'react';
import { useGetSneakerByTitleQuery } from "../../generated/graphql"
import { formatHighlightSneaker } from './helpers';

/**
 *
 */

export const useGetCalendarHighlightSneaker = () => {

    const { data,  error, loading } = useGetSneakerByTitleQuery({
        variables: {
            title: "CalendarHighlightSneaker"
        }
    })

    useEffect(() => {
    }, [data, error, loading])

    if (data) {
        const formattedHighlightSneakerData = formatHighlightSneaker(data);
        return {highlightSneakerData: formattedHighlightSneakerData, highlightSneakerDataError: undefined, highlightSneakerDataLoading: undefined}
    } else if (error) {
        return {highlightSneakerData: undefined, highlightSneakerDataError: error, highlightSneakerDataLoading: undefined}
    } else if (loading) {
        return {highlightSneakerData: undefined, highlightSneakerDataError: undefined, highlightSneakerDataLoading: true}
    } else {
        return {highlightSneakerData: undefined, highlightSneakerDataError: undefined, highlightSneakerDataLoading: true}

    }

}