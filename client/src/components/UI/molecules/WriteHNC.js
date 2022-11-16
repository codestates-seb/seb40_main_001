import { React } from 'react';
import TitleInput from '../atoms/WriteTitleInput';
import ContentsInput from '../atoms/WriteContentsInput';

const WriteHNC = () => {
  return (
    <div className="flex flex-col">
      <TitleInput />
      <ContentsInput />
    </div>
  );
};

export default WriteHNC;
