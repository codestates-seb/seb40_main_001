import React, { useState } from 'react';
import { ChooseBtn } from '../atoms';

const WriteGenderSelect = () => {
  const [isSelect, setIsSelect] = useState(false);
  // isSelect[0] === true
  // 남성
  // isSelect[1] === true
  // 여성

  // width는 상위 컴포넌트에서 잡을 것

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
