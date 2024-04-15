const KakaoLoginButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button className="rounded-[20px] w-[322px] h-[65px] bg-[#FEE500] px-4 py-2" onClick={onClick}>
      <div className="flex items-center gap-[12px] w-full justify-center ">
        <span className="text-lg font-bold" onClick={onClick}>
          카카오 계정으로 시작하기
        </span>
      </div>
    </button>
  );
};

export default KakaoLoginButton;
