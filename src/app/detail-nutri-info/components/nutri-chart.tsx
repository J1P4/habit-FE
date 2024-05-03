import { PolarArea } from 'react-chartjs-2';
import React from 'react';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const NutriChart = ({
  carbohydrateRatio = 0,
  fatRatio = 0,
  proteinRatio = 0,
}: {
  carbohydrateRatio?: number;
  fatRatio?: number;
  proteinRatio?: number;
}) => {
  const data = {
    labels: ['탄수화물', '단백질', '지방'],
    datasets: [
      {
        label: '# of Votes',
        data: [Math.round(carbohydrateRatio), Math.round(proteinRatio), Math.round(fatRatio)],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        ticks: {
          backdropColor: '#F4F9F3',
        },
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };
  return <PolarArea data={data} options={options} />;
};

export default NutriChart;
