import { useState, useEffect, useMemo } from 'react';
import { Skeleton } from '@mui/material';
import { CalendarCard } from './CalendarCard';
import toast from 'react-hot-toast';
import { ToastNotification } from '../common/Toast';
import { useGetCalendarSneakerList } from '../../services/calendar/calendarSneakerList/useRequest';


export const CalendarCardList = () => {
    // ------------------- Constants ---------------------

    const SORT_BY_STATES = {
        RELEASE_DATE: 'releaseDate',
        NAME: 'name',
        RETAIL_PRICE: 'retailPrice',
    };

    const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];

    // -------------------- Data Fetching ------------------

    const { calendarSneakerListData, calendarSneakerListDataError, calendarSneakerListDataLoading } = useGetCalendarSneakerList()


    // ------------------- State Variable --------------------

    const [response, setResponse] = useState([]);
    const [sortBy, setSortBy] = useState({ state: SORT_BY_STATES.RELEASE_DATE });

    //------------------ Use Effect / Use memo ------------------

    useEffect(() => {
        if (calendarSneakerListData) {
            setResponse(calendarSneakerListData);

        }
    }, [calendarSneakerListData]);

    useEffect(() => {
        if (calendarSneakerListDataError) {
            toast.custom(
                (t) => (
                    <ToastNotification
                        message={'An Internal Error has Occurred'}
                        subMessage={
                            'The data cannot be currently loaded. Please try again later.'
                        }
                        icon={<img src="/alert-circle-red-icon-svg.svg" />}
                        t={t}
                    />
                ),
                { duration: 7000, id: 'data-not-loading-calendar' }
            );
        }
    }, [calendarSneakerListDataError]);

    useMemo(() => {
        if (response) {
            if (response.length > 0) {
                if (response.length > 0 && sortBy.state === SORT_BY_STATES.NAME) {
                    response.sort((a, b) =>
                        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                    );

                } else if (
                    response.length > 0 &&
                    sortBy.state === SORT_BY_STATES.RELEASE_DATE
                ) {
                    response.sort(
                        (a, b) =>
                            a.releaseDate > b.releaseDate
                                ? 1
                                : b.releaseDate > a.releaseDate
                                    ? -1
                                    : 0
                    );

                } else if (
                    response.length > 0 &&
                    sortBy.state === SORT_BY_STATES.RETAIL_PRICE
                ) {
                    response.sort(
                        (a, b) =>
                            a.retailPrice - b.retailPrice
                    );

                }
            }
        }
    }, [sortBy]);



    return (
        <div>
            <div className="flex laptop:flex-row laptop:items-center laptop:space-y-0 mobile:flex-col tablet:space-x-3 mobile:space-y-3  tablet:space-y-0  items-center tablet:flex-row mb-8 ">
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="text-[10px]  flex flex-row justify-center  text-center items-center border-[#0C1615] border-2 rounded-3xl text-sm bg-[#0C1615] hover:opacity-50  w-[130px] p-1 px-2"
                    >
                        <img src="/arrowUpDownGrey.svg" />

                        <span className="flex-1 text-white font-Inter ">Sort On</span>

                        <img src="/downArrowGrey.svg" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-[#DCDEE1] p-2 shadow rounded-box w-52 mt-4"
                    >
                        <li>
                            <button
                                onClick={() => {
                                    setSortBy({ state: SORT_BY_STATES.RETAIL_PRICE });
                                    mixpanel.track('Sort ', {
                                        sortBy: SORT_BY_STATES.RETAIL_PRICE,
                                    });
                                }}
                                className="text-black font-Inter active:bg-[#ACFF00]"
                            >
                                Retail Price
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setSortBy({ state: SORT_BY_STATES.RELEASE_DATE });
                                    mixpanel.track('Sort ', {
                                        sortBy: SORT_BY_STATES.RELEASE_DATE,
                                    });
                                }}
                                className="text-black font-Inter active:bg-[#ACFF00]"
                            >
                                Release Date
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => {
                                    setSortBy({ state: SORT_BY_STATES.NAME });
                                    mixpanel.track('Sort ', {
                                        sortBy: SORT_BY_STATES.NAME,
                                    });
                                }}
                                className="text-black font-Inter active:bg-[#ACFF00]"
                            >
                                Name
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="grid mobile:grid-cols-1 tablet:grid laptop:grid-cols-4 grid-rows-1 gap-y-6 place-items-center gap-x-6 mb-10 ">
                {response || calendarSneakerListDataError === undefined
                    ? response?.map((element, index) => (
                        <CalendarCard index={index} cardObject={element} />
                    ))
                    : skeletonArray.map((index) => (
                        <Skeleton
                            index={index}
                            animation="pulse"
                            variant="rounded"
                            height={300}
                            sx={{ borderRadius: '15px' }}
                            width={'100%'}
                        />
                    ))}
            </div>
        </div>

    );
};
