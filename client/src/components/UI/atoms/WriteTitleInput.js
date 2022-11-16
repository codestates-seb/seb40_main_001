import { React } from 'react';

const TitleInput = ({ target }) => {
  return (
    <input
      type="text"
      placeholder={`${target} 입력해주세요`}
      className="bg-none w-[350px] h-[40px] border-main border-b-[1px] border-main border-b-[1px] focus:outline-none text-400"
    />
  );
};

export default TitleInput;
