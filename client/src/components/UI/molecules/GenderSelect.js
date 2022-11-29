import React from 'react';
import { ChooseBtn } from '../atoms';

const GenderSelect = ({ isSelect, setIsSelect }) => {
  // isSelect[0] === true
  // 남성
  // isSelect[1] === true
  // 여성

  return (
    <div className="flex flex-col text-left py-2">
      <div className="text font-bold text-200 mb-1">성별</div>
      <ChooseBtn
        isSelect={isSelect}
        setIsSelect={setIsSelect}
        contents={['남성', '여성']}
      />
    </div>
  );
};

export default GenderSelect;
