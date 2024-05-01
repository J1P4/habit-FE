'use client';

import React from 'react';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const DetailNutriInfoPage = () => {
  const data = {
    labels: ['탄수화물', '단백질', '지방'],
    datasets: [
      {
        label: '# of Votes',
        data: [42, 39, 80],
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
  return (
    <>
      <div>
        <div className="bg-[#F4F9F3] w-full  pt-4 flex flex-col items-center pb-6">
          <div className="text-[#FF9385]">04.03 수</div>
          <div className="mb-10" />
          <div className="flex gap-4 flex-col items-center w-full">
            <PolarArea data={data} options={options} />
            <div className="mb-2" />
            <div className="flex justify-around w-full">
              <div className="flex flex-col items-center max-w-[60px] w-full">
                <div className="text-[#FF9385]">탄수화물</div>
                <div>42g</div>
              </div>
              <div className="flex flex-col items-center max-w-[60px] w-full">
                <div className="text-[#FF9385]">단백질</div>
                <div>39g</div>
              </div>
              <div className="flex flex-col items-center max-w-[60px] w-full">
                <div className="flex flex-col items-center">
                  <div className="text-[#FF9385]">지방</div>
                  <div>80g</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center py-6 px-4">
          <div>영양정보</div>
          <div className="flex flex-col items-center w-full">
            <div className="flex w-full justify-between  border-b-[1px] py-4 items-center">
              <div>총 열량</div>
              <div className="text-xl">2300 Kcal</div>
            </div>
            <ul className="w-full">
              <li>
                <div className="flex justify-between py-4">
                  <div>탄수화물</div>
                  <div>21g</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between py-4">
                  <div>단백질</div>
                  <div>6g</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between py-4">
                  <div>지방</div>
                  <div>6g</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between py-4">
                  <div>비타민A</div>
                  <div>4g</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailNutriInfoPage;
