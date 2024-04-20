import useSearchFoodList from '@/app/food-entry/api/queries/useSearchFoodList';
import { useIntersectionObserver } from '@/app/food-entry/hooks/useIntersectionObserver';
import { useSearchFoodListContext } from '@/app/food-entry/context/search-food-list-context';
import FoodItem from '@/app/food-entry/components/food-item';

const FoodList = () => {
  const { getValue } = useSearchFoodListContext();
  const keyword = getValue().keyword;
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useSearchFoodList(keyword);
  const { setTarget, isFetching: isDebounceFetching } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });
  const foodListData = data?.pages.map((page) => page.data).flat();
  return (
    <>
      <div className="flex flex-col gap-4">
        {foodListData?.map((food) => {
          return (
            <FoodItem
              key={food.id}
              id={food.id}
              name={food.name}
              energy={food.energy}
              fat={food.fat}
              moisture={food.moisture}
              protein={food.protein}
            />
          );
        })}
      </div>
      <div ref={setTarget} className="h-[1rem]" />
      {(isDebounceFetching || isFetching) && <div>로딩중...</div>}
    </>
  );
};

export default FoodList;
