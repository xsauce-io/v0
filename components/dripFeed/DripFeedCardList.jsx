
import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import { DripFeedCard } from './DripFeedCard';
import toast from 'react-hot-toast';
import { ToastNotification } from '../common/Toast';
import { DisplayGroup, useGetSneakersByDisplayGroupQuery } from '../../services/generated/graphql.tsx';
import { useGetSauceSelection } from '../../services/dripFeed/saucedSelection/useRequest';


export const DripFeedCardList = ({}) => {
    // ------------------- Constants ---------------------
    const skeletonArray = [1, 2, 3];

    // ------------------- State Variable --------------------\

    const { saucedSelectionSneakersData, saucedSelectionSneakersDataError, saucedSelectionSneakersDataLoading } = useGetSauceSelection();

    console.log("saucedSelectionDate", saucedSelectionSneakersData)
    // -------------------- Client Side Data Fetching ------------------


    //------------------ Use Effect / Use memo ------------------
    // useEffect(() => {

    // },[saucedSelectionSneakersData,saucedSelectionSneakersDataError,saucedSelectionSneakersDataLoading])


    useEffect(() => {
        if (saucedSelectionSneakersDataError) {
            toast.custom(
                (t) => (
                    <ToastNotification
                        message={'An Internal Error has Occurred'}
                        subMessage={
                            'The data cannot be currently loaded. Please try again later.'
                        }
                        icon={<img src="/alertCircle.svg" />}
                        t={t}
                    />
                ),
                { duration: 7000, id: 'data-not-loading-live' }
            );
        }
    }, [saucedSelectionSneakersDataError]);


    if (saucedSelectionSneakersDataLoading) {
        return <>loading</>
    }

    return (

        <div className="divide-y-2 divide-black  ">
            <div className="flex flex-col space-y-4  tablet:flex-row tablet:space-x-4 tablet:space-y-0 pb-14">
                {saucedSelectionSneakersDataLoading ? <>Hello</>
                    :

                    saucedSelectionSneakersData.map((element, index) => {

                        return <DripFeedCard index={index} cardObject={element} />;
                    })
                }
            </div>
        </div>

    );
};
