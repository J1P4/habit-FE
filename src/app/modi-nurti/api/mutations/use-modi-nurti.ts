import { fetcher } from '@/commons/apis/fetcher';
import { useMutation } from '@tanstack/react-query';

export interface ModiNurtiRequest {
  historyId: number;
  energy: number;
  moisture: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  dietaryFiber: number;
  calcium: number;
  iron: number;
  phosphorus: number;
  selenium: number;
  sodium: number;
  vitaminA: number;
  vitaminB1: number;
  vitaminB2: number;
  vitaminC: number;
}

interface ModiNurtiResponse {
  success: boolean;
  data: boolean;
  error: any;
}
const modiNurti = (body: ModiNurtiRequest) => {
  return fetcher.patch<ModiNurtiResponse>('api/v1/history', {
    json: body,
  });
};

const useModiNurti = () =>
  useMutation({
    mutationFn: (body: ModiNurtiRequest) => modiNurti(body),
  });

export default useModiNurti;
