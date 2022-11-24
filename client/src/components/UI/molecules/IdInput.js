import { React, useState } from 'react';
import InputArea from '../atoms/Input';

const IdInput = () => {
  const target = '이메일을';
  const [userId, setUserId] = useState('');
  const onChangeHandler = e => {
    setUserId(e.target.value);
  };

  return (
    <div className="flex flex-col text-left py-2">
      <label htmlFor="ID" className="text font-bold text-200 mb-1">
        아이디
      </label>
      <InputArea
        target={target}
        type={'text'}
        id={'ID'}
        value={userId}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default IdInput;
