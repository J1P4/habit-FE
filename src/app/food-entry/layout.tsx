'use client';

import MobileViewLayout from '@/commons/layouts/MobileViewLayout';
import { Header } from '@/commons/components/header/header';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/commons/constants/paths';
import SearchFoodListContextProvider from '@/app/food-entry/context/search-food-list-context';

export default function FoodEntryLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const onLeftClick = () => {
    push(PATHS.메인);
  };
  return (
    <MobileViewLayout>
      <Header
        leftSideButton={
          <button className="flex h-full w-[16px] items-center " onClick={onLeftClick}>
            <ArrowLeft />
          </button>
        }
      />
      {/*TODO Page 공통 padding 정의 후 컴포넌트화*/}
      <div className="px-4">
        <SearchFoodListContextProvider>{children}</SearchFoodListContextProvider>
      </div>
    </MobileViewLayout>
  );
}
