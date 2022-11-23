import React, { useState } from 'react';
import {
  ExerciseCategory,
  WriteHNC,
  WriteGenderSelect,
  WriteDate,
  AddFile,
} from '../molecules';

const WriteContents = () => {
  const [data, setData] = useState({
    exercise: '',
    title: '',
    content: '',
    gender: '',
    img: [],
    startTime: new Date(),
    endTime: new Date(),
  });

  const dataHandler = (target, change) => {
    const newData = data;
    newData[target] = change;
    setData(newData);
  };

  const fileHandler = e => {
    const newData = data;
    newData.img = [...data.img, e.target.files[0]];
    setData(newData);
  };

  const handleClick = idx => {
    const newData = data;
    const newArr = newData.img.filter((el, id) => id !== idx);
    newData.img = newArr;
    setData(newData);
  };

  return (
    <div className="flex flex-col w-[390px]">
      <ExerciseCategory handler={dataHandler} />
      <div className="px-5">
        <div className="flex items-center">
          <WriteHNC handler={dataHandler} />
        </div>
        <div className="py-3 border-b border-b-main">
          <WriteGenderSelect handler={dataHandler} />
        </div>
        <div className="flex flex-col py-3 border-b border-b-main">
          <div className="mb-[10px]">
            <WriteDate start={true} handler={dataHandler} data={data} />
          </div>
          <WriteDate handler={dataHandler} data={data} />
        </div>
        <div className="mt-[18px] mb-[27px]">
          {/* data.img를 가지고 첨부파일 리스트를 업데이트 하는데 조금 많이 느린 이슈 존재 */}
          <AddFile
            img={data.img}
            handler={fileHandler}
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default WriteContents;
