import React from 'react';

const NutriList = ({ children, energy = 0 }: { children: React.ReactNode; energy?: number }) => {
  return (
    <div className="flex flex-col items-center py-6 px-4">
      <div>영양정보</div>
      <div className="flex flex-col items-center w-full">
        <div className="flex w-full justify-between  border-b-[1px] py-4 items-center">
          <div>총 열량</div>
          <div className="text-xl">{Math.round(energy)} Kcal</div>
        </div>
        <div className="flex w-full justify-between  py-5 items-center border-b-[1px] ">
          <div className="w-[100px] text-center text-lg">영양소</div>
          <div className="w-[100px] text-center text-lg">섭취량</div>
          <div className="w-[100px] text-center text-lg">권장량</div>
        </div>
        <ul className="w-full">{children}</ul>
      </div>
    </div>
  );
};

const NutriListItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full justify-between  py-4 items-center">{children}</div>;
};

// Compound component pattern을 사용하여 NutriList에 NutriListItem을 추가
NutriList.Item = NutriListItem;

export default NutriList;
