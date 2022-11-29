import React from 'react';
import { LeftArrow } from '../../../assets/img';

const HeaderArrow = ({ txt, arrowHandler }) => {
  return (
    <div className="flex flex-row justify-between w-[390px] h-[55px] items-center px-5">
      <LeftArrow onClick={arrowHandler} />
      <div className="text-400">{txt}</div>
      <div className="w-[40px]"></div>
    </div>
  );
};

export default HeaderArrow;
