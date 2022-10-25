import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement, Filler, Tooltip } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale, BarController, BarElement, Filler);

const data1 = [];
let prev = 100;

for (let i = 0; i < 500; i++) {
  prev += 5 - Math.random() * 10;
  data1.push({ x: i, y: prev });
}

const totalDuration = 5000;
const delayBetweenPoints = totalDuration / data1.length;
console.log(delayBetweenPoints)

const previousY = (ctx) => {
  ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
}
const animation = {
  x: {
    type: 'number',
    easing: 'easeOutCubic',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};




const data = {
  datasets: [{
    borderColor:"rgba(172, 255, 0, 1)",
    borderWidth: 1.2,
    radius: 0,
    data: data1,

  },]
}


const options = {


  plugins: {

    // show legends for our graph
  legend: {
      display: true,
    },
  },
  elements: {
    line: {
      tension: 0,
      borderWidth: 1,
      borderColor: "rgba(172, 255, 0, 1)",
      fill: "start",
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);

        gradient.addColorStop(0, "rgba(172, 255, 0, 1)");
        gradient.addColorStop(0.5, "rgba(172, 255, 0, .2)");
        gradient.addColorStop(1, "rgba(255, 255, 255, .0)");
        return gradient;
      },

    },
    point: {
      radius: 0,
      hitRadius: 0,
    },
  },


  //   animate in

  animation,


  responsive: true,

  scales: {

    x: {
      display: true,
      type: 'linear',
      position: 'left',
      grid: {
         display: false
      }
    },
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      grid: {
         display: false
      }


    }
  }

};



export const FreePlayGraph = () => {
  return (
    <div className='w-full'>
      <Chart
        type='line'
        data={data}
        options={options}
      />
    </div>
  );
}
