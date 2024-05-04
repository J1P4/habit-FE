import { Suspense } from 'react';

export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<></>}>{children}</Suspense>;
}
