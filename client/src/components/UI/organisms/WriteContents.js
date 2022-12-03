import React from 'react';
import {
  ExerciseCategory,
  WriteHNC,
  WriteGenderSelect,
  WriteDate,
  AddFile,
} from '../molecules';

const WriteContents = ({
  data,
  dataHandler,
  fileHandler,
  handleDelete,
  img,
}) => {
  return (
    <div className="flex flex-col w-[390px]">
      <ExerciseCategory
        handler={dataHandler}
        data={data.exercise}
        isWrite={true}
      />
      <div className="px-5">
        <div className="flex items-center">
          <WriteHNC handler={dataHandler} data={[data.title, data.content]} />
        </div>
        <div className="py-3 border-b border-b-main">
          <WriteGenderSelect handler={dataHandler} data={data.gender} />
        </div>
        <div className="flex flex-col py-3 border-b border-b-main">
          <div className="mb-[10px]">
            <WriteDate
              start={true}
              handler={dataHandler}
              data={data.startTime}
            />
          </div>
          <WriteDate handler={dataHandler} data={data.endTime} />
        </div>
        <div className="mt-[18px] mb-[27px]">
          {/* data.img를 가지고 첨부파일 리스트를 업데이트 하는데 조금 많이 느린 이슈 존재 */}
          <AddFile
            img={img}
            handler={fileHandler}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default WriteContents;
