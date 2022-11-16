import React from 'react';

const HNM = () => {
  const target = 'HNM';
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-full w-[55px] h-[55px]">
        <span className="text-xs">{`${target}`}</span>
      </div>
    </div>
  );
};

export default HNM;
