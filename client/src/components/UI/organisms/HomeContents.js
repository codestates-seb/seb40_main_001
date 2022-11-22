import React from 'react';
import getIcon from '../../../utils/getIcon';
import { HomeCard, HomeSquare, HomeCL } from '../atoms';

const Contents = ({ data }) => {
  const { profile, nickname, title, contents, img, exercise } = data || {};
  const exerciseImg = getIcon(exercise, '#2BAE66');

  return (
    <div className="px-[15px] pt-5 pb-[10px] ">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row">
            {exerciseImg}
            <div className="flex text text-300 font-bold ml-[10px] items-center">
              {title}
            </div>
          </div>
          <div className="text-left text-low text-200 mt-2 whitespace-pre-wrap w-[179px] h-[43px]">
            {contents.length > 30 ? `${contents.slice(0, 30)}...` : contents}
          </div>
          <div className="flex flex-row mt-[10px] items-end">
            <HomeCard target={profile} />

            <div className="flex text-light text-100 ml-[6px] items-center">
              {nickname}
            </div>
          </div>
        </div>
        {img && <HomeSquare target={img} />}
      </div>
    </div>
  );
};

const HomeContents = ({ data }) => {
  return <HomeCL source={<Contents data={data} />}></HomeCL>;
};

export default HomeContents;
