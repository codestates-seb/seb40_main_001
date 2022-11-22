import React from 'react';
import HeaderLogo from '../molecules/HeaderLogo';
import { HeaderNone } from '../molecules';
import InputArea from '../atoms/Input';
import { LongBtn } from '../atoms';

const LoginTemplate = () => {
  return (
    <div>
      <HeaderLogo />
      <HeaderNone txt="로그인" />
      <form
        className="flex flex-col items-center justify-between space-y-8 mt-9"
        // onSubmit={handleSubmit()}
      >
        <InputArea target="아이디를" type="text" />
        <InputArea target="비밀번호를" type="password" />
        <div className="mt-8"></div>
        <LongBtn txt="로그인" />
        <div className="text-200">
          회원이 아니신가요? <button className="font-bold">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default LoginTemplate;
