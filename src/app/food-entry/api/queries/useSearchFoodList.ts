import { fetcher } from '@/commons/apis/fetcher';
import { useInfiniteQuery } from '@tanstack/react-query';

interface SearchParams {
  keyword: string;
  pageIndex: number;
  pageSize: number;
}

// TODO API Response Type 정의
interface ResponseFoodListData {
  data: {
    id: number;
    name: string;
    energy: number;
    fat: number;
    moisture: number;
    protein: number;
  }[];
  error: any;
}
const searchFoodList = (params: SearchParams) => {
  const { keyword, pageIndex, pageSize } = params;
  return fetcher.get<ResponseFoodListData>('api/v1/food', {
    searchParams: {
      keyword,
      pageIndex,
      pageSize,
    },
  });
};

const useSearchInfiniteFoodList = (keyword: string) =>
  useInfiniteQuery({
    queryKey: ['searchFoodList', { keyword }],
    queryFn: ({ pageParam = 1 }) => searchFoodList({ keyword, pageIndex: pageParam, pageSize: 10 }),
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

export default useSearchInfiniteFoodList;
