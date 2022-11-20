import { useEffect } from 'react';
import { useGetSneakerCollectionByTitleQuery } from "../../generated/graphql"
import { formatCalendarSneakerList } from './helpers';


export const useGetCalendarSneakerList = () => {

    const { data, error, loading } = useGetSneakerCollectionByTitleQuery({
        variables: { title: "CalendarSneakerCollection" }
    })

    useEffect(() => {
    }, [data, error, loading])

    if (data) {
        const formattedCalendarSneakerData = formatCalendarSneakerList(data);
        return { calendarSneakerListData: formattedCalendarSneakerData, calendarSneakerListDataError: undefined, calendarSneakerListDataLoading: false }
    } else if (error) {
        return { calendarSneakerListData: undefined, calendarSneakerListDataError: error, calendarSneakerListDataLoading: false }
    } else if (loading) {
        return { calendarSneakerListData: undefined, calendarSneakerListDataError: undefined, calendarSneakerListDataLoading: true }
    } else {
        return { calendarSneakerListData: undefined, calendarSneakerListDataError: undefined, calendarSneakerListDataLoading: undefined }
    }
}