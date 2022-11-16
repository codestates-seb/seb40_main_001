import { React } from 'react';
import InputArea from '../atoms/Input';

const IdInput = () => {
  const target = '아이디를';
  return (
    <div className="flex flex-col">
      <label htmlFor="ID" className="text text-[15px] mb-[5px]">
        아이디
      </label>
      <InputArea target={target} type={'text'} id={'ID'} />
    </div>
  );
};

export default IdInput;
