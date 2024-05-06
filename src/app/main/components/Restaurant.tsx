//Restaurant.tsx

import React, { useState, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/commons/components/ui/carousel';
import useCurrentPosition from '@/app/main/api/queries/useCurrentPosition';
import useGoogleApiInfo from '@/app/main/api/queries/useGoogleApiInfo';
import extractSearchKeyword from '@/app/main/uitls/extractSearchKeyword';
import useSearchRestaurant from '@/app/main/api/queries/useSearchRestaurant';

interface RestaurantComponentProps {
  food: string;
}

const RestaurantComponent: React.FC<RestaurantComponentProps> = ({ food }) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const { data: currentPosition, isLoading: isCurrentPositionLoading } = useCurrentPosition();
  const latitude = currentPosition?.coords?.latitude as string;
  const longitude = currentPosition?.coords?.longitude as string;

  const { data: googleApiInfo, isLoading: isGoogleApiLoading } = useGoogleApiInfo(
    latitude,
    longitude,
  );

  const address = googleApiInfo?.data.results[0].formatted_address;

  const searchKeyword = extractSearchKeyword(address);
  const { data: localResponse, isLoading: isSearchRestaurantLoading } = useSearchRestaurant(
    searchKeyword,
    food,
  );

  console.log('localResponse', localResponse);

  if (isGoogleApiLoading || isCurrentPositionLoading || isSearchRestaurantLoading)
    return <p>위치를 기반하여 식당 정보를 가져오고 있습니다!</p>;

  return (
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
  );
};

export default RestaurantComponent;
