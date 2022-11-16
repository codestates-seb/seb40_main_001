import React, { useState } from 'react';

const ChooseBtn = () => {
  const [isSelect, setIsSelect] = useState(false);
  const gender = ['남성', '여성'];

  const handleClick = idx => {
    const newArr = Array(gender.length).fill(false);
    newArr[idx] = true;
    setIsSelect(newArr);
  };

  return (
    <div className="w-[333px] h-[60px] rounded-[7px] border-2 border-main">
      {gender.map((ele, idx) => {
        return idx === 0 ? (
          <button
            key={idx}
            className={
              isSelect[idx]
                ? 'w-3/6 h-full rounded-[5px] rounded-r-none bg-main text-white text-400'
                : 'w-3/6 h-full rounded-[5px] rounded-r-none bg-white text text-400'
            }
            onClick={() => handleClick(idx)}
          >
            {ele}
          </button>
        ) : (
          <button
            key={idx}
            className={
              isSelect[idx]
                ? 'w-3/6 h-full rounded-[5px] rounded-l-none bg-main text-white text-400'
                : 'w-3/6 h-full rounded-[5px] rounded-l-none bg-white text text-400'
            }
            onClick={() => handleClick(idx)}
          >
            {ele}
          </button>
        );
      })}
    </div>
  );
};

export default ChooseBtn;
