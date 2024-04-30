'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
/*
 TODO redirect page token 처리 방식이 nextjs ssr을 통하여 인가코드로 token을 전달 받는 형식이 아닌 query string으로 받기 때문에 후에 수정 필요.
 */

export default function Page() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const role = searchParams.get('role');
    console.log('role', role);

    if (!accessToken) return;
    window.sessionStorage.setItem('accessToken', accessToken);
    role === 'GUEST' ? push('/create-user-info') : push('/');
  }, [searchParams]);

  return <></>;
}
