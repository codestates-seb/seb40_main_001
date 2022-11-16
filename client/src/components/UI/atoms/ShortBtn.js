import React from 'react';

const ShortBtn = ({ txt, disabled, pink }) => {
  let style =
    'text-[#FFF] text-200 btn w-[92px] h-[46px] rounded-[5px] border-0';

  if (disabled) {
    style += ' bg-text-disabled hover:bg-text-disabled';
  } else if (pink) {
    style += ' bg-main-red hover:bg-main-red';
  } else {
    style += ' bg-main hover:bg-main';
  }

  return <button className={style}>{txt}</button>;
};

export default ShortBtn;
