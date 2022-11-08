
import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import { ethers } from 'ethers';
import { MarketFactory } from '../../services/constants';
import MarketFactoryABI from '../../abi/marketFactory.json';
import MarketAbi from '../../abi/markets.json';
import { useGetSneaker } from '../../services/useRequests';
import { DripFeedCard } from './DripFeedCard';
import toast from 'react-hot-toast';
import { ToastNotification } from '../common/toast';
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
    const [allBalances, setAllBalances] = useState([]);

    // -------------------- Data Fetching ------------------
    const { data: s1, error: e1 } = useGetSneaker(dripFeedUseGetSneakerSku1);
    const { data: s2, error: e2 } = useGetSneaker(dripFeedUseGetSneakerSku2);
    const { data: s3, error: e3 } = useGetSneaker(dripFeedUseGetSneakerSku3);

    // -------------------- Functions ------------------

    const showBalances = async () => {
        const hasConnectedWalletBefore = localStorage.getItem(
            'hasConnectedWalletBefore'
        );

        if (hasConnectedWalletBefore != null) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const connected = (
                await provider.send('eth_requestAccounts', [0])
            ).toString();
            const signer = provider.getSigner();
            const contract2 = new ethers.Contract(
                MarketFactory,
                MarketFactoryABI,
                signer
            );
            const allMarkets = await contract2.getAllMarketswSku();

            const cleanedAllMarkets = [];
            for (let index = 0; index < allMarkets.length; index++) {
                const r1 = allMarkets[index].sku.toString();
                const r2 = allMarkets[index].market.toString();
                const r3 = allMarkets[index].name.toString();
                const newData = { sku: r1, address: r2, name: r3 };
                cleanedAllMarkets.push(newData);
            }

            const balanceArray = [];

            for (let index = 0; index < cleanedAllMarkets?.length; index++) {
                const contract = new ethers.Contract(
                    cleanedAllMarkets[index]?.address,
                    MarketAbi,
                    signer
                );
                const balances = await contract.getAcctInfo(connected);
                const one = balances.amountNo.toString();
                const two = balances.amountYes.toString();
                const three = (balances.avgBuyPriceNo / 1e18).toFixed(2);
                const four = (balances.avgBuyPriceYes / 1e18).toFixed(2);

                const newObj = {
                    amountNo: one,
                    amountYes: two,
                    avgBuyPriceNo: three,
                    avgBuyPriceYes: four,
                    address: cleanedAllMarkets[index].address,
                    sku: cleanedAllMarkets[index].sku,
                    name: cleanedAllMarkets[index].name,
                };
                balanceArray.push(newObj);
            }
            setAllBalances(balanceArray);
        }
    };

    //------------------ Use Effect / Use memo ------------------
    useEffect(() => {
        setResponse([s1, s2, s3]);
        showBalances();
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

        <>


            <div className="divide-y-2 divide-black  ">
                <div className="flex flex-col space-y-4  tablet:flex-row tablet:space-x-4 tablet:space-y-0 pb-14">
                    {response?.map((element, index) => {
                        console.log(response);
                        return <DripFeedCard index={index} cardObject={element} />;
                    })}
                </div>
            </div>
        </>


    );
};
