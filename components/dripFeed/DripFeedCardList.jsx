
import { useEffect } from 'react';
import React from 'react';
import { DripFeedCard } from './DripFeedCard';
import toast from 'react-hot-toast';
import { ToastNotification } from '../common/Toast';
import { useGetSauceSelection } from '../../services/dripFeed/saucedSelection/useRequest';
import { Skeleton } from '@mui/material';

export const DripFeedCardList = ({ }) => {
    // ------------------- Constants ---------------------

    // ------------------- State Variable --------------------\

    const { saucedSelectionSneakersData, saucedSelectionSneakersDataError, saucedSelectionSneakersDataLoading } = useGetSauceSelection();

    // -------------------- Client Side Data Fetching ------------------


    //------------------ Use Effect / Use memo ------------------

    useEffect(() => {
        if (saucedSelectionSneakersDataError) {
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
                { duration: 7000, id: 'data-not-loading-live' }
            );
        }
    }, [saucedSelectionSneakersDataError]);

    if (saucedSelectionSneakersDataLoading) {
        return (
            <div className="divide-y-2 divide-black ">
                <div className="flex flex-col space-y-4  tablet:flex-row tablet:space-x-4 tablet:space-y-0 pb-14">
                    <>
                        <DripFeedCard index={1} cardObject={undefined} />
                        <DripFeedCard index={2} cardObject={undefined} />
                        <DripFeedCard index={3} cardObject={undefined} />
                    </>
                </div>
            </div>
        )
    }

    return (

        <div className="divide-y-2 divide-black transition  ">
            <div className="flex flex-col space-y-4  tablet:flex-row tablet:space-x-4 tablet:space-y-0 pb-14">

                {
                    saucedSelectionSneakersData?.map((element, index) => {
                        console.log(saucedSelectionSneakersData)

                        return <DripFeedCard index={index} cardObject={element} />;
                    })
                }
            </div>
        </div>

    );
};
