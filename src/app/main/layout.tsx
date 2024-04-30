'use client';

import MobileViewLayout from '@/commons/layouts/MobileViewLayout';
import AuthLayout from '@/commons/layouts/auth-layout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      <MobileViewLayout>{children}</MobileViewLayout>
    </AuthLayout>
  );
}
