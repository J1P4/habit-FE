'use client';
import { Input } from '@/commons/components/ui/input';
import { SearchIcon } from 'lucide-react';
import useSearchFoodList from '@/app/food-entry/api/queries/useSearchFoodList';
import { useCallback, useRef, useState } from 'react';
import { useIntersectionObserver } from '@/app/food-entry/hooks/useIntersectionObserver';
import FoodList from '@/app/food-entry/components/food-list';
import useSearchInfiniteFoodList from '@/app/food-entry/api/queries/useSearchFoodList';
import { useSearchFoodListContext } from '@/app/food-entry/context/search-food-list-context';
import FoodDrawer from '@/app/food-entry/components/food-drawer';

export default function FoodEntryPage() {
  const { setValue, getValue } = useSearchFoodListContext();
  const keyword = getValue().keyword;

  return (
    <>
      <Input
        endIcon={SearchIcon}
        className="rounded-2xl py-6"
        placeholder="오늘 먹은 음식을 입력해주세요!"
        value={keyword}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="mb-4" />
      <FoodList />
      <FoodDrawer />
    </>
  );
}
