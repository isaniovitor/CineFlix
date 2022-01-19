import type { Reducer } from 'redux';

import { UserTypes } from './types';
import type { UserState } from './types';

const INITIAL_STATE: UserState = {
  username: '',
  lastname: '',
  password: '',
  userimage: '',
  email: '',
  birthdate: '',
  address: '',
  gender: { id: '0', name: '' },
  islogged: false,
};

const reducer: Reducer<UserState> = (
  state = INITIAL_STATE,
  { type, payload },
) => {
  switch (type) {
    case UserTypes.USER_LOGIN:
      return {
        ...state,
        username: payload.username,
        lastname: payload.lastname,
        password: payload.password,
        userimage: payload.userimage,
        email: payload.email,
        birthdate: payload.birthdate,
        address: payload.address,
        gender: payload.gender,
        islogged: true,
      };
    case UserTypes.USER_LOGOUT:
      return {
        ...state,
        username: INITIAL_STATE.username,
        lastname: INITIAL_STATE.lastname,
        password: INITIAL_STATE.password,
        userimage: INITIAL_STATE.userimage,
        email: INITIAL_STATE.email,
        birthdate: INITIAL_STATE.birthdate,
        address: INITIAL_STATE.address,
        gender: INITIAL_STATE.gender,
        islogged: false,
      };
    default:
      return state;
  }
};

export default reducer;
