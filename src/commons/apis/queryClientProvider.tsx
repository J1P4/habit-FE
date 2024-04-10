import { QueryClient, QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isDev } from '@/commons/constants';

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const initialIsOpen = isDev ? true : false;
  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={initialIsOpen} />
    </BaseQueryClientProvider>
  );
}
