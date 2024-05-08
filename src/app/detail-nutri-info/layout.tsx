'use client';

import MobileViewLayout from '@/commons/layouts/MobileViewLayout';
import { Header } from '@/commons/components/header/header';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/commons/constants/paths';
import AuthLayout from '@/commons/layouts/auth-layout';
import React from 'react';

export default function ModiLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();

  const onLeftClick = () => {
    push(PATHS.메인);
  };
  return (
    <MobileViewLayout>
      <AuthLayout>
        <Header
          leftSideButton={
            <button className="flex h-full w-[16px] items-center " onClick={onLeftClick}>
              <ArrowLeft />
            </button>
          }
          title={
            <span className=" grid flex-1 place-items-center text-center text-[18px] font-semibold leading-7 text-gray-500">
              상세 영양정보
            </span>
          }
        />
        {children}
      </AuthLayout>
    </MobileViewLayout>
  );
}
