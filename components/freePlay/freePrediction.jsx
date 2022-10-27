import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { FutureCard } from './futureCard';
import { FutureIndexSection } from './futureIndexSection';
import { useGetSneaker } from '../../services/useRequests';
import Image from 'next/image';

export const FreePrediction = () => {
	const { data: s1, error: e1 } = useGetSneaker('DZ5485-612');

	const [isLong, setIsLong] = useState(true);
	const [Market, setMarket] = useState(0);
	const skeletonArray = [1, 2, 3];
	const Markets = [
		{
			title: 'Culture Index',
			subTitle: 'Top 30 in Streetwear',
			rankProfile: '(Ranked by Volume)',
			href: '/cultureIndex.jpg',
		},
		{
			title: 'Nike Index',
			subTitle: 'Top 30 Items by Nike',
			rankProfile: '(Ranked by Volume)',
			href: '/nike.png',
		},
		{
			title: 'Yeezy Index',
			subTitle: 'Top 30 Items by Yeezy',
			rankProfile: '(Ranked by Volume)',
			href: '/yeezyLogo.png',
		},
	];

	const cardObjectHref = '/markets/' + Markets[Market].title;
	useEffect(() => {}, [Market]);
	return (
		<React.Fragment>
			<div className="flex flex-col space-y-4 laptop:flex-row  laptop:space-x-4 laptop:space-y-0 pb-4">
				<div className="bg-white shadow-lg h-fit mobile:w-full laptop:w-[70%] rounded-lg font-SG p-12 ">
					<span className="flex flex-row justify-end">
						<a
							onClick={() =>
								mixpanelTrackProps('View Market', Markets[Market].title)
							}
							href={cardObjectHref}
							className="flex justify-center w-full tablet:w-fit text-center text-sm text-right px-3 py-2 text-lg font-medium space-x-1 bg-[#ACFF00] rounded-md"
						>
							<Image src='/search-icon-svg.svg' width={11} height={11} /> <span className="">See Composition</span>
						</a>
					</span>

					<div className="flex flex-col space-y-5">
						<FutureIndexSection market={Markets[Market]} />
						<div className="flex flex-col flex-1 ">
							<div className="flex flex-row bg-white border-2 border-[#0C1615] rounded-[40px]">
								<button
									type="selection"
									id="long"
									className={
										!isLong
											? 'flex flex-row justify-center items-center space-x-2  w-1/2 font-medium text-xl py-6 text-black bg-white  border-r-0 border-[#0C1615] rounded-tl-[40px] rounded-bl-[40px]  active:bg-[#ACFF00]'
											: 'flex flex-row justify-center items-center space-x-2  w-1/2 font-medium text-xl py-6 text-white  bg-[#0C1615] rounded-[40px]'
									}
									onClick={() => setIsLong(true)}
								>
									<p>Long 2x</p>
									<img
										className="mobile:w-[10px] laptop:w-[25px]"
										src="/upTrend.png"
									/>
								</button>
								<button
									type="selection"
									id="short"
									className={
										isLong
											? 'flex flex-row justify-center items-center space-x-2 w-1/2 font-medium text-xl py-6 text-black bg-white  border-l-0 border-[#0C1615] rounded-tr-[40px] rounded-br-[40px] active:bg-[#ACFF00]'
											: 'flex flex-row justify-center items-center space-x-2  w-1/2 font-medium text-xl py-6 text-white  bg-[#0C1615] rounded-[40px] '
									}
									onClick={() => setIsLong(false)}
								>
									<p>Short 2x</p>
									<img
										className="mobile:w-[10px] laptop:w-[25px]"
										src="/downTrend.png"
									/>
								</button>
							</div>
							<div className="mt-5 flex flex-row  bg-white items-center py-4 px-6 text-left w-[100%] border-[1px] border-black rounded-[80px]  focus:outline-2 focus:outline-offset-2 hover:outline-1">
								<p className="flex-1 text-left mobile:text-sm laptop:text-md pr-1">
									Amount:
								</p>
								<input
									className="flex-1 text-right mobile:text-sm laptop:text-md mobile:w-[10%] appearance-none focus:none focus:outline-none"
									name="Amount"
									id="amount"
									type="number"
									placeholder="$200"
									// onChange={() => CalculateTotal()}
									required
								/>
							</div>

							<button
								type="submit"
								id="mint"
								className="w-full font-medium mb-6 mt-3 text-xl py-4 text-white bg-[#0C1615] rounded-[80px] hover:opacity-70 active:bg-[#ACFF00]"
							>
								{isLong ? 'Mint Long' : 'Mint Short'}
							</button>
							<div className="pt-5">
								<h1 className="font-bold">
									Current Index Price:
									<span className="bg-[#ACFF00] py-2 px-3 rounded-full ml-2 text-sm font-normal">
										${s1?.estimatedMarketValue}
									</span>
								</h1>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col w-full laptop:w-[30%]">
					<div className="w-full h-full grid mobile:grid-cols-1 tablet:grid laptop:grid-cols-auto grid-rows-3 gap-y-6 place-items-stretch gap-x-6">
						{Markets !== undefined
							? Markets?.map((el, index) => (
									<button onClick={() => setMarket(index)}>
										<FutureCard index={index} cardObject={el} />
									</button>
							  ))
							: skeletonArray.map(() => (
									<Skeleton
										animation="pulse"
										variant="rounded"
										height={300}
										sx={{ borderRadius: '15px' }}
										width={'100%'}
									/>
							  ))}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
