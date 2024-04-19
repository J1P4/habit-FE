const Headline = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex flex-col pt-3 pb-[48px] pl-4">
      <h1 className="text-[20px] font-bold whitespace-pre-line">{title}</h1>
    </div>
  );
};

export default Headline;
