'use client';
const MobileViewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col mx-auto max-w-[480px] mx-auto w-full h-screen">{children}</div>
  );
};

export default MobileViewLayout;
