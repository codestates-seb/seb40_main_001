import React from 'react';
import { HeaderLogo, HeaderNone } from '../UI/molecules';
import { InputArea, LongBtn } from '../UI/atoms';

const LoginTemplate = () => {
  return (
    <div>
      <HeaderLogo />
      <HeaderNone txt="로그인" />
      <form className="flex flex-col items-center justify-between space-y-8 mt-9">
        <InputArea target="아이디를" type="text" />
        <InputArea target="비밀번호를" type="password" />
        <div className="mt-8"></div>
        <LongBtn txt="로그인" type="button" />
        <div className="text-200">
          회원이 아니신가요? <button className="font-bold">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default LoginTemplate;
