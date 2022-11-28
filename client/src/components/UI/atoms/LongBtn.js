import React from 'react';

const LongBtn = ({ txt, disabled }) => {
  let style =
    'text-white text-400 btn w-[340px] h-[60px] rounded-[7px] mt-40 mb-2 border-0';

  if (disabled) {
    style += ' bg-text-disabled hover:bg-text-disabled';
  } else {
    style += ' bg-main hover:bg-main';
  }

  return (
    <div>
      <button className={style}>{txt}</button>
    </div>
  );
};

export default LongBtn;
