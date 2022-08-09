import React from "react";
import { Skeleton } from "@mui/material";
// import AspectRatio from '@mui/joy/AspectRatio';




export const WagerCard = ({cardObject}) => {


    return (
        <React.Fragment>
            <div className="p-5">


                {/* <img className="rounded-lg" src={response.image?.original} /> */}
                {
                    cardObject === undefined ?
                        <React.Fragment>
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="rectangular" className={'h-[257px]'} />
                        </React.Fragment> :
                        <React.Fragment>
                            <div className="sm:flex flex-col text-left lg:justify-center flex" >
                                <div className=''>
                                    <h3 className='font-bold lg:text-[50px]'>{cardObject.name}</h3>
                                    <p className='font-normal lg:text-[30px]'>ID:{cardObject.sku}</p>
                                </div>
                                <div className="sm:w-[292px] h-[150]">
                                {/* <AspectRatio objectFit="contain"> */}
                                <img  src={cardObject.image?.original} />
                                {/* </AspectRatio> */}
                                </div>
                            </div>
                        </React.Fragment>
                }

            </div>
        </React.Fragment>
    );
}