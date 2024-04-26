'use client'
import React, { useState } from 'react';
import HomeLayout from './layout';
import Ment from './components/Ment';
import FoodComponent from './components/Food';
import {useRouter} from "next/navigation";

const RFpage = () => {
  const router = useRouter();

  const [food, setFood] = useState('우동');


  return (
    <>
      <HomeLayout>
        <Ment/>
        <FoodComponent food={food}/>
      </HomeLayout> 
    </>
  );
};

export default RFpage;
