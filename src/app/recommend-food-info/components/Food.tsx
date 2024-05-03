import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { fetcher } from '@/commons/apis/fetcher';

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
          <div className="flex-shrink-0 mr-4">
            {/* 이미지를 표시할 부분 */}
          </div>
          <div className="flex flex-col flex-grow">
            <p className="text-sm text-[#6CB663]">{food.calories}kcal</p>
            <h4 className="text-lg font-semibold">{food.name}</h4>
          
          </div>
          {/* 추천 식당 보기 버튼을 오른쪽으로 이동 */}
          <div className="ml-auto">
            <Link href={{ pathname: '/restaurant-info', query: { food: food.name } }}>
              <button className="bg-[#FF9385] hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                추천 식당
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodComponent;
