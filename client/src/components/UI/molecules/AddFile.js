import React from 'react';
import { FileDeleteBtn } from '../atoms';

const AddFile = ({ img, handler, handleDelete }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mb-[14px]">
        <div className="mr-[30px] text-300 text-low">첨부파일</div>
        {img &&
          img.map((el, idx) => {
            return (
              <div key={el} className="flex flex-row items-center mr-[5px]">
                {el.name}
                <FileDeleteBtn key={el} idx={idx} handler={handleDelete} />
              </div>
            );
          })}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handler}
        className="file-input file-input-bordered file-input-xs w-full max-w-xs"
      />
    </div>
  );
};

export default AddFile;
