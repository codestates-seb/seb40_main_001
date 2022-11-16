import { React } from 'react';
import CheckingPassword from '../atoms/CheckingPassword';

const CheckPasswordInput = () => {
  const target = '비밀번호 확인';
  return (
    <div className="display.flex">
      <div className="text text-[15px] mb-[5px]">{'비밀번호 확인'}</div>
      <CheckingPassword target={target} />
    </div>
  );
};

export default CheckPasswordInput;
