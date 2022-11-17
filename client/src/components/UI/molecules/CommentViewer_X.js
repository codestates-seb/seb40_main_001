import React from 'react';
import CommentDeleteBtn from '../atoms/CommentDeleteBtn';

const ViewrCLX = ({ nickname, contents, handler, deleteHandler }) => {
  return (
    <div
      className="
    card 
    flex 
    flex-row 
    w-[319px] 
    h-[70px] 
    bg-white 
    card-bordered 
    border-[1px] 
    border-main 
    rounded-[5px] 
    drop-shadow-lg
    justify-between
    "
    >
      <div className="flex flex-col m-[15px]">
        <div className="flex flex-row">
          <div className="font-bold mr-[10px] text-200">{`${nickname}`}</div>
          <button className="text-low text-[11px]" onClick={handler}>
            답글
          </button>
        </div>
        <div className="text-200 ">{`${contents}`}</div>
      </div>
      <div className="m-[5px]">
        <CommentDeleteBtn onClick={deleteHandler} />
      </div>
    </div>
  );
};

export default ViewrCLX;
