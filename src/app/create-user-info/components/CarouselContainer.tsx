import { PropsWithChildren } from 'react';
import { CarouselItem } from '@/commons/components/ui/carousel';

export default function CarouselContainer({ children }: PropsWithChildren) {
  return (
    <CarouselItem className="relative m-0 flex  w-full flex-col items-center pl-0 pr-0 pt-0">
      {children}
    </CarouselItem>
  );
}
