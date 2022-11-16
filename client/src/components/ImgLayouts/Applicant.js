import React from 'react';

const Applicant = () => {
  const target = 'A';
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-full w-[38px] h-[38px]">
        <span className="text-xs">{`${target}`}</span>
      </div>
    </div>
  );
};

export default Applicant;
