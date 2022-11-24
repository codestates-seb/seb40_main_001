import React from 'react';
import {
  LongBtn,
  GenderSelect,
  HeaderLogo,
  HeaderNone,
  IdInput,
  NickNameInput,
  CheckPasswordInput,
  PasswordInput,
  TownSelect,
} from '../UI';

const RegisterTemplate = () => {
  return (
    <>
      <HeaderLogo />
      <HeaderNone txt="회원가입" />
      <form className="flex flex-col items-center mt-9 space-y-4">
        <NickNameInput />
        <IdInput />
        <PasswordInput />
        <CheckPasswordInput />
        <GenderSelect />
        <TownSelect />
        <LongBtn txt="다음" />
      </form>
    </>
  );
};

export default RegisterTemplate;
