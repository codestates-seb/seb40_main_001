import React, { useState, useEffect } from 'react';
import { ChooseBtn } from '../atoms';

const WriteGenderSelect = ({ handler }) => {
  const [isSelect, setIsSelect] = useState(false);
  // isSelect[0] === true
  // 무관
  // isSelect[1] === true
  // 동성

  useEffect(() => {
    const gender = isSelect[0] ? '무관' : '동성';
    handler('gender', gender);
  }, [isSelect]);

  return (
    <div className="flex flex-row justify-between">
      <div className="text-low text-300">성별</div>
      <ChooseBtn
        isSelect={isSelect}
        setIsSelect={setIsSelect}
        contents={['무관', '동성']}
        size="small"
      />
    </div>
  );
};

export default WriteGenderSelect;
