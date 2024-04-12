'use client';
import KakaoLoginButton from '@/app/home/components/KakaoLoginButton';
import FixedBottomWrapper from '@/commons/components/FixedBottomWrapper';

export default function HomePage() {
  return (
    <>
      <div className="font-bold"></div>
      <FixedBottomWrapper>
        <KakaoLoginButton />
      </FixedBottomWrapper>
    </>
  );
}
