import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface Ilocal {
  title: string;
  link: string;
  roadAddress: string;
  description: string;
  total: number;
}

interface IGetlocalListResult {
  items: Ilocal[];
}

const getSearchRestaurant = async (searchKeyword: string, food: any) =>
  axios.get<IGetlocalListResult>('/v1/search/local.json', {
    params: {
      query: `${searchKeyword} ${food}맛집 안심식당`,
      display: 5,
    },
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Naver-Client-Id': 'DS9Rk5eeFu3hi4cYgc6G',
      'X-Naver-Client-Secret': '0VNIsyrJNt',
    },
  });

const useSearchRestaurant = (searchKeyword: string, food: string) => {
  return useQuery({
    queryKey: ['searchRestaurant', searchKeyword, food],
    queryFn: () => getSearchRestaurant(searchKeyword, food),
    enabled: !!searchKeyword && !!food,
  });
};

export default useSearchRestaurant;
