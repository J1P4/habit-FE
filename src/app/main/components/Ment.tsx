const Ment = ({ region }: { region: string }) => {
  console.log('region', region);
  return (
    <div className="w-full flex flex-col pt-3 pl-4">
      <h1 className="text-[18px] font-bold whitespace-pre-line"> 오늘의 {region} 추천 식당 </h1>
    </div>
  );
};

export default Ment;
