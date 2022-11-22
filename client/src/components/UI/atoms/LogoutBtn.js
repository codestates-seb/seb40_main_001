import React from 'react';

const LogoutBtn = ({ handler }) => {
  return (
    <button
      onClick={handler}
      className="w-20 h-[35px] rounded-[5px] border-2 text-200 text border-main bg-white"
    >
      로그아웃
    </button>
  );
};

export default LogoutBtn;
