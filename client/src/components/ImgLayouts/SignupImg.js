import React from 'react';

const SignUp = () => {
  const target = 'S';
  return (
    <div className="avatar placeholder">
      <div className="bg-gray border-none text-neutral-content rounded-full w-[95px] h-[95px]">
        <span className="text-xs">{`${target}`}</span>
      </div>
    </div>
  );
};

export default SignUp;
