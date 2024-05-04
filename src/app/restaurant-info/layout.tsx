import MobileViewLayout from '@/commons/layouts/MobileViewLayout';
import { Suspense } from 'react';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<></>}>
      <MobileViewLayout>{children}</MobileViewLayout>
    </Suspense>
  );
}
