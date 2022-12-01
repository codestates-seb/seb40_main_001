import React from 'react';
import getIcon from '../../../utils/getIcon';
import { HomeCard, HomeSquare, HomeCL } from '../atoms';

const Contents = ({ data }) => {
  const {
    title,
    content,
    images,
    category,
    // exerciseId,
    host,
    // eslint-disable-next-line no-unused-vars
    exerciseStatus, // 추후에 추가
  } = data || {};
  const { remotePath } = images[0] || {}; // 게시글 첫번째 이미지
  const { image, nickname } = host || {};
  const exerciseImg = getIcon(category, '#2BAE66');
  // console.log(exerciseId);
  return (
    <div className="px-[15px] pt-4 pb-[10px]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row">
            {exerciseImg}
            <div className="flex text text-300 font-bold ml-[10px] h-[48px]">
              {title}
            </div>
          </div>
          <div className="text-left text-low text-200 whitespace-pre-wrap w-[200px] h-[43px]">
            {content.length > 30 ? `${content.slice(0, 30)}...` : content}
          </div>
          <div className="flex flex-row mt-[5px] items-center">
            {/*  작성자 프로필  */}
            <HomeCard target={image} />
            <div className="flex text-light text-100 ml-[6px] items-center">
              {nickname}
            </div>
          </div>
        </div>
        {/* 게시글 첫번째 이미지  */}

        {remotePath && <HomeSquare target={remotePath} />}
      </div>
    </div>
  );
};

const HomeContents = ({ data, contentClick }) => {
  return (
    <HomeCL
      data={data}
      contentClick={contentClick}
      source={<Contents data={data} />}
    ></HomeCL>
  );
};

export default HomeContents;
