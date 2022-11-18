import React from 'react';
import CommentLayout from '../atoms/CommentLayout';

const ViewrSource = ({ nickname, contents, handler }) => {
  return (
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
          onClick={handler}
        >
          답글
        </button>
      </div>
      <div className="text text-200">{`${contents}`}</div>
    </div>
  );
};

const ViewrCL = ({ nickname, contents, handler }) => {
  return (
    <CommentLayout
      source={
        <ViewrSource
          nickname={nickname}
          contents={contents}
          handler={handler}
        />
      }
    />
  );
};

export default ViewrCL;
