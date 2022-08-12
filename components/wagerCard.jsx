import React from "react";
import { Skeleton } from "@mui/material";
// import AspectRatio from '@mui/joy/AspectRatio';




export const WagerCard = ({ cardObject }) => {


    return (
        <React.Fragment>
            <div className="">


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
                                <img src={cardObject.image?.original} className="object-cover mobile:h-[150px] mb-4 tablet:h-[500px] laptop:h-[700px] desktop:h-[800px]  " />
                            </div>
                        </React.Fragment>
                }

            </div>
        </React.Fragment>
    );
}