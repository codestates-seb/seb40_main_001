import { React, useEffect, useState } from 'react';
import { TitleInput, ContentsInput } from '../atoms';

const WriteHNC = ({ data, handler }) => {
  const [writeTitle, setWriteTitle] = useState(data[0]);
  const [writeContents, setWriteContents] = useState(data[1]);

  const titleHandler = e => {
    setWriteTitle(e.target.value);
    handler('title', e.target.value);
  };
  const contentsHandler = e => {
    setWriteContents(e.target.value);
    handler('content', e.target.value);
  };

  useEffect(() => {
    setWriteTitle(data[0]);
    setWriteContents(data[1]);
  }, [data]);

  return (
    <div className="flex flex-col">
      <TitleInput value={writeTitle} handler={titleHandler} />
      <ContentsInput value={writeContents} handler={contentsHandler} />
    </div>
  );
};

export default WriteHNC;
