import React from 'react';

const MiniBtn = ({ txt, disabled }) => {
  let style =
    'text-[#FFF] text-200 btn w-[80px] h-[35px] rounded-[5px] border-0';

  if (disabled) {
    style += ' bg-main-week hover:bg-main-week';
  } else {
    style += ' bg-main hover:bg-main';
  }

  return <button className={style}>{txt}</button>;
};

export default MiniBtn;
