import React from 'react';

const LongBtn = ({ txt, disabled, handleClick }) => {
  let style =
    'text-[#FFF] btn w-[340px] h-[60px] rounded-[7px] px-[148px] py-[22px] border-0';

  if (disabled) {
    style += ' bg-text-disabled hover:bg-text-disabled';
  } else {
    style += ' bg-main hover:bg-main';
  }

  return (
    <button className={style} onClick={handleClick}>
      {txt}
    </button>
  );
};

export default LongBtn;
