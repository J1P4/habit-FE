import { useEffect, useState } from 'react';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

interface IuseIntersectionObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: IuseIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);
  const [isFetching, setIsFetching] = useState(false); // 디바운스 실행 중 여부를 나타내는 상태 값

  useEffect(() => {
    if (!target || !hasNextPage) return;

    const debounceFetchNextPage = debounce(() => {
      setIsFetching(true); // 디바운스 함수 실행 시 스피너 노출
      if (target && hasNextPage) {
        fetchNextPage().then(() => {
          setIsFetching(false); // 데이터 요청 완료 후 스피너 숨김
        });
      }
    }, 200); // 디바운스 시간 설정 (여기서는 200ms로 설정)

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          debounceFetchNextPage(); // 디바운스된 함수 호출
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [target, threshold, hasNextPage, fetchNextPage]);

  return { setTarget, isFetching }; // isFetching 상태 값 반환
};

function debounce(func: () => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return function debouncedFunction(this: any, ...args: any[]) {
    const later = () => {
      // @ts-ignore
      func.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
