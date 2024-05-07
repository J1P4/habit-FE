import { NutrientData } from '@/app/detail-nutri-info/api/queries/useGetUserNutriDetailHistory';

interface NutrientNameMapping {
  [key: string]: string; // 인덱스 서명 추가
  calcium: '칼슘';
  carbohydrate: '탄수화물';
  dietaryFiber: '식이섬유';
  energy: '에너지';
  fat: '지방';
  iron: '철분';
  phosphorus: '인';
  protein: '단백질';
  selenium: '셀레늄';
  sodium: '나트륨';
  vitaminA: '비타민 A';
  vitaminB1: '비타민 B1';
  vitaminB2: '비타민 B2';
  vitaminC: '비타민 C';
  moisture: '수분';
}
export const nutrientNameMapping: NutrientNameMapping = {
  calcium: '칼슘',
  carbohydrate: '탄수화물',
  dietaryFiber: '식이섬유',
  energy: '에너지',
  fat: '지방',
  iron: '철분',
  phosphorus: '인',
  protein: '단백질',
  selenium: '셀레늄',
  sodium: '나트륨',
  vitaminA: '비타민 A',
  vitaminB1: '비타민 B1',
  vitaminB2: '비타민 B2',
  vitaminC: '비타민 C',
  moisture: '수분',
};
