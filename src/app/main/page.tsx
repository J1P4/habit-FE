// src/app/main/page.tsx
'use client';
import React, { useState } from 'react';
import { Button } from '@/commons/components/ui/button';
import { useRouter } from 'next/navigation';
import Ment from './components/Ment';
import Headline from '@/app/main/components/headline';
import TodayUserNutritionAnalysisCard from '@/app/main/components/today-user-nutrition-analysis-card';
import useGetTodayUserNutritionAnalysiscardData from '@/app/main/hooks/use-get-today-user-nutrition-analysiscard-data';
import FoodComponent from './components/Food';
import RestaurantComponent from './components/Restaurant';
import FixedBottomWrapper from '@/commons/components/FixedBottomWrapper';
import useRecommendFood from '@/app/main/api/queries/useRecommendFood';

export default function MainPage() {
  const { summary, isSummaryLoading } = useGetTodayUserNutritionAnalysiscardData();
  const router = useRouter();

  const { data, isLoading } = useRecommendFood();

  // const recommendFood = data?.data?.foodList[0].name ?? [];
  // console.log('recommendFood', recommendFood);

  const [food, setFood] = useState('우동');

  const { push } = useRouter();
  console.log('summary', summary);
  const goToTodayFood = () => {
    push('/food-entry');
  };

  const goToModiNurti = () => {
    push('/modi-nurti');
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div>
        <Headline title="오늘의 영양 분석 보고서 입니다" />
        <TodayUserNutritionAnalysisCard summaryNutrients={summary} />
        {/*<Button onClick={goToModiNurti}>오늘의 영양분 분석 수정하러 가기</Button>*/}
        <Ment></Ment>
        <FoodComponent food={food}></FoodComponent>
        <div className="mb-4" />
        <RestaurantComponent food={food}></RestaurantComponent>
      </div>
      <FixedBottomWrapper>
        <Button className="w-full bg-[#FF9385] rounded-[10px] py-6 " onClick={goToTodayFood}>
          오늘 먹은 음식 입력하러 가기
        </Button>
      </FixedBottomWrapper>
    </div>
  );
}
