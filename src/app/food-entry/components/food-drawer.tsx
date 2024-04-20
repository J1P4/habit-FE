import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
} from '@/commons/components/ui/drawer';
import { useFoodDrawerContext } from '@/app/food-entry/context/food-drawer-context';
import { Button } from '@/commons/components/ui/button';
import useAddFoodEntry from '@/app/food-entry/api/mutations/useAddFoodEntry';

const FoodDrawer = () => {
  const { isOpen, onOpenChange, drawerData } = useFoodDrawerContext();
  const { mutateAsync } = useAddFoodEntry();
  const onAddFood = async () => {
    //TODO drawerData가 없을 경우 예외처리 로직 고민
    if (!drawerData?.id) return;
    // TODO featcher 함수에서 에러 처리 로직 정의
    await mutateAsync({ foodId: drawerData.id });
    onOpenChange(false);
  };
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      // TODO UI 수정
      <DrawerContent className="h-1/2">
        <DrawerDescription>{drawerData?.name}을 추가하시겠어요?</DrawerDescription>
        <DrawerFooter>
          <Button className="w-full h-[60px]" onClick={onAddFood}>
            추가하기
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FoodDrawer;
