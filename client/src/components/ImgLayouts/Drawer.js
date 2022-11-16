import React from 'react';

const Drawer = () => {
  const target = 'D';
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-full w-[50px] h-[50px]">
        <span className="text-xs">{`${target}`}</span>
      </div>
    </div>
  );
};

export default Drawer;
