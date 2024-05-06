// src/app/recommend-food-info/components/Food.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { fetcher } from '@/commons/apis/fetcher';
import RestaurantIcon from './restaurant-icon';

const FoodComponent = () => {
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
          setError('No food data available');
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
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {foodlist.map((food, index) => (
        <div key={index} className="flex items-center bg-gray-100 mx-10 my-3 p-5 rounded-lg">
          <div className="flex flex-col ">
            <p className="text-sm text-[#6CB663]">{food.energy}kcal</p>
            <h4 className="text-lg font-semibold">{food.name}</h4>
            <div className="flex">
              <p className="text-sm mr-2 text-[#767676]">탄 {food.moisture}g | </p>
              <p className="text-sm mr-2 text-[#767676]">단 {food.protein}g | </p>
              <p className="text-sm mr-2 text-[#767676]">지 {food.fat}g</p>
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
