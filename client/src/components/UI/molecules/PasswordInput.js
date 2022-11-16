import { React } from 'react';
import InputArea from '../atoms/Input';

const PasswordInput = () => {
  const target = '비밀번호를';
  return (
    <div className="display.flex">
      <div className="text text-[15px] mb-[5px]">{'비밀번호'}</div>
      <InputArea target={target} />
    </div>
  );
};

export default PasswordInput;
