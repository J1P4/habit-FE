
import MobileViewLayout from '@/commons/layouts/MobileViewLayout';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <MobileViewLayout>{children}</MobileViewLayout>;
}
