'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();

  useEffect(() => {
    const isLogin = window.sessionStorage.getItem('accessToken');
    if (!isLogin) push('/');
  }, [push]);
  return <>{children}</>;
}
