import React from 'react';
import WriterCL from '../atoms/WriterCommentLayout';

const Source = ({ nickname, contents, handler }) => {
  return (
    <div className="m-[15px]">
      <div className="flex flex-row items-center ">
        <div className="font-bold mr-[10px] text-200 text-red ">{`${nickname}`}</div>
        <button className="text-low text-[11px]" onClick={handler}>
          답글
        </button>
      </div>
      <div className="text-200 ">{`${contents}`}</div>
    </div>
  );
};

const WriterCard = ({ nickname, contents, handler }) => {
  <WriterCL
    source={
      <Source nickname={nickname} contents={contents} handler={handler} />
    }
  />;
};

export default WriterCard;
