//src/app/naver-api/page.tsx
'use client';

import React from 'react';
import Ment from './components/Ment';
import RestaurantComponent from './components/Restaurant';
import MobileViewLayout from '@/commons/layouts/MobileViewLayout';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function RIPage() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const foodParam = params.get('food');

  // router 객체가 정의되어 있는지 확인
  if (!router) {
    return <p>Loading...</p>;
  }

  // Ensure food is available before rendering
  if (!foodParam) {
    return <p>Loading...</p>;
  }

  return (
    <MobileViewLayout>
      <Ment />
      <RestaurantComponent food={foodParam} />
    </MobileViewLayout>
  );
}
