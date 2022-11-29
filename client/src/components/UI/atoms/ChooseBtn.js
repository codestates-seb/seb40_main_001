import React from 'react';

const ChooseBtn = ({ isSelect, setIsSelect, contents, size }) => {
  const handleClick = (e, idx) => {
    e.preventDefault();
    const newArr = Array(contents.length).fill(false);
    newArr[idx] = true;
    setIsSelect(newArr);
  };
  // 333*60, 129*30
  const wd = size === 'small' ? 'w-[129px] h-[30px]' : 'w-[333px] h-[60px]';
  const textsize = size === 'small' ? 'text-200' : 'text-400';

  return (
    <div className={`${wd} rounded-[7px] border-2 border-main`}>
      {contents.map((ele, idx) => {
        return idx === 0 ? (
          <button
            key={idx}
            className={
              isSelect[idx]
                ? `w-3/6 h-full rounded-[5px] rounded-r-none bg-main text-white ${textsize} border-r border-main`
                : `w-3/6 h-full rounded-[5px] rounded-r-none bg-white text ${textsize} border-r border-main`
            }
            onClick={e => handleClick(e, idx)}
          >
            {ele}
          </button>
        ) : (
          <button
            key={idx}
            className={
              isSelect[idx]
                ? `w-3/6 h-full rounded-[5px] rounded-l-none bg-main text-white ${textsize}`
                : `w-3/6 h-full rounded-[5px] rounded-l-none bg-white text ${textsize}`
            }
            onClick={e => handleClick(e, idx)}
          >
            {ele}
          </button>
        );
      })}
    </div>
  );
};

export default ChooseBtn;
