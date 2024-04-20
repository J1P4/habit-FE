import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface SearchFoodListValue {
  keyword: string;
}

interface SearchFoodListContextType {
  setValue(value: string): void;
  getValue(): SearchFoodListValue;
}

export const SearchFoodListContext = createContext<SearchFoodListContextType | undefined>(
  undefined,
);

export default function SearchFoodListContextProvider({ children }: { children: React.ReactNode }) {
  const [keyword, setKeyword] = useState<string>('');

  const setValue = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  const getValue = useCallback(() => {
    return { keyword };
  }, [keyword]);

  const memoizedValue = useMemo(() => ({ setValue, getValue }), [setValue, getValue]);

  return (
    <SearchFoodListContext.Provider value={memoizedValue}>
      {children}
    </SearchFoodListContext.Provider>
  );
}

export function useSearchFoodListContext() {
  const context = useContext(SearchFoodListContext);
  if (!context) {
    throw new Error('[SearchFoodListContextProvider]를 감싸서 사용하세요.');
  }
  return context;
}
