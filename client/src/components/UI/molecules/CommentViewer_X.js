import React from 'react';
import CommentDeleteBtn from '../atoms/CommentDeleteBtn';
import CommentLayout from '../atoms/CommentLayout';

const ViewerSource = ({
  nickname,
  contents,
  handler,
  deleteHandler,
  parentId,
  id,
  mainReply,
}) => {
  // console.log('mainReply=', mainReply, 'parentId=', parentId, 'id=', id);
  return mainReply ? (
    <div className="flex flex row justify-between">
      <div className="flex flex-col m-[15px]">
        <div className="flex flex-row">
          <div className="font-bold mr-[10px] text-200">{`${nickname}`}</div>
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
    <div className="flex flex row justify-between">
      <div className="flex flex-col m-[15px]">
        <div className="flex flex-row">
          <div className="font-bold mr-[10px] text-200">{`${nickname}`}</div>
        </div>
        <div className="text-200 ">{`${contents}`}</div>
      </div>
      <div className="m-[5px]">
        <CommentDeleteBtn onClick={() => deleteHandler(parentId, id)} />
      </div>
    </div>
  );
};

const ViewerCLX = ({
  nickname,
  contents,
  handler,
  deleteHandler,
  id,
  parentId,
  mainReply,
}) => {
  return (
    <CommentLayout
      source={
        <ViewerSource
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

export default ViewerCLX;

// 최상위에서 댓글 데이터 & 삭제 핸들러를 내려준다.
// 하위 컴포넌트에서 댓글 데이터의 idx번째 데이터와 삭제 핸들러를 받는다.
// 하위 컴포넌트는 댓글 데이터.length만큼 반복된다.
// 최하위 컴포넌트에서 댓글 데이터의 idx번째 데이터와 삭제 핸들러를 받는다.
// 삭제 핸들러에 인자로 idx를 넘기고, onClick이벤트에서 함수로 핸들러를 호출한다.
