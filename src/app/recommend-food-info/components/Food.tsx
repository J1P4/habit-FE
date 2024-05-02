import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const FoodComponent = () => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await axios.post('/api/v1/food/recommend/ai', {});
        const { data } = response.data;
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
      {foodList.map((food, index) => (
        <div key={index} className="flex items-center bg-gray-100 mx-10 my-3 p-5 rounded-lg">
          <div className="flex-shrink-0 mr-4">
            <img
              className="w-20 h-20 object-cover rounded-lg"
              src="https://via.placeholder.com/150"
              alt="Food"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <p className="text-sm text-[#6CB663]">{food.calories}kcal</p>
            <h4 className="text-lg font-semibold">{food.name}</h4>
            <p className="text-sm text-gray-600">음식 주요 성분</p>
            <Link href={{ pathname: '/restaurant-info',  query: { food: food.name } }}>
              <button>추천 식당 보기</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodComponent;
