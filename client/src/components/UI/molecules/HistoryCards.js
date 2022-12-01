import React, { useEffect, useState } from 'react';
import { ShortBtn, HNM } from '../atoms';
import getIcon from '../../../utils/getIcon';

const HistoryCL = ({ data, openModal }) => {
  // 운동 한글화
  const [isExercise, setIsExercise] = useState('');
  // 리뷰 완료 여부
  const [reviewed, setReviewed] = useState(false);
  const reviewHandler = () => {
    openModal();
    setReviewed(true);
  };

  const reviewing = () => {
    return reviewed ? '리뷰완료' : '리뷰하기';
  };

  const icon = getIcon(data && data.category, '#7FD1AE');
  const reviewTxt = reviewing();

  useEffect(() => {
    if (data) {
      setIsExercise(() => {
        switch (data.category) {
          case 'RUNNING':
            return '러닝';
          case 'YOGA':
            return '요가';
          case 'BADMINTON':
            return '배드민턴';
          case 'SWIMMING':
            return '수영';
          case 'FITNESS':
            return '헬스';
          case 'BASKETBALL':
            return '농구';
          default:
            return 'null';
        }
      });
    }
  }, [data]);

  return (
    <div className="flex flex-low justify-between w-[350px] h-[92px]  bg-white items-center drop-shadow-lg rounded-[5px]">
      <div className="ml-[20px] flex flex-row">
        <HNM target={data && data.participant.image} />
        <div className="flex flex-col ml-[15px] text-300">
          <div className="flex flex-row items-end">
            <div className="text-300 text-default mr-[10px] max-w-[70px] truncate">{`${
              data && data.participant.nickname
            }`}</div>
            <div className="text-200 text-low">{`${
              data && new Date(data.exerciseAt).toLocaleDateString('ko')
            }`}</div>
          </div>

          <div className="flex flex-row items-center">
            <div>{icon}</div>
            <div className="text-200 font-bold text-exercise">{`${
              data && isExercise
            }`}</div>
          </div>
        </div>
      </div>
      <div className="mr-[20px]">
        <ShortBtn
          txt={reviewTxt}
          handleClick={reviewHandler}
          disabled={data && data.isReviewed}
        />
      </div>
    </div>
  );
};

export default HistoryCL;
