'use client';

import MobileViewLayout from '@/commons/layouts/MobileViewLayout';
import AuthLayout from '@/commons/layouts/auth-layout';
import PagePaddingLayout from '@/commons/layouts/page-padding-layout';
import { Header } from '@/commons/components/header/header';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/commons/constants/paths';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const onLeftClick = () => {
    push(PATHS.메인);
  };
  return (
    <Suspense fallback={<></>}>
      <AuthLayout>
        <MobileViewLayout>
          <Header
            leftSideButton={
              <button className="flex h-full w-[16px] items-center " onClick={onLeftClick}>
                <ArrowLeft />
              </button>
            }
          />{' '}
          <PagePaddingLayout>{children}</PagePaddingLayout>
        </MobileViewLayout>
      </AuthLayout>
    </Suspense>
  );
}
