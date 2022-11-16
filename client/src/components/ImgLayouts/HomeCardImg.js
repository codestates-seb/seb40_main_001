import React from 'react';

const HomeCard = () => {
  const target = 'H';
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-full w-[26px] h-[26px]">
        <span className="text-xs">{`${target}`}</span>
      </div>
    </div>
  );
};

export default HomeCard;
