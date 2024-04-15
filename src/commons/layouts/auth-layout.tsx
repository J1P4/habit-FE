'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const isLogin = window.localStorage.getItem('accessToken');
  if (!isLogin) {
    push('/');
  }

  useEffect(() => {
    if (!isLogin) push('/');
  }, [isLogin, push]);
  return isLogin ? <>{children}</> : <></>;
}
