import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
} from '@/commons/components/ui/drawer';
import { useFoodDrawerContext } from '@/app/food-entry/context/food-drawer-context';
import { Button } from '@/commons/components/ui/button';
import useAddFoodEntry, { TimeType } from '@/app/food-entry/api/mutations/useAddFoodEntry';
import { useToast } from '@/commons/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/commons/components/ui/select';
import { useMemo, useState } from 'react';

const FoodDrawer = () => {
  const { isOpen, onOpenChange, drawerData } = useFoodDrawerContext();
  const { mutateAsync } = useAddFoodEntry();
  const [time, setTime] = useState<TimeType | null>(null);
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    // 드로어가 닫히는 경우(time 상태를 null로 초기화)
    if (!open) {
      setTime(null);
    }
    onOpenChange(open);
  };
  const onAddFood = async () => {
    //TODO drawerData가 없을 경우 예외처리 로직 고민
    if (!drawerData?.id || !time) return;
    // TODO featcher 함수에서 에러 처리 로직 정의
    await mutateAsync({ foodId: drawerData.id, time });
    onOpenChange(false);
    toast({
      title: '음식이 추가되었어요!',
    });
  };

  const onSelectTime = (value: string) => {
    setTime(value as TimeType);
  };

  const isDisabled = useMemo(() => time === null, [time]);

  const onCancel = () => {
    onOpenChange(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      {/*// TODO UI 수정*/}
      <DrawerContent className="h-1/3 ">
        <DrawerDescription className="h-full flex items-center justify-center flex-col">
          <div className="px-4 text-lg">
            <span className="font-bold text-violet-500">{drawerData?.name}</span>을 추가하시겠어요?
          </div>
          <div className="mt-5" />
          <div className="w-full px-4">
            <Select onValueChange={onSelectTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="언제 드셨는지 알려주세요!" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>시간대</SelectLabel>
                  <SelectItem value="BREAKFAST">아침</SelectItem>
                  <SelectItem value="LUNCH">점심</SelectItem>
                  <SelectItem value="DINNER">저녁</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </DrawerDescription>
        <DrawerFooter>
          <div className="flex gap-2">
            <Button className="w-1/2 " onClick={onAddFood} disabled={isDisabled}>
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
