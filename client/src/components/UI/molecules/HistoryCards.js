import React, { useState } from 'react';
import HNM from '../atoms/HNM';
// svgr로 수정하기(예정)
import { ReactComponent as Running } from '../../../assets/img/icons/running.svg';
import { ReactComponent as Yoga } from '../../../assets/img/icons/yoga.svg';
import { ReactComponent as Tennis } from '../../../assets/img/icons/tennis.svg';
import { ReactComponent as Swim } from '../../../assets/img/icons/swim.svg';
import { ReactComponent as Weight } from '../../../assets/img/icons/weight.svg';
import { ReactComponent as Basketball } from '../../../assets/img/icons/basketball.svg';
import { ShortBtn } from '../atoms';

const HistoryCL = ({ data, openModal }) => {
  // 리뷰 완료 여부
  const [reviewed, setReviewed] = useState(false);
  const reviewHandler = () => {
    openModal();
    // set Reviewed를 여기서 적용하는 대신
    // data로 체크하거나 모달창에서 처리하거나 해야할듯...
    // ----사유----
    // modal에서 X클릭 > not false
    // modal에서 확인 클릭 > false
    setReviewed(false);
  };

  const reviewing = () => {
    return reviewed ? '리뷰완료' : '리뷰하기';
  };
  const getIcon = () => {
    switch (data.exercise) {
      case 'running':
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
          disabled={reviewed}
        />
      </div>
    </div>
  );
};

export default HistoryCL;
