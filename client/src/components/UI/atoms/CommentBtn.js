import React from 'react';

const CommentBtn = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="text-[#FFF] text-400 btn w-[70px] h-[90px] rounded-[5px] border-0 bg-main hover:bg-main"
    >
      확인
    </button>
  );
};

export default CommentBtn;
