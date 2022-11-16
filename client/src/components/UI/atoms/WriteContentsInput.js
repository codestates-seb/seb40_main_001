import { React } from 'react';

const ContentsInput = ({ target }) => {
  return (
    <textarea
      type="text"
      placeholder={`${target} 입력해주세요`}
      className="resize-none bg-none pt-[30px] w-[350px] h-[300px] border-main border-b-[1px] focus:outline-none text-300
      "
    />
  );
};

export default ContentsInput;
