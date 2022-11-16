import { React } from 'react';
import CheckingPassword from '../atoms/CheckingPassword';

const CheckPasswordInput = () => {
  const target = '비밀번호 확인';
  return (
    <div className="display.flex">
      <label htmlFor="PasswordCheck" className="text text-[15px] mb-[5px]">
        {'비밀번호 확인'}
      </label>
      <CheckingPassword target={target} />
    </div>
  );
};

export default CheckPasswordInput;
