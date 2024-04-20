import { FoodItemData } from '@/app/food-entry/api/queries/useSearchFoodList';
import { useFoodDrawerContext } from '@/app/food-entry/context/food-drawer-context';

// TODO FoodItem Props로 전달이 아닌 Query 값으로 가져올 수는 없을지 고민
const FoodItem = ({ id, name, energy, protein, moisture, fat }: FoodItemData) => {
  const { onOpenChange } = useFoodDrawerContext();
  const onClickFoodItem = () => {
    onOpenChange(true);
  };
  return (
    <div key={id} className="flex items-center gap-4" onClick={onClickFoodItem}>
      <div className="flex flex-col">
        <h3 className="text-[16px] font-bold">{name}</h3>
        <p className="text-[12px] text-gray-400">{energy}</p>
      </div>
    </div>
  );
};

export default FoodItem;
