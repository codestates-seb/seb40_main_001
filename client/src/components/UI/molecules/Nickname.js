import { React } from 'react';
import InputArea from '../atoms/Input';

const NickNameInput = () => {
  const target = '닉네임을';
  return (
    <div className="flex flex-col">
      <div className="text text-[15px] mb-[5px]">닉네임</div>
      <InputArea target={target} />
    </div>
  );
};

export default NickNameInput;
