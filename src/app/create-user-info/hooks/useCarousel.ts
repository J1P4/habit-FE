import { useContext } from 'react';
import { CarouselDispatchContext } from '@/app/create-user-info/components/steps/step-container';

export function useCarousel() {
  const context = useContext(CarouselDispatchContext);
  if (!context) {
    throw new Error('[CarouselDispatchContextProvider] 를 감싸서 사용하세요.');
  }
  return context;
}
