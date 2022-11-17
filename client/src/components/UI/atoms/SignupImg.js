import React from 'react';

const SignUp = ({ target }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-full w-[95px] h-[95px]">
        <img src={target} className="" />
      </div>
    </div>
  );
};

export default SignUp;
