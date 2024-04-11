'use client';
const MobileViewLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col items-center max-w-[480px] mx-auto w-full">{children}</div>;
};

export default MobileViewLayout;
