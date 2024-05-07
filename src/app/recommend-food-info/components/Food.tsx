// src/app/recommend-food-info/components/Food.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { fetcher } from '@/commons/apis/fetcher';
import RestaurantIcon from './restaurant-icon';
import { Button } from '@/commons/components/ui/button';
import { useRouter } from 'next/navigation';

const FoodComponent = () => {
  const router = useRouter();

  const goToTodayFood = () => {
    router.push('/food-entry');
  };

  const [foodlist, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await fetcher.get('api/v1/food/recommend/ai', {});
        const { data } = response;
        if (data && data.foodlist) {
          setFoodList(data.foodlist);
        } else {
          setError('오늘 먹은 음식을 입력해주세요!');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

   
    fetchFoodList();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) {
  return (
    <div>
      <div className='w-full text-center font-bold my-[50px]'>오늘 먹은 음식이 없어요! 입력해주세요 😊</div>
      <Button className="w-full bg-[#FF9385] rounded-[10px] py-6" onClick={goToTodayFood}>
        오늘 먹은 음식 입력하러 가기
      </Button>
    </div>
  );
  }
  

  return (
    <div>
      {foodlist.map((food, index) => (
        <div key={index} className="flex items-center bg-gray-100 mx-10 my-3 p-5 rounded-lg">
          <div className="flex flex-col p-1">
            <p className="text-md text-[#6CB663] font-semibold">{food.kcal}kcal</p>
            <h4 className="text-lg font-semibold py-1">{food.name}</h4>
            <div className="flex">
              <p className="text-sm mr-2 text-[#767676]">탄수 {food.carbohydrate}g &nbsp; | </p>
              <p className="text-sm mr-2 text-[#767676]">단백질 {food.protein}g &nbsp; | </p>
              <p className="text-sm mr-2 text-[#767676]">지방 {food.fat}g &nbsp;</p>
            </div>
          </div>

          <div className="ml-auto text-center bg-gray-100 rounded-lg p-3">
            <div className="flex flex-col"></div>
          </div>

          {/* 추천 식당 보기 버튼을 오른쪽으로 이동 */}
          <div className="ml-auto">
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
