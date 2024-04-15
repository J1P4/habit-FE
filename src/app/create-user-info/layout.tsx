'use client';

import CreateUserInfoContextProvider from '@/app/create-user-info/context/create-user-info-context';
import MobileViewLayout from '@/commons/layouts/MobileViewLayout';

export default function CreateUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileViewLayout>
      <CreateUserInfoContextProvider>{children}</CreateUserInfoContextProvider>
    </MobileViewLayout>
  );
}
