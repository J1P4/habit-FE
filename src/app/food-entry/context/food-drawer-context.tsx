import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface FoodDrawerContextType {
  isOpen: boolean;
  drawerData: { id: number; name: string } | null; // id와 name을 저장하는 drawerData 추가
  onOpenChange: (open: boolean) => void; // 인자로 open만 받는 함수로 변경
  setOpenDrawerData: (id: number, name: string) => void; // id와 name을 설정하는 함수 추가
}

export const FoodDrawerContext = createContext<FoodDrawerContextType | undefined>(undefined);

export default function FoodDrawerContextProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerData, setDrawerData] = useState<{ id: number; name: string } | null>(null); // drawerData 상태 추가

  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const setOpenDrawerData = useCallback((id: number, name: string) => {
    setDrawerData({ id, name }); // Drawer가 열릴 때 id와 name 저장
  }, []);

  const memoizedValue = useMemo(
    () => ({ isOpen, drawerData, onOpenChange, setOpenDrawerData }),
    [isOpen, drawerData, onOpenChange, setOpenDrawerData],
  );

  return <FoodDrawerContext.Provider value={memoizedValue}>{children}</FoodDrawerContext.Provider>;
}

export function useFoodDrawerContext() {
  const context = useContext(FoodDrawerContext);
  if (!context) {
    throw new Error('[FoodDrawerContextProvider]를 감싸서 사용하세요.');
  }
  return context;
}
