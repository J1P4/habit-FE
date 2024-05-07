'use client';

import MobileViewLayout from '@/commons/layouts/MobileViewLayout';
import AuthLayout from '@/commons/layouts/auth-layout';
import PagePaddingLayout from '@/commons/layouts/page-padding-layout';
import { Header } from '@/commons/components/header/header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      <MobileViewLayout>
        <Header />
        <PagePaddingLayout>{children}</PagePaddingLayout>
      </MobileViewLayout>
    </AuthLayout>
  );
}
