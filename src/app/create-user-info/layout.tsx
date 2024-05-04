'use client';

import CreateUserInfoContextProvider from '@/app/create-user-info/context/create-user-info-context';
import MobileViewLayout from '@/commons/layouts/MobileViewLayout';
import AuthLayout from '@/commons/layouts/auth-layout';
import { Suspense } from 'react';

export default function CreateUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthLayout>
        <MobileViewLayout>
          <CreateUserInfoContextProvider>{children}</CreateUserInfoContextProvider>
        </MobileViewLayout>
      </AuthLayout>
    </Suspense>
  );
}
