import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

const data = [

	{
		name: 'nike',
		children: [
			{ name: 'Nike Air Force', size: 7313 },
		],
	},
	{
		name: 'Jordan',
		children: [
			{ name: 'Jordan 4 Retro', size: 2859 },
		],
	},
	{ name: 'Jordan Super.Fly 4D', size: 4614 },

	{
		name: 'Adidas',
		children: [
			{ name: 'Adidas Campus 80s', size: 3286 },
			{
				name: 'label',
				children: [
					{ name: 'Adidas Superstar', size: 9956 },
					{ name: 'Adidas Forum Low', size: 3899 },
				],
			},


		],
	},
];

export const MarketTreeMap = () => {

	return (
		<ResponsiveContainer width="100%" height="100%">
			<Treemap width={400} height={200} data={data} dataKey="size" ratio={4 / 3} stroke="#fff"  fill="#0C1615" className='text-[red]' />
		</ResponsiveContainer>
	);

}
