import { atom } from 'recoil';

const userInfoState = atom({
  key: 'userInfo',
  default: '',
});

export default userInfoState;
