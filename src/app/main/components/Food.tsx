
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FoodComponent = ({ food }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.push({ pathname: '/main', query: { food: food } }, undefined, { shallow: true });
    }
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  return (
    <div className="flex p-3">
      <div className='flex justify-between items-center '>
        <h4 className="text-lg font-semibold p-1">🍴 {food} </h4>
        <span>추천식당</span>
      </div>
    </div>
  );
};

export default FoodComponent;
