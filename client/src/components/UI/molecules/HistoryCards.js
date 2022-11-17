import React, { useState } from 'react';
import HNM from '../atoms/HNM';
import { ReactComponent as Running } from '../../../assets/img/icons/running.svg';
import { ReactComponent as Yoga } from '../../../assets/img/icons/yoga.svg';
import { ReactComponent as Tennis } from '../../../assets/img/icons/tennis.svg';
import { ReactComponent as Swim } from '../../../assets/img/icons/swim.svg';
import { ReactComponent as Weight } from '../../../assets/img/icons/weight.svg';
import { ReactComponent as Basketball } from '../../../assets/img/icons/basketball.svg';
import { ShortBtn } from '../atoms';

const HistoryCL = ({ target, nickname, exercise, krExercise }) => {
  const [review, setReview] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const reviewHandler = () => {
    setReviewed(!reviewed);
    setReview(!review);
  };
  const reviewing = () => {
    return review ? '리뷰완료' : '리뷰하기';
  };
  const getIcon = () => {
    switch (exercise) {
      case 'runnung':
        return <Running fill={'#7FD1AE'} />;
      case 'yoga':
        return <Yoga fill={'#7FD1AE'} />;
      case 'tennis':
        return <Tennis fill={'#7FD1AE'} />;
      case 'swim':
        return <Swim fill={'#7FD1AE'} />;
      case 'weight':
        return <Weight fill={'#7FD1AE'} />;
      case 'basketball':
        return <Basketball fill={'#7FD1AE'} />;
      default:
        return 'a';
    }
  };

  const icon = getIcon();
  const reviewTxt = reviewing();

  return (
    <div
      className=" 
    flex
    flex-low
    justify-between
    w-[350px] 
    h-[92px] 
    bg-white
    items-center
    drop-shadow-lg 
    rounded-[5px]
    "
    >
      <div className="ml-[20px] flex flex-row">
        <HNM target={target} />
        <div className="flex flex-col ml-[15px] text-300">
          <div>{`${nickname}`}</div>
          <div className="flex flex-row items-center">
            <div>{icon}</div>
            <div className="text-200 text-exercise">{`${krExercise}`}</div>
          </div>
        </div>
      </div>
      <div className="mr-[20px]">
        <ShortBtn
          txt={reviewTxt}
          handleClick={reviewHandler}
          disabled={reviewed}
        />
      </div>
    </div>
  );
};

export default HistoryCL;
