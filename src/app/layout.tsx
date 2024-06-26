import './globals.css';
import type { Metadata } from 'next';
import { HabitFont } from '@/app/fonts';
import { QueryClientProvider } from '@/commons/apis/queryClientProvider';
import { Toaster } from '@/commons/components/ui/toaster';
import MobileAlert from '@/commons/components/MobileAlert';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={HabitFont.className}>
        <MobileAlert />
        <QueryClientProvider>{children}</QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
