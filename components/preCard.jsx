import React from "react";
import { Skeleton } from "@mui/material";
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
// import AspectRatio from '@mui/joy/AspectRatio';

export const PreCard = ({ cardObject }) => {
  return (
    <React.Fragment>
      <div>
        {cardObject === undefined ? (
          <React.Fragment>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" className={"h-[257px]"} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="mobile:flex flex-col text-center desktop:mt-8 text-black font-SG">
              <div className="mobile:flex flex-col laptop:flex flex-row items-center justify-center rounded-lg">
                <div className="mobile:flex flex-col items-center desktop:justify-center items-center pb-4">
                  <h3 className="font-SG mobile:text-center laptop:text-[35px] desktop:text-[24px] w-full ">
                    {cardObject.name}
                  </h3>

                </div>
                <img
                  src={cardObject.image?.original}
                  className="object-cover bg-white shadow-lg rounded-lg mobile:h-[200px] mb-4 tablet:h-[250px] laptop:h-[200px] desktop:h-[250px] w-[60%] px-10  mb-8 py-6 "
                />
              </div>
              <div className="flex font-SG text-[11px] flex-row items-center space-x-4 w-full justify-center mb-8">
                <p className="bg-white rounded-md  p-4">Release Date: {cardObject.releaseDate}</p>
                <p className=" bg-white rounded-md p-4  mobile:text-center laptop:text-[11px] desktop:text-[11px]">
                  SKU:{cardObject.sku}
                </p>
                <p className="bg-white rounded-md p-4">Retail Price: ${cardObject.retailPrice}</p>
                <p className="bg-white rounded-md p-4">Silhouette: {cardObject.silhouette}</p>
              </div>
              <p className="flex flex-row rounded-md items-center bg-white text-center p-4 w-full mx-6 justify-center overflow-y-scroll mb-10">The Story: {cardObject.story}</p>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
