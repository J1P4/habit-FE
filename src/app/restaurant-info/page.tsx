'use client';
import React, { useState, useEffect } from 'react';
import RestaurantComponent from './components/Restaurant';
import HomeLayout from './layout';
import Ment from './components/Ment';

const HomePage = () => {

  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    // 서버에서 데이터를 가져오는 비동기 함수 호출
    const fetchData = async () => {
      try {
        // 서버에서 데이터를 가져오는 API 호출
        const response = await fetch('https://chanjin.shop');
        const data = await response.json();
        // 받은 데이터를 상태에 저장
        setRestaurantData(data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    // fetchData 함수 호출
    fetchData();
  }, []);

  return (
    <>
      <HomeLayout>
        <Ment/>
        <RestaurantComponent/>
        <RestaurantComponent/>
      </HomeLayout> 
    </>
  );
};

export default HomePage;
