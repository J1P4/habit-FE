'use client';
import { useSearchParams } from 'next/navigation';
import useSearchInfiniteRestaurantList from '@/app/recommend-restaurant/api/queries/useSearchRestaurant';
import Headline from '@/app/main/components/headline';
import { useIntersectionObserver } from '@/app/food-entry/hooks/useIntersectionObserver';

export default function RecommendRestaurantPage() {
  const searchParams = useSearchParams();
  const dong = searchParams.get('dong') as string;
  const { data, fetchNextPage, hasNextPage, isFetching } = useSearchInfiniteRestaurantList(dong);
  const restaurants = data?.pages.map((page) => page.data).flat();
  const { setTarget, isFetching: isDebounceFetching } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });
  console.log('restaurants', restaurants);
  return (
    <div>
      <div className="w-full flex flex-col pt-3 pb-10 pl-4">
        <h1 className="text-[20px] font-bold whitespace-pre-line">{`우리동네(${dong}) 모범 음식점!`}</h1>
      </div>
      {restaurants?.map((restaurant, i) => {
        return (
          <div
            key={restaurant.name + i}
            className="flex items-center  py-4 px-2 w-full border-[1px] mb-4 rounded-md cursor-pointer hover:bg-gray-100"
          >
            <div className="flex flex-col w-full">
              <div className="text-[16px] font-bold">{restaurant.name}</div>
              <div className="mb-4" />
              <div className="text-[12px] flex justify-between  ">
                <div>{restaurant.foodType}</div>
                <div className=" text-gray-500">{restaurant.locationAddress}</div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={setTarget} className="h-[1rem]" />
      {(isDebounceFetching || isFetching) && <div>로딩중...</div>}
    </div>
  );
}
