'use client';

import useUserFoodHistory from '@/app/modi-nurti/hooks/useUserFoodHistory';
import ModiDrawer from '@/app/modi-nurti/components/modi-drawer';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useUserFoodHistory('WEEK');
  const { push } = useRouter();
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
              <div className="flex py-4" onClick={() => onClickItem(food.historyId)}>
                {food.foodName}
              </div>
            </div>
          ))}
        </div>
      ))}
      <ModiDrawer isOpen={isOpen} onOpenChange={onOpenChange} nurtiId={nurtiId} />
    </div>
  );
}
