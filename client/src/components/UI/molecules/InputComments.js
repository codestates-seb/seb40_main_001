import React from 'react';
import TextInputArea from '../atoms/TextInput';
import { CommentBtn } from '../atoms';

const InputComments = ({ target, handler, id, onChange, value }) => {
  return (
    <div className="flex flex-ro mt-[15px]">
      <div className="mr-[13px]">
        <TextInputArea target={target} value={value} onChange={onChange} />
      </div>
      <CommentBtn handler={() => handler(id)} />
    </div>
  );
};

export default InputComments;
