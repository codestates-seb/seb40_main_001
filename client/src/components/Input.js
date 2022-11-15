import { React } from 'react';

const InputArea = () => {
  const target = '아이디';
  return (
    <input
      type="text"
      placeholder={`${target}를 입력해주세요`}
      className="input w-full max-w-xs focus:outline-main"
    />
  );
};

export default InputArea;
