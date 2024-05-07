import { fetcher } from '@/commons/apis/fetcher';
import { useInfiniteQuery } from '@tanstack/react-query';

interface SearchParams {
  dong: string;
  pageIndex: number;
  pageSize: number;
}

interface ResponseRestaurantListData {
  data: {
    name: string; //식당이름
    foodType: string; //음식 종류
    mainFood: string; //메인 음식, 없을 수도 있음
    roadNameAddress: string; //도로명주소
    locationAddress: string; //지번 주소
    dong: string; // 동
    designatedDate: string; // 모범식당 승인 날짜
  }[];
  error: any;
}

const searchRestaurant = (params: SearchParams) => {
  const { dong, pageIndex, pageSize } = params;
  return fetcher.get<ResponseRestaurantListData>('api/v1/restaurant', {
    searchParams: {
      dong,
      pageIndex,
      pageSize,
    },
  });
};

const useSearchInfiniteRestaurantList = (dong: string) =>
  useInfiniteQuery({
    queryKey: ['searchRestaurantList', { dong }],
    queryFn: ({ pageParam = 1 }) => searchRestaurant({ dong, pageIndex: pageParam, pageSize: 10 }),
    // @ts-ignore
    getNextPageParam: (lastPage, allPages) => {
      const mergedData = allPages.flatMap((item) => item.data);
      if (lastPage.data.length < 10) {
        return undefined;
      }
      // TODO pageSize를 변경할 수 있도록 수정
      return mergedData.length + 10;
    },
    initialPageParam: 1,
  });

export default useSearchInfiniteRestaurantList;
