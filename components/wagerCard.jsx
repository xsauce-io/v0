import React from "react";
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import { useState, useEffect } from "react";
import axios from "axios";
import { RepeatOneSharp } from "@mui/icons-material";
import { Skeleton } from "@mui/material";



export const WagerCard = () => {

    const options = {
        method: "GET",
        url: "https://xchange-temporary-server.herokuapp.com/api/v1/products",
    };

    const [response, setResponse] = useState([]);

    // fetch sneaker data
    const getSneaker = async () => {
        axios
            .request(options)
            .then(function (response) {
                setResponse(response.data.results[0]);
                console.log(response.data.results[0]);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    useEffect(() => {
        getSneaker();
    }, []);

    return (
        <React.Fragment>
            <div className="p-5">


                {/* <img className="rounded-lg" src={response.image?.original} /> */}
                {
                    response.image === undefined ?
                        <React.Fragment>
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="rectangular" className={'h-[257px]'} />
                        </React.Fragment> :
                        <React.Fragment>
                            <div className="text-left relative pb-4 lg:justify-center flex " >
                                <div className='absolute left-5 top-5'>
                                    <h3 className='font-bold lg:text-[50px]'>{response.name}</h3>
                                    <p className='font-normal lg:text-[30px]'>ID:{response.sku}</p>
                                </div>
                                <img className="rounded-lg" src={response.image?.original} />
                            </div>
                        </React.Fragment>
                }

            </div>
        </React.Fragment>
    );
}