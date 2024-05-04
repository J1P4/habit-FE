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

export default function MainPage() {
  const { summary, isSummaryLoading } = useGetTodayUserNutritionAnalysiscardData();
  const router = useRouter();

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
    <div>
      <div className="flex flex-col items-center">
        <Headline title="오늘의 영양 분석 보고서 입니다" />
        <TodayUserNutritionAnalysisCard summaryNutrients={summary} />
        <Button onClick={goToTodayFood}>오늘 먹은 음식 입력하러 가기</Button>

        <div>
          <Ment></Ment>
          <FoodComponent food={food}></FoodComponent>
          <RestaurantComponent food={food}></RestaurantComponent>
        </div>

        <Button onClick={goToModiNurti}>오늘의 영양분 분석 수정하러 가기</Button>
      </div>
    </div>
  );
}
