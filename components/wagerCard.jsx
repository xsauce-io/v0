import React from "react";
import { Skeleton } from "@mui/material";
// import AspectRatio from '@mui/joy/AspectRatio';




export const WagerCard = ({ cardObject }) => {


    return (
        <React.Fragment>
            <div className="w-[2/3] p-5 ">


 
                {
                    cardObject === undefined ?
                        <React.Fragment>
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="rectangular" className={'h-[257px]'} />
                        </React.Fragment> :
                        <React.Fragment>
                            <div className="mobile:flex flex-col text-left " >
                                <div className='mobile:flex flex-col laptop:flex flex-row  justify-center'>
                                    <div className="mobile:flex flex-col items-center">
                                    <h3 className='font-bold mobile:text-center laptop:text-[35px]'>{cardObject.name}</h3>
                                    <p className='font-normal mobile:text-center laptop:text-[25px]'>ID:{cardObject.sku}</p>
                                    </div>
                                <img src={cardObject.image?.original} className="object-cover mobile:h-[200px] mb-4 tablet:h-[250px] laptop:h-[200px] desktop:h-[275px]  " />
                                </div>
                            </div>
                        </React.Fragment>
                }

            </div>
        </React.Fragment>
    );
}