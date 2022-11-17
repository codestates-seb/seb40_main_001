import React from 'react';
import HomeCard from '../atoms/HomeCardImg';

const WriterDetail = ({ startDate, endDate }) => {
  return (
    <div className="flex flex-row justify-between w-[350px] h-[70px] border-b-[1px] border-main">
      <div className="flex flex-col">
        <div className="text-400 mb-[5px]">같이 배드민턴 치실 분!</div>
        <div className="flex flex-row items-center">
          <HomeCard />
          <div className="text-200">자몽스무디</div>
        </div>
      </div>
      <div className="flex text-low text-200  items-end">{`${startDate} ~ ${endDate}`}</div>
    </div>
  );
};

export default WriterDetail;
