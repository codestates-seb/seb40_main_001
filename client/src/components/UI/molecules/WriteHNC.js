import { React, useState } from 'react';
import TitleInput from '../atoms/WriteTitleInput';
import ContentsInput from '../atoms/WriteContentsInput';

const WriteHNC = ({ handler }) => {
  const [writeTitle, setWriteTitle] = useState('');
  const [writeContents, setWriteContents] = useState('');

  const titleHandler = e => {
    setWriteTitle(e.target.value);
    handler('title', e.target.value);
  };
  const contentsHandler = e => {
    setWriteContents(e.target.value);
    handler('content', e.target.value);
  };
  return (
    <div className="flex flex-col">
      <TitleInput value={writeTitle} handler={titleHandler} />
      <ContentsInput value={writeContents} handler={contentsHandler} />
    </div>
  );
};

export default WriteHNC;
