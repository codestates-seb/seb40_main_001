import React, { useState } from 'react';

const ChooseBtn = ({ contents, size }) => {
  const [isSelect, setIsSelect] = useState(false);

  const handleClick = idx => {
    const newArr = Array(contents.length).fill(false);
    newArr[idx] = true;
    setIsSelect(newArr);
  };
  // 333*60, 129*30
  const wd = size === 'small' ? 'w-[129px] h-[30px]' : 'w-[333px] h-[60px]';
  return (
    <div className={`${wd} rounded-[7px] border-2 border-main`}>
      {contents.map((ele, idx) => {
        return idx === 0 ? (
          <button
            key={idx}
            className={
              isSelect[idx]
                ? 'w-3/6 h-full rounded-[5px] rounded-r-none bg-main text-white text-400 border-r border-main'
                : 'w-3/6 h-full rounded-[5px] rounded-r-none bg-white text text-400 border-r border-main'
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
