import React from 'react';

export const ContentHeader = ({ title, children, icon }) => {
	return (
		<div className="w-[100%] text-inherit py-10 ">
			<div className="flex flex-col desktop:flex-row  laptop:flex-col laptop:items-start laptop:space-y-2 laptop:space-x-0 desktop:flex-row desktop:space-y-0 desktop:space-x-2 desktop:items-center tablet:flex-row space-x-4 items-center">
				<div className="flex justify-start space-x-3 mr-3 flex-0">
					{icon}
					<p className="text-2xl tablet:text-3xl font-SG">{title}</p>
				</div>
				<div className="flex justify-start mobile:mt-4 tablet:mt-0 flex-0">
					{children}
				</div>
			</div>
		</div>
	);
};

ContentHeader.defaultProps = {
	title: '',
	children: '',
	icon: '',
};
