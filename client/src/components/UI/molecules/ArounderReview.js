import React from 'react';
import CommentDeleteBtn from '../atoms/CommentDeleteBtn';

const ArounderReview = ({ handleClick }) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center mr-[33px]">
        <div className="text-300 font-bold w-[140px]">어라운더 리뷰하기</div>
        <div className="text-100 w-[150px]">
          리뷰는 친구에게 공개되지 않습니다.
        </div>
      </div>

      <CommentDeleteBtn onClick={handleClick} />
    </div>
  );
};

export default ArounderReview;
