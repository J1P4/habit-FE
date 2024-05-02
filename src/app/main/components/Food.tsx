'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FoodComponent = ({ food }: any) => {
  return (
    <div className="flex p-3">
      <div className="flex justify-between items-center ">
        <h4 className="text-lg font-semibold p-1">🍴 {food} </h4>
        <span>추천식당</span>
      </div>
    </div>
  );
};

export default FoodComponent;
