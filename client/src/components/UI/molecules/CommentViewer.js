import React from 'react';
import CommentLayout from '../atoms/CommentLayout';

const ViewerSource = ({ nickname, contents, handler, id, mainRe }) => {
  return mainRe ? (
    <div className="m-[15px]">
      <div className="flex flex-row items-center">
        <div
          className="
          text font-bold mr-[10px] text-200"
        >{`${nickname}`}</div>
        <button
          className="
        text-low
        text-[11px]
        "
          onClick={() => handler(id)}
        >
          답글
        </button>
      </div>
      <div className="text text-200">{`${contents}`}</div>
    </div>
  ) : (
    <div className="m-[15px]">
      <div className="flex flex-row items-center">
        <div
          className="
          text font-bold mr-[10px] text-200"
        >{`${nickname}`}</div>
      </div>
      <div className="text text-200">{`${contents}`}</div>
    </div>
  );
};

const ViewerCL = ({ nickname, contents, handler, id, mainRe }) => {
  return (
    <CommentLayout
      source={
        <ViewerSource
          nickname={nickname}
          contents={contents}
          handler={handler}
          id={id}
          mainRe={mainRe}
        />
      }
    />
  );
};

export default ViewerCL;
