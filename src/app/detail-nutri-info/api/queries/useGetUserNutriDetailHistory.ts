import { fetcher } from '@/commons/apis/fetcher';
import { skipToken, useQuery } from '@tanstack/react-query';

const DateRange = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
} as const;

export type DateRangeType = (typeof DateRange)[keyof typeof DateRange];

interface TimeData {
  time: string;
}
export interface NutrientData {
  /** 칼슘 (Calcium) */
  calcium: number;
  /** 탄수화물 (Carbohydrate) */
  carbohydrate: number;
  /** 식이섬유 (Dietary Fiber) */
  dietaryFiber: number;
  /** 에너지 (Energy) */
  energy: number;
  /** 지방 (Fat) */
  fat: number;
  /** 철분 (Iron) */
  iron: number;
  /** 인 (Phosphorus) */
  phosphorus: number;
  /** 단백질 (Protein) */
  protein: number;
  /** 셀레늄 (Selenium) */
  selenium: number;
  /** 나트륨 (Sodium) */
  sodium: number;
  /** 비타민 A (Vitamin A) */
  vitaminA: number;
  /** 비타민 B1(티아민) (Vitamin B1(Thiamine)) */
  vitaminB1: number;
  /** 비타민 B2(리보플라빈) (Vitamin B2 (Riboflavin)) */
  vitaminB2: number;
  /** 비타민 C (Vitamin C) */
  vitaminC: number;
  /** 수분 (Moisture) */
  moisture: number;
}

export interface ExtendedNutrientData extends NutrientData, TimeData {
  foodName: string;
  historyId: number;
}

interface FoodsNutrientData {
  date: string;
  foods: ExtendedNutrientData[] | [];
  total: ExtendedNutrientData;
}

interface ResponseUserNurtiDetailHistory {
  data: {
    allTotal: ExtendedNutrientData;
    essentialNutritionDto: NutrientData;
    historiesDtoList: FoodsNutrientData[];
  };
  error: any;
}
const getUserNutriDetailHistory = (dateRange: DateRangeType) => {
  return fetcher.get<ResponseUserNurtiDetailHistory>(`api/v1/history?dateRange=${dateRange}`);
};

const useGetUserNutriDetailHistory = (dateRange: DateRangeType) =>
  useQuery({
    queryKey: ['getUserNutriDetailHistory', { dateRange }],
    queryFn: dateRange ? () => getUserNutriDetailHistory(dateRange) : skipToken,
  });

export default useGetUserNutriDetailHistory;
