import { React } from 'react';

const TextInputArea = ({ target, value, onChange }) => {
  return (
    <textarea
      className="textarea resize-none bg-gray border-main focus:outline-none rounded-[7px] w-[267px] h-[90px]"
      placeholder={`${target} 입력해주세요`}
      value={value}
      onChange={onChange}
    ></textarea>
  );
};

export default TextInputArea;
