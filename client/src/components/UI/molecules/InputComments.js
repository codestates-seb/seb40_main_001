import React, { useState } from 'react';
import TextInputArea from '../atoms/TextInput';
import { CommentBtn } from '../atoms';

const InputComments = ({ target, handler, id }) => {
  const [writeComments, setWriteComments] = useState('');
  const commentsHandler = e => {
    setWriteComments(e.target.value);
  };
  return (
    <div className="flex flex-ro mt-[15px]">
      <div className="mr-[13px]">
        <TextInputArea
          target={target}
          value={writeComments}
          onChange={commentsHandler}
        />
      </div>
      <CommentBtn id={id} handler={handler} />
    </div>
  );
};

export default InputComments;
