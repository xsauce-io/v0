import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { Tooltip } from '@mui/material';
import { ExpandImageModal } from './expandImageModal';
import {FreePlayGraph} from '../components/freePlayGraph';

import { useGetSneaker } from '../services/useRequests';

export const FreePrediction = () => {


  
	const { data: s1, error: e1 } = useGetSneaker('DH7138-006');
console.log(s1)
	return (
    
		<React.Fragment>
   <FreePlayGraph/>

			<div className=" ">
				{e1 === "" ? (
					<React.Fragment>
						<Skeleton variant="text" />
						<Skeleton variant="text" />
						<Skeleton variant="rectangular" className={'h-[257px]'} />
					</React.Fragment>
				) : (
					<React.Fragment>
						<div className="text-3xl py-4 text-left mb-10 text-[#0C1615]">
							{' '}
							{s1?.name}
						</div>

						<grid className="bg-white w-full grid  text-[#0C1615] grid-rows-[repeat(16, minmax(0, 1fr))]  grid-cols-2 flex justify-center rounded-xl border-[1px] border-[#0C1615]">
							<div className="col-span-2 row-span-6 flex justify-center relative ">
								{s1?.image.original === '' ||
								s1?.image.original ===
									'https://image.goat.com/placeholders/product_templates/original/missing.png' ? (
									<img
										className="object-cover w-[80%] m-auto h-auto rounded-lg"
										src="/11s.svg"
									/>
								) : (
									<>
										<img
											src={s1?.image.original}
											className="object-cover w-[80%] m-auto h-auto rounded-lg"
										/>
									</>
								)}

								<div
									className="mr-0 absolute right-3 bottom-3"
									hidden={
										s1?.image.original === '' ||
										s1?.image.original ===
											'https://image.goat.com/placeholders/product_templates/original/missing.png'
									}
								>
									<ExpandImageModal shoeImage={s1?.image.original} />
								</div>


							</div>
							<div className="col-span-2 row-span-6 text-left border-t-[1px] border-[#0C1615] px-6 py-10">
								<p className="text-xl font-medium font-SG py-4">
									Product Description
								</p>
								{s1?.story}
							</div>

							<div className="col-span-1 row-span-3 border-t-[1px] border-[#0C1615] text-left px-6 py-3 border-r-[1px]">
								<p className="py-2">Shoe information</p>
								<p className="text-xs"> Release Date</p>
								<p>{s1?.releaseDate}</p>
							</div>
							<div className="col-span-1 row-span-3 border-t-[1px] border-[#0C1615] text-left px-6 py-3 ">
								<p className="py-2">Market information</p>
								<p className="text-xs"> Release Date</p>
								<p>10-23-2022</p>
							</div>
							<div className="col-span-1 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 border-r-[1px]">
								<p className="text-xs"> Sku </p>
								<p>{s1?.sku}</p>
							</div>
							<div className="col-span-1 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 ">
								<p className="text-xs"> Closes </p>
								<p>10-28-1997</p>
							</div>
							<div className="col-span-1 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 border-r-[1px]">
								<p className="text-xs"> Retail price </p>
								<p>${s1?.retailPrice}</p>
							</div>
							<div className="col-span-1 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 ">
								<p className="text-xs"> Estimated resell price</p>
								<p>${s1?.estimatedMarketValue}</p>
							</div>
							<div className="col-span-2 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 ">
								<p className="text-xs"> Wager </p>
								<p>
									{' '}
									What Price
								</p>
							</div>

						
						</grid>

					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	);
};
