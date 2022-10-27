import React, { useEffect, useState } from 'react';

export const FutureIndexSection = ({ market }) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 400);
	}, [market]);
	return (
		<div >
			<div className={`m-auto py-4 tablet:w-[250px] h-[250px] `}>
				<img src={market.href} className="object-contain w-full h-full " />
			</div>
			<div className="flex flex-col space-y-5">
				<div className="flex-1 font-bold text-2xl text-center">
					{market.title} -
					<span className="font-normal">
						{market.subTitle}
						<br />
						<span className="text-sm">{market.rankProfile}</span>
					</span>
				</div>
			</div>
		</div>
	);
};
