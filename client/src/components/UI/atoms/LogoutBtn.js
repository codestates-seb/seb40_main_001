import React from 'react';

const LogoutBtn = ({ handler }) => {
  return (
    <button
      onClick={handler}
      className="w-20 h-[35px] rounded-[5px] border-2 text-200 text border-main bg-white"
    >
      ๋ก๊ทธ์์
    </button>
  );
};

export default LogoutBtn;
