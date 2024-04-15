const KakaoLoginButton = ({ onClick }: { onClick?: () => void }) => {
  const onClickKakao = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/oauth2/authorization/kakao`;
  };
  return (
    <button className="rounded-[20px] w-[322px] h-[65px] bg-[#FEE500] px-4 py-2" onClick={onClick}>
      <div className="flex items-center gap-[12px] w-full justify-center ">
        <span className="text-lg font-bold" onClick={onClickKakao}>
          카카오 계정으로 시작하기
        </span>
      </div>
    </button>
  );
};

export default KakaoLoginButton;
