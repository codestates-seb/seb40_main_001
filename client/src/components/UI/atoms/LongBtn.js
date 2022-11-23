import React from 'react';

const LongBtn = ({ txt, disabled, handleClick }) => {
  let style =
    'text-white text-400 btn w-[340px] h-[60px] rounded-[7px] px-[140px] py-[22px] my-10 border-0';

  if (disabled) {
    style += ' bg-text-disabled hover:bg-text-disabled';
  } else {
    style += ' bg-main hover:bg-main';
  }

  return (
    <div>
      <button className={style} onClick={handleClick}>
        {txt}
      </button>
    </div>
  );
};

export default LongBtn;
