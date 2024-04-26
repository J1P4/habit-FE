import React from 'react';
import MobileViewLayout from '@/commons/layouts/MobileViewLayout';

const DetailNutriInfoPage = () => {
  return (
    <MobileViewLayout>
      {/* 상단 바 */}
      <div className="flex justify-between items-center px-4 py-2 my-15 bg-gray-200">
        {/* 날짜 선택 칸 */}
        <div className="flex items-center">
          <label htmlFor="datePicker" className="mr-2">날짜 선택:</label>
          <input type="date" id="datePicker" />
        </div>
        {/* 기타 컨트롤이나 메뉴 등 */}
      </div>

      {/* 상세 영양소를 볼 수 있는 UI */}
      <div className="p-4 bg-[#F4F9F3]">
        
        <div className="flex flex-wrap mb-2">
          <div className="w-1/3 pr-4">
          <div className="py-5 rounded-lg bg-white flex flex-col items-center mb-2">
            <span className="font-semibold mb-1">단백질</span>
            <span>20g</span>
          </div>

          </div>
          <div className="w-1/3 pr-10">
            <div className="bg-white bg-white flex flex-col items-center mb-2">
              <span className="font-semibold mr-2">탄수화물</span> 
              <span>30g</span>
            </div>
          </div>
          <div className="w-1/3">
            <div className="bg-white flex flex-col items-center mb-2">
              <span className="font-semibold mr-2">지방</span>
              <span>10g</span>
            </div>
          </div>
        </div>
        {/* 추가적인 영양소 정보 등 */}
      </div>


       {/* 상세 영양소를 볼 수 있는 UI */}
       <div className="p-4">
        {/* 상세 영양소 정보 */}
       
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">영양소</th>
              <th className="px-4 py-2">양</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">단백질</td>
              <td className="border px-4 py-2">20g</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">탄수화물</td>
              <td className="border px-4 py-2">30g</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">지방</td>
              <td className="border px-4 py-2">10g</td>
            </tr>
            {/* 추가적인 영양소 정보 등 */}
          </tbody>
        </table>
      </div>
    </MobileViewLayout>
  );
}

export default DetailNutriInfoPage;
