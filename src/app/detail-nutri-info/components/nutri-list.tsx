import React from 'react';

const NutriList = ({ children, energy = 0 }: { children: React.ReactNode; energy?: number }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full border-t-[1px] overflow-hidden">
        <div className="bg-[#FFF8EE] px-5 py-4 flex justify-between border-b">
          <div className="font-bold text-xl">총 열량</div>
          <div className="font-bold text-xl">{Math.round(energy)} Kcal</div>
        </div>
        <div className="bg-gray-100">
          <div className="flex justify-between px-10 py-4 text-lg">
            <div className="font-bold">영양소</div>
            <div className="font-bold">섭취량</div>
            <div className="font-bold">권장량</div>
          </div>
        </div>
        <ul className="text-center ">{children}</ul>
      </div>
    </div>
  );
};

const NutriListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white text-center w-full py-2 flex justify-between items-center">{children}</div>
  );
};

NutriList.Item = NutriListItem;

export default NutriList;
