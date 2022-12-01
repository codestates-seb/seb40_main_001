import React, { useEffect, useState } from 'react';
import { Confirm, Edit } from '../../../assets/img';

const NicknameMypage = ({ nickname }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState();

  const handleClick = bool => {
    setIsEdit(!isEdit);
    if (bool) {
      console.log('nickname 저장');
    }
  };

  const handleChange = e => {
    setName(e.target.value);
  };

  useEffect(() => {
    setName(nickname);
  }, [nickname]);

  if (isEdit) {
    return (
      <div className="flex flex-row items-center">
        <input
          className="text text-300 border-b bg-transparent outline-none"
          value={name}
          onChange={handleChange}
        ></input>
        <Confirm onClick={() => handleClick(true)} />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row text text-300">
        안녕하세요!&nbsp;<div className="font-bold">{name}</div>님
      </div>
      <Edit onClick={() => handleClick(false)} />
    </div>
  );
};

export default NicknameMypage;
