import React from 'react';

const HeaderNone = ({ txt }) => {
  return (
    <div className="flex flex-row justify-center w-[390px] h-[55px] items-center px-5">
      <div className="text-400">{txt}</div>
    </div>
  );
};
export default HeaderNone;
