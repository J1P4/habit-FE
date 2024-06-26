import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
} from '@/commons/components/ui/drawer';

import { Button } from '@/commons/components/ui/button';
import useGetHistoryItem from '@/app/modi-nurti/api/queries/use-get-history-item';
import { Input } from '@/commons/components/ui/input';
import { Label } from '@/commons/components/ui/label';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/commons/components/ui/form';
import { useEffect } from 'react';
import useModiNurti, { ModiNurtiRequest } from '@/app/modi-nurti/api/mutations/use-modi-nurti';
import { useToast } from '@/commons/components/ui/use-toast';
import useDeleteNurti, {
  DeleteNurtiRequest,
} from '@/app/modi-nurti/api/mutations/use-delete-nurti';

const ModiDrawer = ({
  isOpen,
  onOpenChange,
  nurtiId = 0,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  nurtiId: number;
}) => {
  const { data, isLoading } = useGetHistoryItem(nurtiId);
  const { toast } = useToast();
  const form = useForm<ModiNurtiRequest>({});
  useEffect(() => {
    form.reset({
      energy: data?.data.energy,
      carbohydrate: data?.data.carbohydrate,
      protein: data?.data.protein,
      fat: data?.data.fat,
      vitaminC: data?.data.vitaminC,
      vitaminA: data?.data.vitaminA,
      vitaminB1: data?.data.vitaminB1,
      vitaminB2: data?.data.vitaminB2,
      calcium: data?.data.calcium,
      dietaryFiber: data?.data.dietaryFiber,
      iron: data?.data.iron,
      phosphorus: data?.data.phosphorus,
      selenium: data?.data.selenium,
      sodium: data?.data.sodium,
      moisture: data?.data.moisture,
    });
  }, [data, form]);

  const { mutateAsync: modiMutateAsync } = useModiNurti();
  const { mutateAsync: deleteMutateAsync } = useDeleteNurti();
  const onSubmit = async (values: ModiNurtiRequest) => {
    if (!data) return;
    const { foodName, ...rest } = data?.data;
    // TODO 로직 정리
    try {
      const { data: res } = await modiMutateAsync({
        ...rest,
        ...values,
      });
      if (res) {
        onOpenChange(false);
        toast({
          title: '수정되었습니다.',
        });
      } else {
        toast({
          title: '수정에 실패했습니다.',
        });
      }
    } catch (e) {
      toast({
        title: '수정에 실패했습니다.',
      });
    }
  };

  const onDelete = async (value: DeleteNurtiRequest) => {
    if (!data) return;
    try {
      const { data: res } = await deleteMutateAsync({
        historyId: data?.data.historyId,
      });
      if (res) {
        onOpenChange(false);
        toast({
          title: '삭제되었습니다.',
        });
      } else {
        toast({
          title: '삭제에 실패했습니다.',
        });
      }
    } catch (e) {
      toast({
        title: '삭제에 실패했습니다.',
      });
    }
  };

  if (isLoading) return <></>;
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="h-4/5">
        <DrawerDescription className=" flex items-center justify-center flex-col">
          <div className="px-4 text-lg pt-4 flex items-center justify-between w-full">
            <div className="flex-grow text-center">
              <span className="font-bold text-violet-500">{data?.data.foodName}</span>
            </div>
            <Button
              variant="destructive"
              className="w-[45px]"
              onClick={() => onDelete({ historyId: data?.data?.historyId as number })}
            >
              삭제
            </Button>
          </div>
          <div className="mt-5" />
          <div className="w-full px-4 ">
            <Form {...form}>
              <FormField
                name="carbohydrate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>탄수화물</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>단백질</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="fat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>지방</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="energy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>칼로리</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="vitaminC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비타민C</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Form>
          </div>
        </DrawerDescription>
        <DrawerFooter>
          <div className="flex gap-2">
            <Button className="w-1/2 " onClick={form.handleSubmit(onSubmit)}>
              수정하기
            </Button>
            <Button className="w-1/2" variant="destructive" onClick={() => onOpenChange(false)}>
              취소
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ModiDrawer;
