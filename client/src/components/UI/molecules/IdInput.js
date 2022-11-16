import { React, useState } from 'react';
import InputArea from '../atoms/Input';

const IdInput = () => {
  const target = '아이디를';
  const [userId, setUserId] = useState('');
  const onChangeHandler = e => {
    setUserId(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="ID" className="text text-[15px] mb-[5px]">
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
