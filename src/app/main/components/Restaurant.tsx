//Restaurant.tsx

import React, { useState, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/commons/components/ui/carousel';
import useSearchRestaurant from '@/app/main/api/queries/useSearchRestaurant';

interface RestaurantComponentProps {
  food: string;
  searchKeyword: string;
  isLoading: boolean;
}

const RestaurantComponent: React.FC<RestaurantComponentProps> = ({
  food,
  searchKeyword,
  isLoading,
}) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const { data: localResponse, isLoading: isSearchRestaurantLoading } = useSearchRestaurant(
    searchKeyword,
    food,
  );

  if (isLoading || isSearchRestaurantLoading)
    return <p>위치를 기반하여 식당 정보를 가져오고 있습니다!</p>;

  return (
    <>
      {localResponse && localResponse.data?.items.length > 0 ? (
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="mx-0">
            {localResponse?.data.items.map((local, index) => (
              <CarouselItem
                key={index}
                className="mx-5 h-full border  border-[#EBEBEB] rounded-lg w-full  m-0 px-4 py-4"
              >
                <div key={index} className="flex flex-col items-center">
                  {local.total && <div>{local.total}</div>}
                  <h3 className="leading-extra-loose text-base font-semibold">
                    {local.title.replace(/&amp;/g, '&')}
                  </h3>
                  <p className="leading-extra-loose text-xs font-semibold text-gray-600">
                    {local.roadAddress}
                  </p>
                  <p className="leading-extra-loose text-xs text-gray-600">{local.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <p className="text-[16px] font-bold whitespace-pre-line mt-4 flex justify-between w-full px-4 cursor-pointer bg-red-50 py-4 rounded-lg text-red-600">
          주변에 추천 식당 데이터가 없습니다.
        </p>
      )}
    </>
  );
};

export default RestaurantComponent;
