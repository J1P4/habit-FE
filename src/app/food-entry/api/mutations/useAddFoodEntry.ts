import { fetcher } from '@/commons/apis/fetcher';
import { useMutation } from '@tanstack/react-query';

const Time = {
  BREAKFAST: 'BREAKFAST',
  LUNCH: 'LUNCH',
  DINNER: 'DINNER',
} as const;

export type TimeType = (typeof Time)[keyof typeof Time];

interface AddFoodEntryRequest {
  foodId: number;
  time: TimeType;
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
