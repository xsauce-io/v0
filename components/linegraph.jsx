import { ResponsiveLine } from '@nivo/line'
   

export const Linegraph = () => {

  const data = [{
    
      "id": "japan",
      "color": "hsl(138, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 182
        },
        {
          "x": "helicopter",
          "y": 141
        },
        {
          "x": "boat",
          "y": 159
        },
        {
          "x": "train",
          "y": 143
        },
        {
          "x": "subway",
          "y": 33
        },
        {
          "x": "bus",
          "y": 147
        },
        {
          "x": "car",
          "y": 21
        },
        {
          "x": "moto",
          "y": 98
        },
        {
          "x": "bicycle",
          "y": 298
        },
        {
          "x": "horse",
          "y": 167
        },
        {
          "x": "skateboard",
          "y": 134
        },
        {
          "x": "others",
          "y": 300
        }
      ]
    
    }
  ]

  return (
    <div className='w-full h-[350px]'>
    <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle'
    }}
    axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle'
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    enableArea={true}
    useMesh={true}
/>
</div>
)
}
