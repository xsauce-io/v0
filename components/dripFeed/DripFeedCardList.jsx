
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
import {
    dripFeedUseGetSneakerSku1,
    dripFeedUseGetSneakerSku2,
    dripFeedUseGetSneakerSku3,
} from '../../services/dataVariables';

export const DripFeedCardList = () => {
    // ------------------- Constants ---------------------
    const skeletonArray = [1, 2, 3];

    // ------------------- State Variable --------------------
    const [response, setResponse] = useState([]);

    // -------------------- Client Side Data Fetching ------------------
    const { data: s1, error: e1 } = useGetSneaker(dripFeedUseGetSneakerSku1);
    const { data: s2, error: e2 } = useGetSneaker(dripFeedUseGetSneakerSku2);
    const { data: s3, error: e3 } = useGetSneaker(dripFeedUseGetSneakerSku3);

    //------------------ Use Effect / Use memo ------------------
    useEffect(() => {
        setResponse([s1, s2, s3]);

    }, [s1, s2, s3]);


    useEffect(() => {
        if (e1 || e2 || e3) {
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
    }, [e1, e2, e3]);

    return (

        <div className="divide-y-2 divide-black  ">
            <div className="flex flex-col space-y-4  tablet:flex-row tablet:space-x-4 tablet:space-y-0 pb-14">
                {response?.map((element, index) => {
                    console.log(response);
                    return <DripFeedCard index={index} cardObject={element} />;
                })}
            </div>
        </div>

    );
};
