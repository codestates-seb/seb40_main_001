import React, { useState, useEffect } from 'react';
import { ChooseBtn } from '../atoms';

const WriteGenderSelect = ({ handler, data }) => {
  const [isSelect, setIsSelect] = useState(false);
  // isSelect[0] === true
  // 무관
  // isSelect[1] === true
  // 동성

  useEffect(() => {
    if (data === 'ALL') setIsSelect([true, false]);
    if (data === 'SAME') setIsSelect([false, true]);
  }, [data]);

  useEffect(() => {
    if (isSelect[0]) handler('gender', '무관');
    if (isSelect[1]) handler('gender', '동성');
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
