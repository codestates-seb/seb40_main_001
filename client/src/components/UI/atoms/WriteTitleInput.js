import { React } from 'react';

const TitleInput = () => {
  return (
    <input
      type="text"
      placeholder="제목을 입력해주세요"
      className="bg-none w-[350px] h-[40px] border-main border-b-[1px] border-main border-b-[1px] focus:outline-none text-400"
    />
  );
};

export default TitleInput;