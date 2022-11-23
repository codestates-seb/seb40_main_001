import React from 'react';
import {
  Dropdown,
  GenderSelect,
  HeaderLogo,
  HeaderNone,
} from '../UI/molecules';
import { ImgAddBtn, InputArea, LongBtn, SignUp } from '../UI/atoms';

export const RegisterTemplate = () => {
  return (
    <div>
      <HeaderLogo />
      <HeaderNone txt="회원가입" />
      <form className="flex flex-col items-center mt-9">
        <div className="flex flex-col items-start mb-7">
          <div className="font-bold text-200 mb-1">아이디</div>
          <InputArea target="아이디를" type="text" />
        </div>
        <div className="flex flex-col items-start mb-7">
          <div className="font-bold text-200 mb-1">비밀번호</div>
          <InputArea target="비밀번호를" type="password" />
        </div>
        <div className="flex flex-col items-start mb-7">
          <div className="font-bold text-200 mb-1">비밀번호 확인</div>
          <InputArea target="비밀번호를 다시" type="password" />
        </div>
        <div className=" mb-20"></div>
        <LongBtn txt="다음" />
      </form>
    </div>
  );
};

export const NextRegisterTemplate = () => {
  return (
    <div>
      <HeaderLogo />
      <HeaderNone txt="회원가입" />

      <div className="my-8">
        <SignUp />
        <ImgAddBtn />
      </div>
      <form className="flex flex-col items-center mt-9">
        <div className="flex flex-col items-start mb-7">
          <div className="font-bold text-200 mb-1">닉네임</div>
          <InputArea target="닉네임을" type="text" />
        </div>
        <div className="flex flex-col items-start mb-7">
          <div className="font-bold text-200 mb-1">성별</div>
          <GenderSelect />
        </div>
        <div className="flex flex-col items-start mb-7">
          <div className="font-bold text-200 mb-1">동네 선택</div>
          <Dropdown city="광진구" />
        </div>
        <div className=" mb-20"></div>
        <LongBtn txt="다음" />
      </form>
    </div>
  );
};
