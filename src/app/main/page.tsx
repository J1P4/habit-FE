// src/app/main/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
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
import useCurrentPosition from '@/app/main/api/queries/useCurrentPosition';
import useGoogleApiInfo from '@/app/main/api/queries/useGoogleApiInfo';
import extractSearchKeyword from '@/app/main/uitls/extractSearchKeyword';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function MainPage() {
  const { summary, isSummaryLoading } = useGetTodayUserNutritionAnalysiscardData();
  const router = useRouter();

  const { data: currentPosition, isLoading: isCurrentPositionLoading } = useCurrentPosition();

  const latitude = currentPosition?.coords?.latitude ?? 0;
  const longitude = currentPosition?.coords?.longitude ?? 0;

  const { data: googleApiInfo, isLoading: isGoogleApiLoading } = useGoogleApiInfo(
    latitude,
    longitude,
  );

  const address = googleApiInfo?.data.results[0].formatted_address;

  const searchKeyword = extractSearchKeyword(address);

  const { data: recommendData, isLoading: isRecommendLoading } = useRecommendFood();

  const recommendFood = recommendData?.[0]?.name ?? '';

  const { push } = useRouter();

  console.log('address', searchKeyword);
  const goToTodayFood = () => {
    push('/food-entry');
  };

  const goToRecommendRestaurant = () => {
    push(`/recommend-restaurant?dong=${searchKeyword}`);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div>
        <Headline title="오늘의 영양 분석 보고서 입니다" />
        <TodayUserNutritionAnalysisCard summaryNutrients={summary} />
        <Ment region={searchKeyword}></Ment>
        <FoodComponent food={recommendFood}></FoodComponent>
        <div className="mb-4" />
        <RestaurantComponent
          searchKeyword={searchKeyword}
          food={recommendFood}
          isLoading={isCurrentPositionLoading || isGoogleApiLoading}
        ></RestaurantComponent>
      </div>
      <div
        className="text-[16px] font-bold whitespace-pre-line mt-4 flex justify-between w-full px-4 cursor-pointer bg-green-50 py-4 rounded-lg text-green-600"
        onClick={goToRecommendRestaurant}
      >
        <div>우리동네 모범 식당 확인하러 가기</div>
        <ArrowRight />
      </div>
      <FixedBottomWrapper>
        <Button className="w-full bg-[#FF9385] rounded-[10px] py-6 " onClick={goToTodayFood}>
          오늘 먹은 음식 입력하러 가기
        </Button>
      </FixedBottomWrapper>
    </div>
  );
}
