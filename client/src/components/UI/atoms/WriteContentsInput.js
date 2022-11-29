import { React } from 'react';

const ContentsInput = ({ handler }) => {
  return (
    <textarea
      onChange={handler}
      type="text"
      placeholder="내용을 입력해주세요"
      className="resize-none bg-transparent pt-[30px] w-[350px] h-[300px] border-main border-b-[1px] focus:outline-none text-300
      "
    />
  );
};

export default ContentsInput;
