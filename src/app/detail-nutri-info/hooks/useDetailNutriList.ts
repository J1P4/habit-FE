import useGetUserNutriDetailHistory, {
  DateRangeType,
} from '@/app/detail-nutri-info/api/queries/useGetUserNutriDetailHistory';

const useDetailNutriList = (dataRange: DateRangeType) => {
  const { data, isLoading } = useGetUserNutriDetailHistory(dataRange);
  const { time, foodName, ...rest } = data?.data?.allTotal ?? {};

  const defaultNutrition = {
    calcium: 0,
    carbohydrate: 0,
    dietaryFiber: 0,
    energy: 0,
    fat: 0,
    iron: 0,
    phosphorus: 0,
    protein: 0,
    selenium: 0,
    sodium: 0,
    vitaminA: 0,
    vitaminB1: 0,
    vitaminB2: 0,
    vitaminC: 0,
    moisture: 0,
  };

  const parsingData = {
    essentialNutrition: { ...defaultNutrition, ...data?.data?.essentialNutritionDto },
    totalData: { ...defaultNutrition, ...rest },
  };

  return {
    data: parsingData,
    isGetUserNutriDetailHistoryLoading: isLoading,
  };
};

export default useDetailNutriList;
