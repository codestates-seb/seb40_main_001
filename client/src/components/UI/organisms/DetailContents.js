import React from 'react';
import HomeCard from '../atoms/HomeCardImg';
import { Carousel } from '../molecules';

const DetailContents = ({ img, contentsData }) => {
  return (
    <div className="flex flex-col mt-[30px]">
      <div className="border-b border-main w-[351px]">
        <div className="text-default text-400 mb-[10px] max-w-[350px] truncate">
          {contentsData.title}
        </div>
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-row items-center justify-center mb-[15px]">
            <HomeCard target={contentsData.host && contentsData.host.image} />
            <div className=" ml-[5px] text-default text-200 max-w-[170px] truncate">
              {contentsData.host && contentsData.host.nickname}
            </div>
          </div>
          <div className="text-low text-200">{`${new Date(
            contentsData.exerciseAt,
          )
            .toLocaleDateString('ko')
            .replace(/\s/g, '')}${new Date(
            contentsData.exerciseAt,
          ).getHours()}:${new Date(
            contentsData.exerciseAt,
          ).getMinutes()} ~ ${new Date(contentsData.endAt)
            .toLocaleDateString('ko')
            .replace(/\s/g, '')}${new Date(
            contentsData.endAt,
          ).getHours()}:${new Date(contentsData.endAt).getMinutes()}`}</div>
        </div>
      </div>
      <div className="mt-[25px] mb-[10px]">
        <Carousel img={img} />
      </div>
      <div className="text-default whitespace-pre-line text-300 w-[351px] mt-[15px] ">
        {contentsData.content}
      </div>
      <div className="mt-[13px] mb-[17px] border-b border-main w-[351px]"></div>
    </div>
  );
};

export default DetailContents;
