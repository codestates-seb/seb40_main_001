import React, { useState } from 'react';
import { ChooseBtn } from '../atoms';

const GenderSelect = () => {
  const [isSelect, setIsSelect] = useState(false);
  // isSelect[0] === true
  // 남성
  // isSelect[1] === true
  // 여성

  return (
    <div>
      <div className="text font-bold text-300 mb-1">성별</div>
      <ChooseBtn
        isSelect={isSelect}
        setIsSelect={setIsSelect}
        contents={['남성', '여성']}
      />
    </div>
  );
};

export default GenderSelect;