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
        'fixed bottom-0  w-full mx-auto h-auto flex flex-col items-center py-4 px-2',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FixedBottomWrapper;
