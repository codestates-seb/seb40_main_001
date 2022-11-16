import { React } from 'react';
import InputArea from '../atoms/Input';

const IdInput = () => {
  const target = '아이디를';
  return (
    <div className="display.flex">
      <label htmlFor="ID" className="text text-[15px] mb-[5px]">
        아이디
      </label>
      <InputArea target={target} />
    </div>
  );
};

export default IdInput;
