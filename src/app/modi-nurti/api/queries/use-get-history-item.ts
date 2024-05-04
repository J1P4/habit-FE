import { fetcher } from '@/commons/apis/fetcher';
import { ExtendedNutrientData } from '@/app/detail-nutri-info/api/queries/useGetUserNutriDetailHistory';
import { useQuery } from '@tanstack/react-query';

interface ResponseUserNurtiDetailHistory {
  data: ExtendedNutrientData;
  error: any;
}
const getHistoryItem = (historyId: number) => {
  return fetcher.get<ResponseUserNurtiDetailHistory>(`api/v1/history/specific/${historyId}`);
};

const useGetHistoryItem = (historyId: number) =>
  useQuery({
    queryKey: ['historyItem', historyId],
    queryFn: () => getHistoryItem(historyId),
    enabled: historyId !== 0,
  });

export default useGetHistoryItem;
