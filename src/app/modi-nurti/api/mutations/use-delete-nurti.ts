import { fetcher } from '@/commons/apis/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExtendedNutrientData } from '@/app/detail-nutri-info/api/queries/useGetUserNutriDetailHistory';
import { useQuery } from '@tanstack/react-query';

// Fetch History Item Hook
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

// Delete Nurti Hook
export interface DeleteNurtiRequest {
  historyId: number;
}

interface DeleteNurtiResponse {
  data: boolean;
  error: any;
}

const deleteNurti = async (body: DeleteNurtiRequest): Promise<DeleteNurtiResponse> => {
  return fetcher.delete<DeleteNurtiResponse>(`api/v1/history/${body.historyId}`);
};

const useDeleteNurti = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteNurtiResponse, any, DeleteNurtiRequest>({
    mutationFn: deleteNurti,
    onSuccess: () => {
      // 성공적으로 삭제된 후 쿼리를 무효화하여 데이터를 다시 가져오도록 설정
      queryClient.invalidateQueries({
        queryKey: ['getUserNutriDetailHistory'],
      });
    },
  });
};

export default useDeleteNurti;
