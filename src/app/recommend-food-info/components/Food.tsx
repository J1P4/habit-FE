// src/app/recommend-food-info/components/Food.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { fetcher } from '@/commons/apis/fetcher';
import RestaurantIcon from './restaurant-icon';
import { Button } from '@/commons/components/ui/button';
import { useRouter } from 'next/navigation';
import { ResponseRecommendFood } from '@/app/main/api/queries/useRecommendFood';

const FoodComponent = () => {
  const router = useRouter();

  const goToTodayFood = () => {
    router.push('/food-entry');
  };

  const [foodlist, setFoodList] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const { data } = await fetcher.get<ResponseRecommendFood>('api/v1/food/recommend/ai', {});
        if (data && data.foodlist) {
          setFoodList(data.foodlist);
        } else {
          setError('오늘 먹은 음식을 입력해주세요!');
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFoodList();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <div>
        <div className="w-full text-center font-bold my-[50px]">
          음식 추천을 위한 섭취 음식 정보가 부족해요! <br/><br/> 먹은 음식을 입력해주세요 😊
        </div>
        <Button className="w-full bg-[#FF9385] rounded-[10px] py-6" onClick={goToTodayFood}>
          오늘 먹은 음식 입력하러 가기
        </Button>
      </div>
    );
  }

  return (
    <div className='w-full min-w-[410px] rounded-lg border border-gray-300'>
      {foodlist.map((food: any, index: any) => (
        <div key={index} className="flex items-center bg-gray-100 mx-5 my-4 p-5 rounded-lg">
          <div className="flex flex-col p-1">
            <p className="text-md text-[#6CB663] font-semibold">{food.kcal}kcal</p>
            <h4 className="text-lg font-semibold py-1">{food.name}</h4>
            <div className="flex w-[300px]">
              <p className="text-sm mr-2 text-[#767676]">탄수 {food.carbohydrate}g &nbsp; | </p>
              <p className="text-sm mr-2 text-[#767676]">단백질 {food.protein}g &nbsp; | </p>
              <p className="text-sm text-[#767676]">지방 {food.fat}g &nbsp;</p>
            </div>
          </div>

          <div className='pr-3'>
            <Link
              href={{
                pathname: '/restaurant-info',
                query: { food: food.name, category: food.category },
              }}
            >
              <RestaurantIcon></RestaurantIcon>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodComponent;
