'use client';
import clsx from 'clsx';
const FixedBottomWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        // 모바일에서는 하단 고정
        'fixed bottom-0 max-w-[480px] w-full mx-auto h-auto flex flex-col items-center py-4 px-6',
        // 모바일 이외 뷰포트에서는 상단으로부터 120px 위치
        'md:relative md:top-[100px]',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FixedBottomWrapper;
