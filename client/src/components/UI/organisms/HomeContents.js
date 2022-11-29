import React from 'react';
import getIcon from '../../../utils/getIcon';
import { HomeCard, HomeSquare, HomeCL } from '../atoms';

const Contents = ({ data }) => {
  const {
    title,
    content,
    images,
    category,
    // eslint-disable-next-line no-unused-vars
    exerciseStatus, // 추후에 추가
    host,
  } = data || {};
  const { remotePath } = images[0] || {}; // 게시글 첫번째 이미지
  const { image, nickname } = host || {};
  const exerciseImg = getIcon(category, '#2BAE66');
  return (
    <div className="px-[15px] pt-5 pb-[10px]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row">
            {exerciseImg}
            <div className="flex text text-300 font-bold ml-[10px] items-center">
              {title}
            </div>
          </div>
          <div className="text-left text-low text-200 mt-2 whitespace-pre-wrap w-[179px] h-[43px]">
            {content.length > 30 ? `${content.slice(0, 30)}...` : content}
          </div>
          <div className="flex flex-row mt-[10px] items-end">
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

const HomeContents = ({ data }) => {
  return <HomeCL source={<Contents data={data} />}></HomeCL>;
};

export default HomeContents;
