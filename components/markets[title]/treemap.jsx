import { ResponsiveTreeMap } from '@nivo/treemap';

export const TreeMap = () => {
	const data = {
		name: 'viz',
		color: 'hsl(200, 70%, 50%)',
		children: [
			{
				name: 'stack',
				color: 'hsl(205, 70%, 50%)',
				children: [
					{
						name: 'Yeezy 350z Yeichel',
						color: 'hsl(261, 70%, 50%)',
						loc: 100,
					},
					{
						name: 'xAxis',
						color: 'hsl(36, 70%, 50%)',
						loc: 200,
					},
					{
						name: 'yAxis',
						color: 'hsl(244, 70%, 50%)',
						loc: 57,
					},
					{
						name: 'layers',
						color: 'hsl(29, 70%, 50%)',
						loc: 700,
					},
				],
			},
		],
	};

	return (
		<div className="w-full h-[300px] bg-white rounded-lg p-4">
			<ResponsiveTreeMap
				data={data}
				identity="name"
				value="loc"
				label="id"
				leavesOnly={true}
				valueFormat=".02s"
				margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
				labelSkipSize={12}
				labelTextColor={{
					from: 'color',
					modifiers: [['darker', 1.2]],
				}}
				parentLabelPosition="left"
				parentLabelTextColor={{
					from: 'color',
					modifiers: [['darker', 2]],
				}}
				borderColor={{
					from: 'color',
					modifiers: [['darker', 0.1]],
				}}
			/>
		</div>
	);
};
