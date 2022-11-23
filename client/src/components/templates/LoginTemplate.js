import React from 'react';
import {
  HeaderLogo,
  HeaderNone,
  IdInput,
  PasswordInput,
} from '../UI/molecules';
import { LongBtn } from '../UI/atoms';

const LoginTemplate = () => {
  return (
    <div>
      <HeaderLogo />
      <HeaderNone txt="로그인" />
      <form className="flex flex-col items-center space-y-8 mt-9">
        <IdInput />
        <PasswordInput />
        <div></div>
        <LongBtn txt="로그인" type="button" />
      </form>
      <div className="text-200 mt-4">
        회원이 아니신가요? <button className="font-bold">회원가입</button>
      </div>
    </div>
  );
};

export default LoginTemplate;
