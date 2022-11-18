import React from 'react';
import CommentDeleteBtn from '../atoms/CommentDeleteBtn';
import WriterCL from '../atoms/WriterCommentLayout';

const Source = ({ nickname, contents, handler, deleteHandler }) => {
  return (
    <>
      <div className="flex flex-col m-[15px]">
        <div className="flex flex-row">
          <div className="font-bold mr-[10px] text-200 text-red">{`${nickname}`}</div>
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

const WriterCardX = ({ nickname, contents, handler, deleteHandler }) => {
  return (
    <WriterCL
      source={
        <Source
          nickname={nickname}
          contents={contents}
          handler={handler}
          deleteHandler={deleteHandler}
        />
      }
    />
  );
};

export default WriterCardX;
