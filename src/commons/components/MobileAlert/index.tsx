'use client';

import React from 'react';

const MobileAlert = () => {
  return (
    // md:는 768px 이상의 뷰포트에서 적용되는 Tailwind CSS 미디어 쿼리입니다.
    <div className="md:block hidden bg-yellow-200 text-center py-2">
      <p className="text-sm text-gray-900">해당 사이트는 모바일 사이즈 기준으로 작업되었습니다.</p>
    </div>
  );
};

export default MobileAlert;
