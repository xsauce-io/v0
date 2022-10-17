import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { Tooltip } from '@mui/material';
import { ExpandImageModal } from './expandImageModal';
import {FreePlayGraph} from '../components/freePlayGraph';

import { useGetSneaker } from '../services/useRequests';

export const FreePrediction = () => {


  
	const { data: s1, error: e1 } = useGetSneaker('DZ5485-612');
	return (
    
		<React.Fragment>
  
 
			<div className="flex flex-row pt-10 pb-10">
     <div className='bg-white w-[40%] rounded-lg font-SG p-4'>
      <h1 className='text-center pb-2'>Get 3 predictions in a row to spin the wheel</h1>
      <img className='pb-2' src='/WOF.png'/>
      <div className='flex flex-col justify-around h-[50%]'>
        <div>
         What will the reselll price of the <p className='font-bold'>{s1?.name}</p> be on <p className='font-bold'>October 31st, 2022?</p>
         </div>
       <div>
        <div className="bg-white mb-3 items-center py-3 px-5 text-left w-[100%] border-[1px] rounded-3xl border-[#0C1615] flex focus:outline-2 focus:outline-offset-2 hover:outline-1">
						<p className="text-left text-sm inline-block pr-1">Prediction Price:</p>
						<input
							className="flex-1 text-right mobile:text-sm laptop:text-md  inline-block appearance-none focus:none focus:outline-none "
							name="Amount"
							id="amount"
							type="number"
							placeholder="$375"
							// onChange={() => CalculateTotal()}
							required
						/>
            
					</div>
         
          <button
						type="submit"
						id="mint"
						className="w-full font-medium mb-6 text-xl py-4  text-white bg-[#0C1615] rounded-[80px] hover:opacity-60"
					>
						Submit
					</button>
          <h1 className='font-bold'>Current Resell Price:
          <span className='bg-[#ACFF00] py-1 px-2 rounded-full ml-1 text-sm font-normal'>${s1?.estimatedMarketValue}</span>
        </h1>
      </div>
      </div>
     </div>
      <div className='flex flex-col w-[60%] ml-2'>
				{e1 === "" ? (
					<React.Fragment>
						<Skeleton variant="text" />
						<Skeleton variant="text" />
						<Skeleton variant="rectangular" className={'h-[257px]'} />
					</React.Fragment>
				) : (
					<React.Fragment>

            {s1?.image.original === '' ||
								s1?.image.original ===
									'https://image.goat.com/placeholders/product_templates/original/missing.png' ? (
									<img
										className="object-cover w-[80%] m-auto h-auto rounded-lg"
										src="/11s.svg"
									/>
								) : (
									<div className="bg-white mb-2 rounded-lg flex flex-row">
										<img
											src={s1?.image.original}
											className="object-cover w-[40%] m-auto h-auto rounded-lg font-SG p-4'>"
										/>
                    <p className='py-6 px-4'>{s1?.story}</p>
                    
									</div>
								)}

								<div
									className="mr-0 absolute right-3 bottom-3"
									hidden={
										s1?.image.original === '' ||
										s1?.image.original ===
											'https://image.goat.com/placeholders/product_templates/original/missing.png'
									}
								>
								</div>
                </React.Fragment>
                )}
                      <div className='bg-white rounded-lg font-SG p-4'>
      <FreePlayGraph/>
      {/* <SubmitPrediction/> */}
      </div>
                </div>
          
                  </div>
           

						<grid className="bg-white w-full grid  text-[#0C1615] grid-rows-[repeat(16, minmax(0, 1fr))]  grid-cols-2 flex justify-center rounded-xl border-[1px] border-[#0C1615]">
						



							<div className="col-span-2 row-span-6 text-left px-6 py-10">
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
								<p>10-28-2022</p>
							</div>
							<div className="col-span-1 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 border-r-[1px] rounded-bl-xl">
								<p className="text-xs"> Retail price </p>
								<p>${s1?.retailPrice}</p>
							</div>
							<div className="col-span-1 row-span-2 border-t-[1px] border-[#0C1615] bg-[#DCDEE1] text-left px-6 py-3 rounded-br-xl">
								<p className="text-xs"> Estimated resell price</p>
								<p>${s1?.estimatedMarketValue}</p>
							</div>
					

						
						</grid>

					</React.Fragment>
				)}