
import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import { ethers } from 'ethers';
import { MarketFactory } from '../../services/constants';
import MarketFactoryABI from '../../abi/marketFactory.json';
import MarketAbi from '../../abi/markets.json';
import { useGetSneaker } from '../../services/useRequests';
import { DripFeedCard } from './DripFeedCard';
import toast from 'react-hot-toast';
import { ToastNotification } from '../common/Toast';
import { useQuery } from '@apollo/client';

import { DisplayGroup, useGetSneakersByDisplayGroupQuery } from '../../operations/generated/graphql.tsx';


export const DripFeedCardList = ({}) => {
    // ------------------- Constants ---------------------
    const skeletonArray = [1, 2, 3];

    // ------------------- State Variable --------------------\

    const { data: saucedSelectionSneakersData, error: saucedSelectionSneakersDataError, loading: saucedSelectionSneakersDataLoading } =  useGetSneakersByDisplayGroupQuery({
		variables: {
		   displayGroup: DisplayGroup.SaucedSelection,
		 },
    });

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
                {saucedSelectionSneakersDataLoading ? <>Heloo</> :

                saucedSelectionSneakersData?.map((element, index) => {

                    return <DripFeedCard index={index} cardObject={element} />;
                })}
            </div>
        </div>

    );
};
