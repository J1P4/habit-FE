'use client';
import KakaoLoginButton from '@/app/(landing)/components/KakaoLoginButton';
import FixedBottomWrapper from '@/commons/components/FixedBottomWrapper';
import Image from 'next/image';
import HabitLogo from '/public/assets/logo/habit_logo.png';
export default function HomePage() {
  const onClickKakao = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/oauth2/authorization/kakao`;
  };
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <Image src={HabitLogo} alt={'habit_logo.png'} className="mb-20" />
      <FixedBottomWrapper>
        <KakaoLoginButton onClick={onClickKakao} />
      </FixedBottomWrapper>
    </div>
  );
}
