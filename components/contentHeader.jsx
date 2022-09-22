import React from 'react';
import classNames from 'classnames';

export const ContentHeader = ({ title, children, icon, flexColumn }) => {
	return (
		<div className="w-[100%] text-inherit py-10 ">
			<div
				className={classNames(
					flexColumn
						? 'desktop:flex-col desktop:item-start desktop:space-y-5 desktop:space-x-0'
						: 'desktop:flex-row desktop:items-center  ',
					'flex flex-col space-x-4 space-y-5 items-center  tablet:flex-row tablet:space-x-0 tablet:space-y-0 laptop:flex-col laptop:items-start  laptop:space-y-0 laptop:space-x-0  desktop:flex-row desktop:space-y-0 desktop:space-x-2  '
				)}
			>
				<div className="flex justify-start space-x-3 mr-3 flex-0">
					{icon}
					<p className="text-2xl tablet:text-3xl font-SG">{title}</p>
				</div>
				<div className="mobile:mt-4 tablet:mt-0 ">{children}</div>
			</div>
		</div>
	);
};

ContentHeader.defaultProps = {
	title: '',
	children: '',
	icon: '',
	flexColumn: false,
};
