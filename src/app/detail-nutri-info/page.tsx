'use client';

import React, { useState } from 'react';
import NutriChart from '@/app/detail-nutri-info/components/nutri-chart';
import NutriList from '@/app/detail-nutri-info/components/nutri-list';
import {
  DateRangeType,
  NutrientData,
} from '@/app/detail-nutri-info/api/queries/useGetUserNutriDetailHistory';
import useDetailNutriList from '@/app/detail-nutri-info/hooks/useDetailNutriList';
import { nutrientNameMapping } from '@/app/detail-nutri-info/constants/nutrientNameMapping';

const DetailNutriInfoPage = () => {
  const [dateFilter, setDateFilter] = useState<DateRangeType>('DAY');

  const { data, isGetUserNutriDetailHistoryLoading } = useDetailNutriList(dateFilter);

  const carbohydrateRatio = Math.min(
    (data?.totalData?.carbohydrate / (data?.essentialNutrition.carbohydrate ?? 1)) * 100,
    100,
  );

  const proteinRatio = Math.min(
    (data?.totalData?.protein / (data?.essentialNutrition.protein ?? 1)) * 100,
    100,
  );

  const fatRatio = Math.min(
    (data?.totalData?.fat / (data?.essentialNutrition.fat ?? 1)) * 100,
    100,
  );

  // TODO Loading 상태일 때 로딩 컴포넌트 추가하기
  if (isGetUserNutriDetailHistoryLoading) return <div>로딩중</div>;
  return (
    <>
      <div>
        <div className="flex items-center py-4 px-4 gap-4">
          <div
            className={`cursor-pointer flex justify-center items-center border-blue-400 border-[1px]  w-[50px] rounded-lg ${dateFilter === 'DAY' ? 'bg-blue-500 text-white border-none' : 'bg-transparent'}`}
            onClick={() => setDateFilter('DAY')}
          >
            일간
          </div>
          <div
            className={`cursor-pointer flex justify-center items-center border-blue-400 border-[1px] rounded-lg w-[50px] ${dateFilter === 'WEEK' ? 'bg-blue-500 text-white border-none' : 'bg-transparent'}`}
            onClick={() => setDateFilter('WEEK')}
          >
            주간
          </div>
          <div
            className={`cursor-pointer flex justify-center items-center border-blue-400 border-[1px]   rounded-lg w-[50px] ${dateFilter === 'MONTH' ? 'bg-blue-500 text-white border-none' : 'bg-transparent'}`}
            onClick={() => setDateFilter('MONTH')}
          >
            월간
          </div>
        </div>
        <div className="bg-[#F4F9F3] w-full  pt-4 flex flex-col items-center pb-6">
          <div className="text-[#FF9385]">{dateFilter}</div>
          <div className="mb-10" />
          <div className="flex gap-4 flex-col items-center w-full">
            <NutriChart
              carbohydrateRatio={carbohydrateRatio}
              proteinRatio={proteinRatio}
              fatRatio={fatRatio}
            />
            <div className="mb-2" />
            <div className="flex justify-around w-full">
              <div className="flex flex-col items-center max-w-[60px] w-full">
                <div className="text-[#FF9385]">탄수화물</div>
                <div>{Math.round(data?.totalData?.carbohydrate)}g</div>
              </div>
              <div className="flex flex-col items-center max-w-[60px] w-full">
                <div className="text-[#FF9385]">단백질</div>
                <div>{Math.round(data?.totalData?.protein)}g</div>
              </div>
              <div className="flex flex-col items-center max-w-[60px] w-full">
                <div className="flex flex-col items-center">
                  <div className="text-[#FF9385]">지방</div>
                  <div>{Math.round(data?.totalData?.fat)}g</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NutriList energy={data.totalData.energy}>
          {Object.entries(data.totalData).map(([key, value]) => {
            // 사용자가 섭취한 영양소의 양과 권장 영양소의 양을 가져옵니다.
            const consumed = Math.round(value); // 사용자가 섭취한 양
            const 권장영양소 = data.essentialNutrition;
            const recommended = 권장영양소[key as keyof NutrientData]
              ? Math.round(권장영양소[key as keyof NutrientData])
              : '정보 없음'; // 권장량, 없다면 "정보 없음" 표시
            return (
              <NutriList.Item key={key}>
                <div className=" w-[100px] ">{nutrientNameMapping[key] || key}</div>{' '}
                {/* 영양소 이름 */}
                <div className="w-[100px] text-center"> {consumed}</div>{' '}
                {/* 사용자가 섭취한 영양소의 양 */}
                <div className="w-[100px] text-center">{recommended}</div> {/* 권장 영양소의 양 */}
              </NutriList.Item>
            );
          })}
        </NutriList>
      </div>
    </>
  );
};

export default DetailNutriInfoPage;
