

//src/app/naver-api/page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Ment from './components/Ment';
import RestaurantComponent from './components/Restaurant';
import MobileViewLayout from '@/commons/layouts/MobileViewLayout';

export default function RIPage() {
  
  return (
    <MobileViewLayout>
      <Ment></Ment>
      <RestaurantComponent restaurantInfo={'한식'}></RestaurantComponent>
    </MobileViewLayout>
  );
}

