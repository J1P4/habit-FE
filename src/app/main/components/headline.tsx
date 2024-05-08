const Headline = ({ title }: { title: string | React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col pt-3 pb-8  pl-4">
      <h1 className="text-[20px] font-bold whitespace-pre-line">{title}</h1>
    </div>
  );
};

export default Headline;
