import React, { useState } from 'react';
import { ShortBtn, HNM } from '../atoms';
import getIcon from '../../../utils/getIcon';

const HistoryCL = ({ data, openModal }) => {
  // 리뷰 완료 여부
  const [reviewed, setReviewed] = useState(false);
  const reviewHandler = () => {
    openModal();
    setReviewed(true);
  };

  const reviewing = () => {
    return reviewed ? '리뷰완료' : '리뷰하기';
  };

  const icon = getIcon(data.exercise);
  const reviewTxt = reviewing();

  return (
    <div className="flex flex-low justify-between w-[350px] h-[92px]  bg-white items-center drop-shadow-lg rounded-[5px]">
      <div className="ml-[20px] flex flex-row">
        <HNM target={data.target} />
        <div className="flex flex-col ml-[15px] text-300">
          <div className="flex flex-row items-end">
            <div className="text-300 text-default mr-[10px] max-w-[70px] truncate">{`${data.nickname}`}</div>
            <div className="text-200 text-low">{`${data.date}`}</div>
          </div>

          <div className="flex flex-row items-center">
            <div>{icon}</div>
            <div className="text-200 text-exercise">{`${data.krExercise}`}</div>
          </div>
        </div>
      </div>
      <div className="mr-[20px]">
        <ShortBtn
          txt={reviewTxt}
          handleClick={reviewHandler}
          disabled={data.reviewed}
        />
      </div>
    </div>
  );
};

export default HistoryCL;
