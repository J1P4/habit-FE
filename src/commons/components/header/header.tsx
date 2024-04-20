interface HeaderProps {
  leftSideButton?: React.ReactNode;
  rightSideButton?: React.ReactNode;
}

export function Header({ leftSideButton, rightSideButton }: HeaderProps) {
  return (
    <div className="flex h-[44px] w-full shrink-0 items-center justify-between px-[15px]">
      {leftSideButton}
      {rightSideButton}
    </div>
  );
}
