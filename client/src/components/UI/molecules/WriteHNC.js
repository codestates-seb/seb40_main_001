import { React, useState } from 'react';
import TitleInput from '../atoms/WriteTitleInput';
import ContentsInput from '../atoms/WriteContentsInput';

const WriteHNC = () => {
  const [writeTitle, setWriteTitle] = useState('');
  const [writeContents, setWriteContents] = useState('');

  const titleHandler = e => {
    setWriteTitle(e.target.value);
  };
  const contentsHandler = e => {
    setWriteContents(e.target.value);
  };
  return (
    <div className="flex flex-col">
      <TitleInput value={writeTitle} onChange={titleHandler} />
      <ContentsInput value={writeContents} onChange={contentsHandler} />
    </div>
  );
};

export default WriteHNC;
