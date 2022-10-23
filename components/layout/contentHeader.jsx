import React from 'react';
import classNames from 'classnames';

export const ContentHeader = ({ title, children, icon, flexColumn }) => {
	return (
		<div className="w-[100%] text-inherit py-10 ">
			<div
				className={
					'flex flex-col  space-y-5 items-center  tablet:flex-row tablet:space-y-0'
				}
			>
				<div className="flex justify-start space-x-3 mr-3 flex-0 flex-1 ">
					{icon}
					<p className="text-2xl tablet:text-3xl font-SG">{title}</p>
				</div>
				<div className="mobile:mt-4 tablet:mt-0 px-6 items-center   ">
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
	flexColumn: false,
};
