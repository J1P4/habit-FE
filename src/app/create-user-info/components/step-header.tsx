'use client';
import { Header } from '@/commons/components/header/header';
import { useCarousel } from '@/app/create-user-info/hooks/useCarousel';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function StepHeader() {
  const { setCarouselIndexPrev } = useCarousel();
  const step = Number(useSearchParams().get('step'));
  return (
    <>
      {step !== null && step >= 0 && step <= 2 && (
        <>
          <Header
            leftSideButton={
              <button className="flex h-full w-[16px] items-center " onClick={setCarouselIndexPrev}>
                <ArrowLeft />
              </button>
            }
          />
        </>
      )}
    </>
  );
}
