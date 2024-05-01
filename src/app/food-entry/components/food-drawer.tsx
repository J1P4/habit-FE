import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
} from '@/commons/components/ui/drawer';
import { useFoodDrawerContext } from '@/app/food-entry/context/food-drawer-context';
import { Button } from '@/commons/components/ui/button';
import useAddFoodEntry from '@/app/food-entry/api/mutations/useAddFoodEntry';
import { useToast } from '@/commons/components/ui/use-toast';

const FoodDrawer = () => {
  const { isOpen, onOpenChange, drawerData } = useFoodDrawerContext();
  const { mutateAsync } = useAddFoodEntry();
  const { toast } = useToast();
  const onAddFood = async () => {
    //TODO drawerData가 없을 경우 예외처리 로직 고민
    if (!drawerData?.id) return;
    // TODO featcher 함수에서 에러 처리 로직 정의
    await mutateAsync({ foodId: drawerData.id });
    onOpenChange(false);
    toast({
      title: '음식이 추가되었어요!',
    });
  };

  const onCancel = () => {
    onOpenChange(false);
  };
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      {/*// TODO UI 수정*/}
      <DrawerContent className="h-1/3 ">
        <DrawerDescription className="h-full flex items-center justify-center">
          <div className="px-4 text-lg">
            <span className="font-bold text-violet-500">{drawerData?.name}</span>을 추가하시겠어요?
          </div>
        </DrawerDescription>
        <DrawerFooter>
          <div className="flex gap-2">
            <Button className="w-1/2 " onClick={onAddFood}>
              추가하기
            </Button>
            <Button className="w-1/2" variant="destructive" onClick={onCancel}>
              취소
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FoodDrawer;
