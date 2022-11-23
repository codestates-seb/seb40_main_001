import { React, useState } from 'react';
import CheckingPassword from '../atoms/CheckingPassword';

const CheckPasswordInput = () => {
  const [checkUserPassword, setCheckUserPassword] = useState('');
  const onChangeHandler = e => {
    setCheckUserPassword(e.target.value);
  };
  return (
    <div className="flex flex-col text-left py-2">
      <label htmlFor="PasswordCheck" className="text font-bold text-200 mb-1">
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
