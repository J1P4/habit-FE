'use client';

import useUserFoodHistory from '@/app/modi-nurti/hooks/useUserFoodHistory';
import ModiDrawer from '@/app/modi-nurti/components/modi-drawer';
import { useCallback, useState } from 'react';

const Time = {
  BREAKFAST: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
} as const;

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useUserFoodHistory('WEEK');
  const [nurtiId, setNurtiId] = useState<number>(0);
  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const onClickItem = (id: number) => {
    onOpenChange(true);
    setNurtiId(id);
  };

  return (
    <div className="px-4 flex flex-col h-auto">
      {data?.map((food) => (
        <div key={food.date} className="flex flex-col">
          <div className="flex w-full py-4 border-b-2">{food.date}</div>
          {food.foods.map((food) => (
            <div key={food.historyId}>
              <div
                className="flex flex-col py-4 border-[1px] my-4 rounded-md cursor-pointer hover:bg-gray-100  px-2 w-full"
                onClick={() => onClickItem(food.historyId)}
              >
                <div className="flex justify-between items-center">
                  <div className="text-[16px] font-bold">{food.foodName}</div>
                  <div className="text-[12px]">{Time[food.time as keyof typeof Time]}</div>
                </div>
                <div className="flex mt-4 justify-between text-[12px] ">
                  <div>탄수화물 : {Math.round(food.carbohydrate)}g</div>
                  <div>단백질 : {Math.round(food.protein)}g</div>
                  <div>지방 : {Math.round(food.fat)}g</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <ModiDrawer isOpen={isOpen} onOpenChange={onOpenChange} nurtiId={nurtiId} />
    </div>
  );
}
