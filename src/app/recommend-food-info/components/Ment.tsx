import useUserName from '@/app/main/api/queries/useUserName';

const Ment = () => {
  const { data: nickname, isLoading: isNickNameLoading } = useUserName();
  if (isNickNameLoading) return <></>;
  return (
    <div className="p-4 font-bold">
      <div>{nickname}님, </div>
      <div>오늘의 추천 음식입니다 🍴 </div>
    </div>
  );
};

export default Ment;
