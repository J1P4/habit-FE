'use client';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent } from '@/commons/components/ui/carousel';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CreateUserNickname from '@/app/create-user-info/components/steps/create-user-nickname';
import { Steps } from '@/app/create-user-info/types/steps';
import SelectUserGender from '@/app/create-user-info/components/steps/select-user-gender';
import CarouselContainer from '@/app/create-user-info/components/CarouselContainer';

interface CarouselDispatch {
  setCarouselIndexPrev: () => void;
  setCarouselIndexNext: () => void;
}

export const CarouselDispatchContext = createContext<CarouselDispatch | undefined>(undefined);

const STEPS = [
  <CreateUserNickname key={Steps.CREATE_USER_NICKNAME} />,
  <SelectUserGender key={Steps.SELECT_USER_GENDER} />,
] as const;

export default function StepContainer() {
  const [api, setApi] = useState<CarouselApi>();
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setCarouselIndexPrev = useCallback(() => {
    if (api?.selectedScrollSnap() === 1) {
      return;
    }
    api?.scrollPrev();
  }, [api]);

  const setCarouselIndexNext = useCallback(() => {
    api?.scrollNext();
    console.log(api?.scrollSnapList());
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
      if (step === 1) {
        api.scrollTo(1, true);
        return;
      }
      push(pathname + `?step=${api.selectedScrollSnap()}`);
    }
  }, [api?.selectedScrollSnap, push, pathname, searchParams, api]);

  return (
    <CarouselDispatchContext.Provider value={memoizedCarouselDispatch}>
      <Carousel
        setApi={setApi}
        opts={{
          watchDrag: false,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="m-0 p-0 h-dvh w-full">
          {STEPS.map((step, idx) => (
            <CarouselContainer key={idx}>{step}</CarouselContainer>
          ))}
        </CarouselContent>
        {/*<CarouselPrevious />*/}
        {/*<CarouselNext />*/}
      </Carousel>
    </CarouselDispatchContext.Provider>
  );
}
