import React, { useState } from 'react';
import TextInputArea from '../atoms/TextInput';
import { CommentBtn } from '../atoms';

const InputComments = ({ handler, id }) => {
  const [writeComments, setWriteComments] = useState('');
  const commentsHandler = e => {
    setWriteComments(e.target.value);
  };
  const target = '댓글을';
  return (
    <div className="flex flex-row">
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
