import useGetUserNutriDetailHistory, {
  DateRangeType,
} from '@/app/detail-nutri-info/api/queries/useGetUserNutriDetailHistory';

const useUserFoodHistory = (dateRange: DateRangeType) => {
  const { data, isLoading } = useGetUserNutriDetailHistory(dateRange);

  return {
    data: data?.data?.historiesDtoList ?? [],
    isUserFoodHistory: isLoading,
  };
};

export default useUserFoodHistory;
