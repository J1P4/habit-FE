'use client'
import React, { useState } from 'react';
import HomeLayout from './layout';
import Ment from './components/Ment';
import FoodComponent from './components/Food';

const HomePage = () => {
  const [food, setFood] = useState('김밥');

  return (
    <>
      <HomeLayout>
        <Ment/>
        <FoodComponent food={food}/>
      </HomeLayout> 
    </>
  );
};

export default HomePage;
