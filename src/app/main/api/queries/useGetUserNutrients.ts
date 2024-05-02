import { fetcher } from '@/commons/apis/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface NutrientData {
  calcium: number;
  carbohydrate: number;
  dietaryFiber: number;
  energy: number;
  fat: number;
  foodName: string;
  iron: number;
  phosphorus: number;
  protein: number;
  selenium: number;
  sodium: number;
  vitaminA: number;
  vitaminB1: number;
  vitaminB2: number;
  vitaminC: number;
}

interface essentialNutritionDto {}
interface FoodsNutrientData {
  date: string;
  foods: NutrientData[] | [];
  total: NutrientData;
}

interface ResponseUserNutrients {
  data: {
    essentialNutritionDto: NutrientData;
    historiesDto: FoodsNutrientData;
  };
  error: any;
}
const getUserNutrients = (today: string) => {
  return fetcher.get<ResponseUserNutrients>(`api/v1/history/${today}`);
};

const useGetUserNutrients = (today: string) =>
  useQuery({
    queryKey: ['getUserNutrients', { today }],
    queryFn: () => getUserNutrients(today),
  });

export default useGetUserNutrients;
