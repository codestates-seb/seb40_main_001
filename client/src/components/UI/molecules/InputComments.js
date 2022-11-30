import React, { useState } from 'react';
import TextInputArea from '../atoms/TextInput';
import { CommentBtn } from '../atoms';

const InputComments = ({ target, handler, id, onChange, value }) => {
  // eslint-disable-next-line no-unused-vars
  const [writeComments, setWriteComments] = useState('');
  // eslint-disable-next-line no-unused-vars
  const commentsHandler = e => {
    setWriteComments(e.target.value);
  };
  return (
    <div className="flex flex-ro mt-[15px]">
      <div className="mr-[13px]">
        <TextInputArea target={target} value={value} onChange={onChange} />
      </div>
      <CommentBtn id={id} handler={handler} />
    </div>
  );
};

export default InputComments;
