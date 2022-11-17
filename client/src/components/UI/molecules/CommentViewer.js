import React from 'react';

const ViewrCL = ({ nickname, contents, handler }) => {
  return (
    <div
      className="
    card 
    flex 
    flex-col 
    w-[319px] 
    h-[70px] 
    bg-white 
    card-bordered 
    border-[1px] 
    border-main 
    rounded-[5px] 
    drop-shadow-lg
    "
    >
      <div className="m-[15px]">
        <div
          className="
      flex 
      flex-row
      items-center
      "
        >
          <div
            className="
        font-bold 
        mr-[10px]
        text-200
        "
          >{`${nickname}`}</div>
          <button
            className="
        text-low
        text-[11px]
        "
            onClick={handler}
          >
            답글
          </button>
        </div>
        <div className="text-200 ">{`${contents}`}</div>
      </div>
    </div>
  );
};

export default ViewrCL;
