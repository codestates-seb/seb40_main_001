import { React, useState } from 'react';
import InputArea from '../atoms/Input';

const PasswordInput = () => {
  const target = '비밀번호를';
  const [userPassword, setUserPassword] = useState('');
  const onChangeHandler = e => {
    setUserPassword(e.target.value);
  };
  return (
    <div className="flex flex-col text-left py-2">
      <label htmlFor="PasswordCheck" className="text font-bold text-200 mb-1">
        비밀번호
      </label>
      <InputArea
        target={target}
        id={'PasswordCheck'}
        type={'password'}
        value={userPassword}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default PasswordInput;
