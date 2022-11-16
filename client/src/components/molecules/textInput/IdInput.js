import { React } from 'react';
import InputArea from '../../Inputs/Input';

const IdInput = () => {
  const target = '아이디';
  return (
    <div className="display.flex">
      <div className="text mb-[5px]">{'아이디'}</div>
      <InputArea target={target} />
    </div>
  );
};

export default IdInput;
