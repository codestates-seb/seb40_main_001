import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import client from '../../client/client';
import { LongBtn } from '../UI/atoms';
import {
  GenderSelect,
  HeaderNone,
  IdInput,
  NickNameInput,
  CheckPasswordInput,
  PasswordInput,
  TownSelect,
  HeaderLogo,
} from '../UI';

const Register = () => {
  const naviagte = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [isSelect, setIsSelect] = useState('');
  const [cityNum, setcityNum] = useState();
  const currentPassword = useRef({});
  currentPassword.current = watch('password', '');

  const onValid = ({ text, password, nickname }) => {
    const gender = isSelect[0] ? 'MAN' : 'WOMAN';
    const payload = {
      email: text,
      password,
      nickname,
      gender,
      addressId: cityNum,
    };
    client
      .post('/members', JSON.stringify(payload))
      .then(() => {
        alert('회원가입이 완료되었습니다.');
        naviagte('/login');
      })
      .catch(err => {
        console.log(err);
      });
  };
  const onInValid = error => {
    console.log(error);
  };
  return (
    <>
      <HeaderLogo />
      <HeaderNone txt="회원가입" />

      <form
        className="flex flex-col items-center mt-9 space-y-2"
        onSubmit={handleSubmit(onValid, onInValid)}
      >
        <NickNameInput
          register={register('nickname', {
            required: true,
            minLength: {
              value: 2,
              message: '닉네임은 최소 2글자 이상입니다!',
            },
          })}
          errors={errors}
        />

        <IdInput
          register={register('text', {
            required: true,
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: '이메일 형식으로 작성해주세요!',
            },
          })}
          errors={errors}
        />

        <PasswordInput
          register={register('password', {
            required: true,
            minLength: {
              value: 8,
              message: '최소 8자 이상의 숫자를 입력해주세요!',
            },
            pattern: {
              value:
                /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/,
              message: '영문 대,소 문자, 숫자, 특수문자를 포함하여 주세요!',
            },
          })}
          errors={errors}
        />

        <CheckPasswordInput
          register={register('passwordCheck', {
            validate: value =>
              value === currentPassword.current ||
              '비밀번호가 일치하지 않습니다.',
          })}
          errors={errors}
        />

        <GenderSelect isSelect={isSelect} setIsSelect={setIsSelect} />

        <TownSelect setcityNum={setcityNum} />
        <LongBtn txt="회원가입" />
      </form>
    </>
  );
};

export default Register;
