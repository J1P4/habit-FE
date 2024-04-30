import { fetcher } from '@/commons/apis/fetcher';
import { useMutation } from '@tanstack/react-query';

interface AddFoodEntryRequest {
  foodId: number;
}

interface AddFoodEntryResponse {
  data: boolean;
  error: any;
}
const addFoodEntry = (body: any) => {
  return fetcher.post('api/v1/food', {
    json: body,
  });
};

const useAddFoodEntry = () =>
  useMutation({
    mutationFn: (body: AddFoodEntryRequest) => addFoodEntry(body),
  });

export default useAddFoodEntry;
