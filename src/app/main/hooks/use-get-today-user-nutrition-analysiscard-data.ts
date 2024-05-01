import { getformatKRDate } from '@/commons/lib/getKRTime';
import useGetUserNutrients from '@/app/main/api/queries/useGetUserNutrients';
import { NutrientData } from '@/app/main/api/queries/useGetUserNutrients'; // NutrientData 타입 import

// 오늘 날짜의 사용자 영양분 섭취 분석 데이터를 가져오는 Hook
const useGetTodayUserNutritionAnalysiscardData = () => {
  const today = getformatKRDate(); // 오늘 날짜를 가져옴
  const { data, isLoading } = useGetUserNutrients(today); // 오늘날짜를 사용하여 영양분 데이터 및 로딩 상태를 가져옴
  const essentialNutrition = data?.data?.essentialNutritionDto as NutrientData | undefined; // TypeScript 타입 단언을 사용하여 essentialNutrition을 NutrientData 타입으로 선언
  const totalData = data?.data?.historiesDto.total as NutrientData | undefined; // TypeScript 타입 단언을 사용하여 totalData를 NutrientData 타입으로 선언
  console.log('totalData', totalData);
  // 영양분 요약 데이터 구성
  const summary = {
    essentialCarbohydrate: Math.round(essentialNutrition?.carbohydrate ?? 0), // 필수 탄수화물
    essentialProtein: Math.round(essentialNutrition?.protein ?? 0), // 필수 단백질
    essentialFat: Math.round(essentialNutrition?.fat ?? 0), // 필수 지방
    carbohydrate: Math.round(totalData?.carbohydrate ?? 0), // 탄수화물
    protein: Math.round(totalData?.protein ?? 0), // 단백질
    fat: Math.round(totalData?.fat ?? 0), // 지방
  };

  // 요약 데이터 및 로딩 상태 반환
  return {
    summary,
    isSummaryLoading: isLoading,
  };
};

export default useGetTodayUserNutritionAnalysiscardData;
