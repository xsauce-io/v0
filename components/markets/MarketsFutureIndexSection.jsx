import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from '/utils/hooks/useWindowDimensions.js';

export const MarketsFutureIndexSection = ({ market, handleCallback }) => {
	const [loading, setLoading] = useState(false);

	const screens = {
		mobile: '300',
		tablet: '640',
		smlaptop: '1024',
		laptop: '1200',
		desktop: '1400',
	};
	const { width } = useWindowDimensions();

	const setState = (NetworkIndex) => {
		handleCallback(NetworkIndex)
	};

	useEffect(() => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 400);
	}, [market]);
	return (
		<>
			<div className={`m-auto py-4 tablet:w-[250px] h-[250px]`}>
				<img src={market.href} className="object-contain w-full h-full " />
			</div>
			{width >= screens.tablet ? (
				<>
					<div className="dropdown dropdown-end ">
						<div className="flex-1 font-bold text-2xl text-center">
							{market.title} -
							<span className="font-normal">
								{market.subTitle}
								<br />
								<span className="text-sm">{market.rankProfile}</span>
							</span>
						</div>
					</div>
				</>) : (
				<>
					<div className="dropdown dropdown-center dropdown-hover rounded-xl p-4 flex flex-row justify-center shadow shadow-xl  hover:bg-[lightgrey] focus:bg-[lightgrey] rounded-3xl ">
						<label
							tabindex="0"
							className="text-[14px] flex flex-row text-black justify-center "
						>

							<div className="flex-1 font-bold text-2xl text-center">
								{market.title} -
								<span className="font-normal">
									{market.subTitle}
									<br />
									<span className="text-sm">{market.rankProfile}</span>
								</span>
							</div>
							<img src="/down-arrow-black-icon-svg.svg" className="h-auto w-[22px] ml-1" />
						</label>
						<ul
							tabindex="0"
							className="menu dropdown-content bg-[lightgrey] text-black p-2 shadow rounded-box w-full mt-30"
						>
							<li>
								<a className='hover:bg-white active:bg-[#ACFF00] active:text-black' onClick={() => setState(0)}>
									<div className='h-full w-[10%]'>
										<img className="object-contain" src="/culture-index-image.jpg" />
									</div>
									Culture Index
								</a>
							</li>
							<li>
								<a className='hover:bg-white active:bg-[#ACFF00] active:text-black' onClick={() => setState(1)}>
									<div className='h-full w-[10%]'>
										<img className="object-contain py-2 " src="/nike.png" />
									</div>
									Nike Index
								</a>
							</li>
							<li>
								<a className='hover:bg-white active:bg-[#ACFF00] active:text-black' onClick={() => setState(2)}>
									<div className='h-full w-[10%]'>
										<img className="object-contain scale-80" src="/yeezyLogo.png" />
									</div>
									Yeezy Index
								</a>
							</li>
						</ul>
					</div>
				</>
			)
			}
		</>
	);
};
