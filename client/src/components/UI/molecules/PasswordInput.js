import { React } from 'react';
import InputArea from '../atoms/Input';

const PasswordInput = () => {
  const target = '비밀번호를';
  return (
    <div className="display.flex">
      <label htmlFor="PasswordCheck" className="text text-[15px] mb-[5px]">
        비밀번호
      </label>
      <InputArea target={target} id={id} type={type} />
    </div>
  );
};

export default PasswordInput;
