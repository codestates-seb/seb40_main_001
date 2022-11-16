import { React } from 'react';

const InputArea = ({ target }) => {
  return (
    <input
      type="text"
      placeholder={`${target}를 입력해주세요`}
      className=" input w-[338px] h-[59px] rounded-[7px] focus:outline-main "
    />
  );
};

export default InputArea;
