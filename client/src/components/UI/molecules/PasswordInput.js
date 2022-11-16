import { React } from 'react';
import InputArea from '../atoms/Input';

const PasswordInput = () => {
  const target = '비밀번호를';
  return (
    <div className="flex flex-col">
      <label htmlFor="PasswordCheck" className="text text-[15px] mb-[5px]">
        비밀번호
      </label>
      <InputArea target={target} id={'PasswordCheck'} type={'password'} />
    </div>
  );
};

export default PasswordInput;
