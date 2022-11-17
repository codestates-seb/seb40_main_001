import { React } from 'react';

const InputArea = ({ target, id, type }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={`${target} 입력해주세요`}
      className="bg-gray input w-[338px] h-[59px] rounded-[7px] focus:outline-main "
    />
  );
};

export default InputArea;
