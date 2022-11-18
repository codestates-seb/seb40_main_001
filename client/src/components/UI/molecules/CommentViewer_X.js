import React from 'react';
import CommentDeleteBtn from '../atoms/CommentDeleteBtn';
import CommentLayout from '../atoms/CommentLayout';

const ViewrSource = ({ nickname, contents, handler, deleteHandler }) => {
  return (
    <>
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
    </>
  );
};

const ViewrCLX = ({ nickname, contents, handler, deleteHandler }) => {
  return (
    <CommentLayout
      source={
        <ViewrSource
          nickname={nickname}
          contents={contents}
          handler={handler}
          deleteHandler={deleteHandler}
        />
      }
    />
  );
};

export default ViewrCLX;
