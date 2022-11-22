import React from 'react';
import HomeCard from '../atoms/HomeCardImg';
import DeleteBtn from '../atoms/DeleteBtn';
import UpdateBtn from '../atoms/UpdateBtn';

const DetailContentsWriter = ({ updateHandler, deleteHander }) => {
  const dummyData = [
    {
      id: 1,
      title: '같이 농구 하실분?!!',
      target:
        'https://i.pinimg.com/474x/49/ec/a8/49eca86ab8fb9e496d5789f871559ab2.jpg',
      nickname: '헬리',
      createDate: '2022.11.18',
      endDate: '2022.11.19',
      content: `일요일 오후 4시부터 서울숲에서 같이 해요!
      댓글에 연락수단 말씀해주시면 대댓글로 남겨드릴게요!
      참고로 농구 초보입니다 >< !`,
    },
  ];

  return (
    <div className="flex flex-col mt-[30px]">
      <div className="border-b border-main w-[351px]">
        <div className="flex flex-row justify-between">
          <div className="text-default text-400 mb-[10px] max-w-[350px] truncate">
            {dummyData[0].title}
          </div>
          <div className="flex flex-row items-center ">
            <div className="mr-[10px]">
              <UpdateBtn handleClick={updateHandler} />
            </div>
            <div className="">
              <DeleteBtn handleClick={deleteHander} />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-row items-center justify-center mb-[15px]">
            <HomeCard target={dummyData[0].target} />
            <div className=" ml-[5px] text-default text-200 max-w-[170px] truncate">
              {dummyData[0].nickname}
            </div>
          </div>
          <div className="text-low text-200">{`${dummyData[0].createDate} ~ ${dummyData[0].endDate}`}</div>
        </div>
      </div>
      <div className="text-default text-300 w-[351px] mt-[15px] ">
        {dummyData[0].content}
      </div>
      <div className="mt-[13px] mb-[17px] border-b border-main w-[351px]"></div>
    </div>
  );
};

export default DetailContentsWriter;
