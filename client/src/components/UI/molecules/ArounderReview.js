import React from 'react';
import CommentDeleteBtn from '../atoms/CommentDeleteBtn';

const ArounderReview = ({ handleClick }) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center mr-[26px]">
        <div className="text text-300 font-bold">어라운더 리뷰하기</div>
        <div className="text text-100">리뷰는 친구에게 공개되지 않습니다.</div>
      </div>
      <CommentDeleteBtn handleClick={handleClick} />
    </div>
  );
};

export default ArounderReview;
