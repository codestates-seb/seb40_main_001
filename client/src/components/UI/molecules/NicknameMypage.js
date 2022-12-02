import React, { useEffect, useState } from 'react';
import { Confirm, Edit } from '../../../assets/img';

const NicknameMypage = ({ userData, setUserData, changeName }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState();

  const handleClick = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = e => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (userData) {
      setName(userData.nickname);
    }
  }, [userData]);

  useEffect(() => {
    if (userData && name !== userData.nickname) {
      setUserData(prev => {
        const newData = prev;
        newData.nickname = name;
        return newData;
      });
      changeName();
    }
  }, [isEdit]);

  if (isEdit) {
    return (
      <div className="flex flex-row items-center">
        <input
          className="text text-300 border-b bg-transparent outline-none"
          value={name}
          onChange={handleChange}
        ></input>
        <Confirm onClick={handleClick} />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row text text-300">
        안녕하세요!&nbsp;<div className="font-bold">{name}</div>님
      </div>
      <Edit onClick={() => handleClick(false)} fill="black" />
    </div>
  );
};

export default NicknameMypage;
