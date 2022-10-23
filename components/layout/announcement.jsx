import React from 'react';

export const Announcement = () => {
	return (
		<div className=" p-2 text-inherit bg-inherit font-SG flex flex-row justify-center items-center mobile:text-sm laptop:text-[12px] w-full">
			<p>
				* We are in Phase Zero. All wagers are in paper money until we officialy
				launch.
			</p>
			&nbsp;
			<a className="underline hover:text-inherit" href="docs.xsauce.io">
				Learn more
			</a>
			&nbsp;*
		</div>
	);
};
