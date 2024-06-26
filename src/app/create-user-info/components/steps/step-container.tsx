'use client';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent } from '@/commons/components/ui/carousel';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CreateUserNickname from '@/app/create-user-info/components/steps/create-user-nickname';
import { Steps } from '@/app/create-user-info/types/steps';
import SelectUserGenderAgeRange from '@/app/create-user-info/components/steps/select-user-gender-age-range';
import CarouselContainer from '@/app/create-user-info/components/CarouselContainer';
import SetWeightHeight from '@/app/create-user-info/components/steps/set-weight-height';
import StepHeader from '@/app/create-user-info/components/step-header';

interface CarouselDispatch {
  setCarouselIndexPrev: () => void;
  setCarouselIndexNext: () => void;
}

export const CarouselDispatchContext = createContext<CarouselDispatch | undefined>(undefined);

const STEPS = [
  <CreateUserNickname key={Steps.CREATE_USER_NICKNAME} />,
  <SetWeightHeight key={Steps.SET_WEIGHT_HEIGHT} />,
  <SelectUserGenderAgeRange key={Steps.SELECT_USER_GENDER_AGE_RANGE} />,
] as const;

export default function StepContainer() {
  const [api, setApi] = useState<CarouselApi>();
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setCarouselIndexPrev = useCallback(() => {
    if (api?.selectedScrollSnap() === 0) {
      push('/');
      return;
    }
    api?.scrollPrev();
  }, [push, api]);

  const setCarouselIndexNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const memoizedCarouselDispatch = useMemo(
    () => ({
      setCarouselIndexPrev,
      setCarouselIndexNext,
    }),
    [setCarouselIndexPrev, setCarouselIndexNext],
  );

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      push(pathname + `?step=${api.selectedScrollSnap()}`);
    });

    const step = searchParams.get('step') ? Number(searchParams.get('step')) : 0;

    if (step > api.selectedScrollSnap()) {
      // 앞선 과정을 뛰어넘는 것을 방지(ex. 새로고침)
      if (step === 0) {
        api.scrollTo(0, true);
        return;
      }
      push(pathname + `?step=${api.selectedScrollSnap()}`);
    }
    // 브라우저 뒤로가기 처리
    if (step < api.selectedScrollSnap()) {
      api.scrollTo(step, true);
    }
  }, [api?.selectedScrollSnap, push, pathname, searchParams, api]);

  return (
    <CarouselDispatchContext.Provider value={memoizedCarouselDispatch}>
      <StepHeader />
      <Carousel
        setApi={setApi}
        opts={{
          watchDrag: false,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="m-0 p-0 h-[calc(100vh-50px)] w-full">
          {STEPS.map((step, idx) => (
            <CarouselContainer key={idx}>{step}</CarouselContainer>
          ))}
        </CarouselContent>
      </Carousel>
    </CarouselDispatchContext.Provider>
  );
}
