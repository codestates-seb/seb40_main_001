import React from 'react';
import CommentDeleteBtn from '../atoms/CommentDeleteBtn';
import WriterCL from '../atoms/WriterCommentLayout';

const Source = ({
  nickname,
  contents,
  handler,
  deleteHandler,
  parentId,
  id,
  mainReply,
}) => {
  return mainReply ? (
    // 메인 댓글 일 때
    <div className="flex flex-row justify-between">
      <div className="flex flex-col m-[15px]">
        <div className="flex flex-row">
          <div className="font-bold mr-[10px] text-200 text-red">{`${nickname}`}</div>
          <button className="text-low text-[11px]" onClick={() => handler(id)}>
            답글
          </button>
        </div>
        <div className="text-200 ">{`${contents}`}</div>
      </div>
      <div className="m-[5px]">
        <CommentDeleteBtn onClick={() => deleteHandler(id)} />
      </div>
    </div>
  ) : (
    // 메인 댓글이 아닐 때
    <div className="flex flex-row justify-between">
      <div className="flex flex-col m-[15px]">
        <div className="flex flex-row">
          <div className="font-bold mr-[10px] text-200 text-red">{`${nickname}`}</div>
        </div>
        <div className="text-200 ">{`${contents}`}</div>
      </div>
      <div className="m-[5px]">
        <CommentDeleteBtn onClick={() => deleteHandler(parentId, id)} />
      </div>
    </div>
  );
};

const WriterCardX = ({
  nickname,
  contents,
  handler,
  deleteHandler,
  id,
  parentId,
  mainReply,
}) => {
  return (
    <WriterCL
      source={
        <Source
          nickname={nickname}
          contents={contents}
          handler={handler}
          deleteHandler={deleteHandler}
          id={id}
          parentId={parentId}
          mainReply={mainReply}
        />
      }
    />
  );
};

export default WriterCardX;
