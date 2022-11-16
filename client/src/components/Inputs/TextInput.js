import { React } from 'react';

const TextInputArea = ({ target }) => {
  return (
    <textarea
      className="textarea border-main focus:outline-none rounded-[7px] w-[267px] h=[90px]"
      placeholder={`${target}을 입력해주세요`}
    ></textarea>
  );
};

export default TextInputArea;