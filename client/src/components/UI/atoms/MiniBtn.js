import React from 'react';

const MiniBtn = ({ disabled, handleClick }) => {
  let style = 'text-white text-200 w-[80px] h-[35px] rounded-[5px] border-0';

  if (disabled) {
    style += ' bg-main-week hover:bg-main-week';
  } else {
    style += ' bg-main hover:bg-main';
  }

  return (
    <button className={style} disabled={disabled} onClick={handleClick}>
      확인
    </button>
  );
};

export default MiniBtn;
