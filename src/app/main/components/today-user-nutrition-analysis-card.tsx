import { Button } from '@/commons/components/ui/button';
import { useRouter } from 'next/navigation';

export interface summaryNutrients {
  carbohydrate: number;
  protein: number;
  fat: number;
  essentialCarbohydrate: number;
  essentialProtein: number;
  essentialFat: number;
}
interface TodayUserNutritionAnalysisCardProps {
  summaryNutrients: summaryNutrients;
}
const TodayUserNutritionAnalysisCard = ({
  summaryNutrients,
}: TodayUserNutritionAnalysisCardProps) => {
  const { carbohydrate, protein, fat, essentialCarbohydrate, essentialProtein, essentialFat } =
    summaryNutrients;

  const { push } = useRouter();
  const gotoDetailPage = () => {
    push('/detail-nutri-info');
  };
  return (
    <div className="w-full flex flex-col bg-[#F4F9F3] rounded-[30px] py-4 px-5 items-center">
      <div className="flex gap-4 justify-center mt-2">
        <div className="bg-white px-3 py-2 rounded-[10px] flex flex-col items-center gap-3 w-full min-w-[95px] h-[80px]">
          <div className="text-[#FF9385] font-bold ">탄수화물</div>
          <div className="text-[12px] text-center font-bold">
            {carbohydrate} / {essentialCarbohydrate}g
          </div>
        </div>
        <div className="bg-white px-3 py-2 rounded-[10px] flex flex-col items-center gap-3 w-full min-w-[95px]">
          <div className="text-[#FF9385] font-bold ">단백질</div>
          <div className="text-[12px] text-center font-bold">
            {protein} / {essentialProtein}g
          </div>
        </div>
        <div className="bg-white px-3 py-2 rounded-[10px] flex flex-col items-center gap-3 w-full min-w-[95px]">
          <div className="text-[#FF9385] font-bold ">지방</div>
          <div className="text-[12px] text-center font-bold">
            {fat} / {essentialFat}g
          </div>
        </div>
      </div>
      <div className="mt-8" />
      <Button className=" w-[200px] bg-[#FF9385] rounded-[10px]" onClick={gotoDetailPage}>
        자세히 보기
      </Button>
    </div>
  );
};

export default TodayUserNutritionAnalysisCard;
