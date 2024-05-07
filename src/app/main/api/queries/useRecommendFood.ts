import { fetcher } from '@/commons/apis/fetcher';
import { useQuery } from '@tanstack/react-query';

interface ResponseRecommendFood {
  success: boolean;
  data: {
    foodlist: {
      categoryCode: number;
      name: string;
      category: string;
      moisture: number;
      carbohydrate: number;
      protein: number;
      fat: number;
      kcal: number;
    }[];
  };
}
const recommendFood = () => {
  return fetcher.get<ResponseRecommendFood>('api/v1/food/recommend/ai');
};

const useRecommendFood = () => {
  return useQuery({
    queryKey: ['recommendFood'],
    queryFn: recommendFood,
    select: (data) => data.data.foodlist,
  });
};
export default useRecommendFood;
