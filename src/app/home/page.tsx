'use client';
import KakaoLoginButton from '@/app/home/components/KakaoLoginButton';
import FixedBottomWrapper from '@/commons/components/FixedBottomWrapper';

export default function HomePage() {
  const onClickKakao = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/oauth2/authorization/kakao`;
  };
  return (
    <>
      <FixedBottomWrapper>
        <KakaoLoginButton onClick={onClickKakao} />
      </FixedBottomWrapper>
    </>
  );
}
