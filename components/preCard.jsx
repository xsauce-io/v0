import React from "react";
import { Skeleton } from "@mui/material";
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
// import AspectRatio from '@mui/joy/AspectRatio';

export const PreCard = ({ cardObject }) => {
  return (
    <React.Fragment>
      <div className="w-1/2">
        {cardObject === undefined ? (
          <React.Fragment>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" className={"h-[257px]"} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="mobile:flex flex-col text-center desktop:pt-6 text-white ">
              <div className="mobile:flex flex-col laptop:flex flex-row items-center justify-between bg-black rounded-lg">
                <div className="mobile:flex flex-col items-center desktop:space-y-4 pb-4">
                  <h3 className="font-bold font-SG mobile:text-center laptop:text-[35px] desktop:text-[24px]">
                    {cardObject.name}
                  </h3>
                  <p className="font-normal font-Inter mobile:text-center laptop:text-[25px] desktop:text-[20px]">
                    ID:{cardObject.sku}
                  </p>
                </div>
                <img
                  src={cardObject.image?.original}
                  className="object-cover bg-white rounded-lg mobile:h-[200px] mb-4 tablet:h-[250px] laptop:h-[200px] desktop:h-[250px] w-[300px] px-10  mb-8 py-4 "
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
