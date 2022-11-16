import { React, useState } from 'react';
import CheckingPassword from '../atoms/CheckingPassword';

const CheckPasswordInput = () => {
  const [checkUserPassword, setCheckUserPassword] = useState('');
  const onChangeHandler = e => {
    setCheckUserPassword(e.target.value);
  };
  return (
    <div className="flex flex-col">
      <label htmlFor="PasswordCheck" className="text text-[15px] mb-[5px]">
        비밀번호 확인
      </label>
      <CheckingPassword
        id={'PasswordCheck'}
        value={checkUserPassword}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default CheckPasswordInput;
