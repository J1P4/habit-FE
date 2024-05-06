'use client';
import React from 'react';
import Ment from './components/Ment';
import FoodComponent from './components/Food';
import { useRouter } from 'next/navigation';

const RFpage = () => {
  return (
    <>
      <Ment />
      <FoodComponent />
    </>
  );
};

export default RFpage;
