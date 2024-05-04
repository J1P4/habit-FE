'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FoodComponent = ({ food }: any) => {
  const router = useRouter();

  const handleClick = () => {
    // 버튼 클릭 시 다른 페이지로 이동
    router.push('/recommend-food-info');
  };

  return (
    
    <div className="flex p-3 justify-between ">
      <div className="flex justify-between items-center ">
        <h4 className="text-lg font-semibold p-1">🍴 {food} </h4>
        <span>추천식당</span>
      </div>
     
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EBEBEB] text-[#FF9385] text-4xl font-bold"
        onClick={handleClick}
      >
        +
      </button>
    </div>
  );
};

export default FoodComponent;
