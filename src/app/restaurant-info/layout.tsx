'use client';

import MobileViewLayout from '@/commons/layouts/MobileViewLayout';
import { Suspense } from 'react';
import { Header } from '@/commons/components/header/header';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/commons/constants/paths';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const onLeftClick = () => {
    push(PATHS.메인);
  };
  return (
    <Suspense fallback={<></>}>
      <MobileViewLayout>
        <Header
          leftSideButton={
            <button className="flex h-full w-[16px] items-center " onClick={onLeftClick}>
              <ArrowLeft />
            </button>
          }
        />
        {children}
      </MobileViewLayout>
    </Suspense>
  );
}
