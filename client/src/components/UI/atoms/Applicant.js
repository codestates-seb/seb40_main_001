import React from 'react';

const Applicant = ({ target }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-full w-[38px] h-[38px]">
        <img src={target} className="" />
      </div>
    </div>
  );
};

export default Applicant;
