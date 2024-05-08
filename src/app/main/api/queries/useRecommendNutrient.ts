import { fetcher } from '@/commons/apis/fetcher';
import { useQuery } from '@tanstack/react-query';

interface ResponseRecommendNutrient {
  data: {
    deficientNutrient: {
      carbohydrate: number;
      protein: number;
      fat: number;
    };
    foodList: {
      foodId: number;
      foodName: string;
    }[];
  };
  error: any;
}
const recommendNutrient = () => {
  return fetcher.get<ResponseRecommendNutrient>('api/v1/food/recommend/nutrient');
};

const useRecommendNutrient = () => {
  return useQuery({
    queryKey: ['recommendNutrient'],
    queryFn: recommendNutrient,
    select: (data) => data.data,
  });
};

export default useRecommendNutrient;
