import { createContext, useCallback, useContext, useMemo, useRef } from 'react';

type AgeGroup = 'Under 19' | '20-24' | '25-29' | '30-34' | '35-39' | '40 and above';

export interface CreateUserInfoValues {
  nickname?: string;
  height?: number;
  weight?: number;
  gender?: string;
  age?: number;
}

interface UserInfoContextType {
  setValue<T extends keyof CreateUserInfoValues>(target: T, value: CreateUserInfoValues[T]): void;
  getValue<T extends keyof CreateUserInfoValues>(target: T): CreateUserInfoValues[T];
  getValues(): CreateUserInfoValues;
}

export const CreateUserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

export default function CreateUserInfoContextProvider({ children }: { children: React.ReactNode }) {
  const createUserInfoValues = useRef<CreateUserInfoValues>({} as CreateUserInfoValues);

  const setValue = useCallback(
    <T extends keyof CreateUserInfoValues>(target: T, value: CreateUserInfoValues[T]) => {
      const prevValues = createUserInfoValues.current;
      createUserInfoValues.current = { ...prevValues, [target]: value };
    },
    [],
  );

  const getValue = useCallback(<T extends keyof CreateUserInfoValues>(target: T) => {
    return createUserInfoValues.current[target];
  }, []);

  const getValues = useCallback(() => {
    return createUserInfoValues.current;
  }, []);

  const memoizedValue = useMemo(
    () => ({ setValue, getValue, getValues }),
    [setValue, getValue, getValues],
  );
  return (
    <CreateUserInfoContext.Provider value={memoizedValue}>
      {children}
    </CreateUserInfoContext.Provider>
  );
}

export function useCreateUserInfoContext() {
  const context = useContext(CreateUserInfoContext);
  if (!context) {
    throw new Error('[CreateUserInfoContextProvider] 를 감싸서 사용하세요.');
  }
  return context;
}
