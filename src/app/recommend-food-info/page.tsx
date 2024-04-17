'use client';
import React, { useState, useEffect } from 'react';
import HomeLayout from './layout';
import Ment from './components/Ment';
import FoodComponent from './components/Food';

const HomePage = () => {


  return (
    <>
      <HomeLayout>
        <Ment/>
        <FoodComponent/>
        <FoodComponent/>
      </HomeLayout> 
    </>
  );
};

export default HomePage;
