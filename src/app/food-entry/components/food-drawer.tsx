import { Drawer, DrawerContent, DrawerDescription } from '@/commons/components/ui/drawer';
import { useFoodDrawerContext } from '@/app/food-entry/context/food-drawer-context';

const FoodDrawer = () => {
  const { isOpen, onOpenChange, drawerData } = useFoodDrawerContext();
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerDescription>{drawerData?.name}을 추가하시겠어요?</DrawerDescription>
      </DrawerContent>
    </Drawer>
  );
};

export default FoodDrawer;
