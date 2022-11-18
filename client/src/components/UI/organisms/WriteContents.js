import React, { useState } from 'react';
import {
  ExerciseCategory,
  WriteHNC,
  WriteGenderSelect,
  WriteDate,
} from '../molecules';

const WriteContents = () => {
  const [data, setData] = useState({
    exercise: '',
    title: '',
    content: '',
    gender: '',
    startTime: new Date(),
    endTime: new Date(),
  });

  const dataHandler = (target, change) => {
    console.log(target, change);
    const newData = data;
    newData[target] = change;
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
      </div>
    </div>
  );
};

export default WriteContents;
