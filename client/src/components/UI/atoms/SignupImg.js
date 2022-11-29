import React from 'react';

const SignUp = ({ target }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-main-week border-transparent rounded-full text-neutral-content w-[95px] h-[95px]">
        <img src={target} className="" />
      </div>
    </div>
  );
};

export default SignUp;
