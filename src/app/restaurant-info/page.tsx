

//src/app/naver-api/page.tsx
'use client'


import React, { useState, useEffect } from 'react';
import Ment from './components/Ment';
import RestaurantComponent from './components/Restaurant';
import MobileViewLayout from '@/commons/layouts/MobileViewLayout';

export default function RIPage() {
  const [food, setFood] = useState('');

  // You can set the value of 'food' using useEffect or any other method you prefer

  return (
    <MobileViewLayout>
      <Ment />
      <RestaurantComponent food={food} />
    </MobileViewLayout>
  );
}
