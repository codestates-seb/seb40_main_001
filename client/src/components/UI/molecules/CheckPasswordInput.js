import { React } from 'react';
import CheckingPassword from '../atoms/CheckingPassword';

const CheckPasswordInput = () => {
  return (
    <div className="flex flex-col">
      <label htmlFor="PasswordCheck" className="text text-[15px] mb-[5px]">
        비밀번호 확인
      </label>
      <CheckingPassword id={'PasswordCheck'} />
    </div>
  );
};

export default CheckPasswordInput;
