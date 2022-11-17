import React from 'react';
import HomeCard from '../atoms/HomeCardImg';

const WriterDetail = ({ title, nickname, startDate, endDate }) => {
  const target = 'img src route';
  return (
    <div className="flex flex-row justify-between w-[350px] h-[70px] border-b-[1px] border-main">
      <div className="flex flex-col">
        <div className="text-400 mb-[5px]">{`${title}`}</div>
        <div className="flex flex-row items-center">
          <HomeCard target={target} />
          <div className="text-200">{`${nickname}`}</div>
        </div>
      </div>
      <div className="flex text-low text-200  items-end">{`${startDate} ~ ${endDate}`}</div>
    </div>
  );
};

export default WriterDetail;
