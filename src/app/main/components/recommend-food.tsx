import React, { useState, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/commons/components/ui/carousel';
import useRecommendNutrient from '@/app/main/api/queries/useRecommendNutrient';

const RecommendFood = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const { data, isLoading } = useRecommendNutrient();

  if (isLoading) return <></>;
  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="mx-0">
        {data?.foodList.map((food, index) => {
          return (
            <CarouselItem
              key={food.foodId}
              className="mx-5 h-full border  border-[#EBEBEB] rounded-lg w-full  m-0 px-4 py-4"
            >
              <div key={index} className="flex flex-col items-center">
                <h3 className="leading-extra-loose text-base font-semibold">{food.foodName}</h3>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default RecommendFood;
