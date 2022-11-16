import { React } from 'react';
import InputArea from '../atoms/Input';

const NickNameInput = () => {
  const target = '닉네임을';
  return (
    <div className="flex flex-col">
      <label htmlFor="Nickname" className="text text-[15px] mb-[5px]">
        닉네임
      </label>
      <InputArea target={target} id={'Nickname'} type={'text'} />
    </div>
  );
};

export default NickNameInput;
