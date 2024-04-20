import useSearchFoodList from '@/app/food-entry/api/queries/useSearchFoodList';
import { useIntersectionObserver } from '@/app/food-entry/hooks/useIntersectionObserver';
import { useSearchFoodListContext } from '@/app/food-entry/context/search-food-list-context';

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
            <div key={food.id} className="flex items-center gap-4">
              <div className="flex flex-col">
                {/*ResponseFoodListData Type 참조하여 FoodItem Component를 만들어 UI 수정*/}
                <h3 className="text-[16px] font-bold">{food.name}</h3>
                <p className="text-[12px] text-gray-400">{food.energy}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={setTarget} className="h-[1rem]" />
      {(isDebounceFetching || isFetching) && <div>로딩중...</div>}
    </>
  );
};

export default FoodList;
