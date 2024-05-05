'use client'
import React, { useState } from 'react';
import HomeLayout from './layout';
import Ment from './components/Ment';
import FoodComponent from './components/Food';
import {useRouter} from "next/navigation";

const RFpage = () => {
  const router = useRouter();

  return (
    <>
      <HomeLayout>
        <Ment/>
        <FoodComponent/>
      </HomeLayout> 
    </>
  );
};

export default RFpage;
